
import { useEffect, useState } from "react";
import { toast } from "sonner";

import authContext from "../context/authContext";

import {
    authMe,
    login as loginApi,
    logout as logoutApi,
} from "../../services/auth/api/authApi";

const AuthProvider = ({ children }) => {

    // Global State
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const isAuthenticated = Boolean(user && token);


    // Clear Authentication Session
    const clearSession = () => {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };


    // Check Authentication
    useEffect(() => {
        let ignore = false;
        let unauthorized = false;

        // Handle Unauthorized Requests
        const handleUnauthorized = () => {
            unauthorized = true;

            clearSession();
            setLoading(false);
        };

        window.addEventListener(
            "auth:unauthorized",
            handleUnauthorized
        );

        const fetchUser = async () => {

            // No token means guest user
            const currentToken = localStorage.getItem("token");

            if (!currentToken) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await authMe();

                if (!ignore && !unauthorized) {
                    setUser(data.user);
                }

            } catch (error) {

                if (!ignore && !unauthorized) {

                    if (error.response?.status === 401) {
                        clearSession();
                    } else {
                        toast.error(
                            error.response?.data?.message ||
                            "Failed to verify authentication. Please try again."
                        );
                    }
                }

            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            ignore = true;

            window.removeEventListener(
                "auth:unauthorized",
                handleUnauthorized
            );
        };

    }, []);


    // Update User
    const updateUser = (partialData) => {
        setUser((prevUser) => {
            if (!prevUser) return prevUser;

            return {
                ...prevUser,
                ...partialData,
            };
        });
    };


    // Login
    const login = async (email, password) => {
        setLoginLoading(true);

        try {
            const { data } = await loginApi({
                email,
                password,
            });

            const { token: newToken, user: userData } = data;

            localStorage.setItem("token", newToken);

            setToken(newToken);
            setUser(userData);

            return data;

        } finally {
            setLoginLoading(false);
        }
    };


    // Logout
    const logout = async () => {
        setLogoutLoading(true);

        try {
            const { data } = await logoutApi();
            toast.success(data?.message || "Logged out successfully!");

        } catch (error) {

            if (error.response?.status !== 401) {
                toast.warning(
                    "Could not confirm logout with the server. Your local session has been cleared."
                );
            }

        } finally {
            clearSession();
            setLogoutLoading(false);
        }
    };


    return (
        <authContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                loginLoading,
                logoutLoading,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;

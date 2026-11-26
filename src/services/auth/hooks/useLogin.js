
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { useContext } from "react";
import authContext from "../../../app/context/authContext";

const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useContext(authContext);

    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData) => {
        if (loading) return;

        setLoading(true);

        try {
            const data = await login(
                formData.email.trim(),
                formData.password
            );

            toast.success(data.message || "Login successful!");

            const redirectTo = location.state?.from || "/";

            navigate(redirectTo, { replace: true });

            return data;

        } catch (error) {
            const status = error.response?.status;

            if (status === 400) {
                toast.error(
                    error.response?.data?.message ||
                    "Invalid email or password."
                );
            } else if (!error.response) {
                toast.error(
                    "Unable to connect to the server. Please try again."
                );
            } else {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
            }

            throw error;

        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogin,
        loading,
    };
};

export default useLogin;

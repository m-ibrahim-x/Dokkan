
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import {
    sendRegisterOTP,
    verifyRegisterOTP,
} from "../api/authApi";

const useRegister = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Registration data passed from RegisterPage
    const userInfo = location.state?.userInfo || null;

    useEffect(() => {
        if (
            location.pathname === "/verify-otp" &&
            !userInfo?.email
        ) {
            navigate("/register", { replace: true });
        }
    }, [location.pathname, userInfo, navigate]);

    // Loading States
    const [loading, setLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    // OTP Resend Timer
    const [resendTimer, setResendTimer] = useState(
        userInfo ? 60 : 0
    );

    // Request Locks
    const requestLock = useRef(false);
    const verifyLock = useRef(false);
    const resendLock = useRef(false);

    // Handle API Errors
    const handleApiError = (error, fallbackMessage) => {
        const status = error.response?.status;

        if (status === 400) {
            toast.error(
                error.response?.data?.message || fallbackMessage
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
    };

    // Request Registration OTP
    const requestOtp = async (formData) => {
        if (requestLock.current) return;

        requestLock.current = true;
        setLoading(true);

        try {
            // Prepare API payload
            const payload = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                password: formData.password,
            };

            const { data } = await sendRegisterOTP(payload);

            toast.success(
                data.message || "OTP sent successfully!"
            );

            // Navigate to OTP page with registration data
            navigate("/verify-otp", {
                state: {
                    userInfo: payload,
                },
            });

            return data;
        } catch (error) {
            handleApiError(error, "Email already exists.");
            return null;
        } finally {
            requestLock.current = false;
            setLoading(false);
        }
    };

    // OTP Countdown Timer
    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setTimeout(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendTimer]);

    // Verify Registration OTP
    const submitOtp = async (otpValue) => {
        if (verifyLock.current) return;

        if (!userInfo?.email) {
            toast.error(
                "Registration information is missing. Please register again."
            );

            navigate("/register", { replace: true });
            return;
        }

        if (!/^\d{6}$/.test(otpValue)) {
            toast.error(
                "Please enter a valid 6-digit OTP."
            );
            return;
        }

        verifyLock.current = true;
        setVerifyLoading(true);

        try {
            const { data } = await verifyRegisterOTP({
                email: userInfo.email,
                otp: otpValue,
            });

            toast.success(
                data.message || "Account created successfully!"
            );

            navigate("/login", { replace: true });

            return data;
        } catch (error) {
            handleApiError(error, "Invalid or expired OTP.");
            return null;
        } finally {
            verifyLock.current = false;
            setVerifyLoading(false);
        }
    };

    // Resend Registration OTP
    const resendOtp = async () => {
        if (
            !userInfo ||
            resendLock.current ||
            resendTimer > 0
        ) {
            return;
        }

        resendLock.current = true;
        setResendLoading(true);

        try {
            const { data } = await sendRegisterOTP(userInfo);

            setResendTimer(60);

            toast.success(
                data.message || "OTP sent successfully!"
            );

            return data;
        } catch (error) {
            handleApiError(error, "Unable to resend OTP.");
            return null;
        } finally {
            resendLock.current = false;
            setResendLoading(false);
        }
    };

    return {
        userInfo,

        loading,
        verifyLoading,
        resendLoading,

        resendTimer,

        requestOtp,
        submitOtp,
        resendOtp,
    };
};

export default useRegister;

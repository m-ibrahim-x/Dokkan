import api from "../../../shared/api/axios";

// ==============================
// Register
// ==============================

// Send registration OTP
// payload: { username, email, phone, password, rePassword }
export const sendRegisterOTP = (payload) => {
    return api.post("/auth/register/send-otp", payload);
};

// Verify registration OTP
// payload: { email, otp }
export const verifyRegisterOTP = (payload) => {
    return api.post("/auth/register/verify-otp", payload);
};


// ==============================
// Login & Logout
// ==============================

// Login
// payload: { email, password }
export const login = (payload) => {
    return api.post("/auth/login", payload);
};

// Logout
export const logout = () => {
    return api.post("/auth/logout");
};


// ==============================
// Forgot Password
// ==============================

// Send OTP
// payload: { email }
export const forgotPasswordSendOTP = (payload) => {
    return api.post("/auth/forgot-password/send-otp", payload);
};

// Verify OTP & Reset Password
// payload: { email, otp, newPassword }
export const forgotPasswordVerifyOTP = (payload) => {
    return api.post("/auth/forgot-password/verify-otp", payload);
};


// ==============================
// Current User
// ==============================

// Get current authenticated user
export const authMe = () => {
    return api.get("/auth/me");
};

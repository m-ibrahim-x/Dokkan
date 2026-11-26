
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    RotateCcw,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

import AuthCard from "../../services/auth/components/authCard";
import Button from "../../shared/ui/button";
import useLanguage from "../../shared/hooks/useLanguage";

import useRegister from "../../services/auth/hooks/useRegister";
import useOtpInput from "../../services/auth/hooks/useOtpInput";

export default function VerifyOTPPage() {
    const { lang, isRTL } = useLanguage();

    // Registration Logic
    const {
        userInfo,
        verifyLoading,
        resendLoading,
        resendTimer,
        submitOtp,
        resendOtp,
    } = useRegister();

    // OTP Input Logic
    const {
        digits,
        otpValue,
        inputRefs,
        handleDigitChange,
        handleKeyDown,
        handlePaste,
        resetOtp,
    } = useOtpInput(6);

    // Bilingual dictionary
    const t = {
        en: {
            title: "Verify Code",
            subtitle:
                "Please enter the 6-digit verification code sent to your email address",
            badge: "OTP Verification",
            otpLabel: "Verification Code",
            verifyBtn: "Verify & Proceed",
            noCode: "Didn't receive the code?",
            resendCode: "Resend Code",
            resendWaiting: "Resend in",
            backToLogin: "Back to Login",
            emailHint: "Code sent to:",
        },
        ar: {
            title: "تأكيد الرمز",
            subtitle:
                "يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى بريدك الإلكتروني",
            badge: "التحقق بخطوتين",
            otpLabel: "رمز التحقق",
            verifyBtn: "تأكيد ومتابعة",
            noCode: "لم تستلم الرمز بعد؟",
            resendCode: "إعادة إرسال الرمز",
            resendWaiting: "إعادة الإرسال خلال",
            backToLogin: "العودة لتسجيل الدخول",
            emailHint: "تم إرسال الرمز إلى:",
        },
    }[lang];

    // Connect OTP verification
    const handleSubmit = (e) => {
        e.preventDefault();
        submitOtp(otpValue);
    };

    // Connect OTP resend with input reset
    const handleResend = async () => {
        const result = await resendOtp();

        if (result) {
            resetOtp();
        }
    };

    // Avoid rendering before registration data is available
    if (!userInfo?.email) return null;

    return (
        <AuthCard
            title={t.title}
            subtitle={t.subtitle}
            badge={
                <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck
                        size={13}
                        className="text-brand-active"
                    />
                    <span>{t.badge}</span>
                </span>
            }
            footer={
                <p>
                    <Link
                        to="/login"
                        className="font-semibold text-brand-active hover:underline inline-flex items-center gap-1"
                    >
                        {isRTL ? (
                            <ArrowRight
                                size={14}
                                className="shrink-0"
                            />
                        ) : (
                            <ArrowLeft
                                size={14}
                                className="shrink-0"
                            />
                        )}

                        <span>{t.backToLogin}</span>
                    </Link>
                </p>
            }
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Email Hint */}
                <div className="text-center">
                    <span
                        className="inline-block rounded-full bg-input-bg border border-border-main/70 px-3 py-1 text-xs text-text-secondary font-mono"
                        dir="ltr"
                    >
                        {t.emailHint} {userInfo.email}
                    </span>
                </div>

                {/* 6 Digit Input Group */}
                <div className="flex flex-col items-center gap-2">
                    <label className="text-sm font-medium text-text-primary">
                        {t.otpLabel}
                    </label>

                    <div
                        className="flex items-center justify-center gap-2 sm:gap-3"
                        dir="ltr"
                    >
                        {digits.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) =>
                                    (inputRefs.current[idx] = el)
                                }
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                autoComplete={
                                    idx === 0
                                        ? "one-time-code"
                                        : "off"
                                }
                                value={digit}
                                onChange={(e) =>
                                    handleDigitChange(
                                        idx,
                                        e.target.value
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(idx, e)
                                }
                                onPaste={handlePaste}
                                aria-label={`Digit ${idx + 1}`}
                                className="size-11 sm:size-12 text-center text-lg sm:text-xl font-bold rounded-xl border border-border-main bg-input-bg text-text-primary transition-all focus:border-brand-active focus:ring-2 focus:ring-brand-active/30 outline-none"
                            />
                        ))}
                    </div>
                </div>

                {/* Resend Code */}
                <div className="flex items-center justify-between text-xs text-text-secondary pt-1">
                    <span>{t.noCode}</span>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={
                            resendLoading ||
                            resendTimer > 0
                        }
                        className="inline-flex items-center gap-1 font-semibold text-brand-active hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RotateCcw
                            size={12}
                            className="shrink-0"
                        />

                        <span>
                            {resendTimer > 0
                                ? `${t.resendWaiting} (${resendTimer}s)`
                                : t.resendCode}
                        </span>
                    </button>
                </div>

                {/* Verify Button */}
                <Button
                    type="submit"
                    disabled={
                        verifyLoading ||
                        otpValue.length !== 6
                    }
                    className="w-full h-11 rounded-xl bg-brand-active text-text-primary font-semibold hover:bg-brand-hover transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {t.verifyBtn}
                </Button>
            </form>
        </AuthCard>
    );
}

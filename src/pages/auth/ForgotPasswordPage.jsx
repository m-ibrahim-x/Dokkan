import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";
import AuthCard from "../../services/auth/components/authCard";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/button";
import useLanguage from "../../shared/hooks/useLanguage";

export default function ForgotPasswordPage() {
    const { lang, isRTL } = useLanguage();

    // UI state only (without backend logic)
    const [email, setEmail] = useState("");

    // Bilingual dictionary for dynamic language & direction
    const t = {
        en: {
            title: "Forgot Password?",
            subtitle: "No worries! Enter your registered email address and we'll send you a verification code to reset it.",
            badge: "Password Recovery",
            emailLabel: "Email Address",
            emailPlaceholder: "name@example.com",
            sendOtpBtn: "Send Verification Code",
            backToLogin: "Back to Login",
            helpText: "Remember your password?",
        },
        ar: {
            title: "نسيت كلمة المرور؟",
            subtitle: "لا تقلق! أدخل عنوان بريدك الإلكتروني المسجل وسنرسل لك رمز تحقق لإعادة تعيين كلمة المرور.",
            badge: "استعادة كلمة المرور",
            emailLabel: "البريد الإلكتروني",
            emailPlaceholder: "name@example.com",
            sendOtpBtn: "إرسال رمز التحقق",
            backToLogin: "العودة لتسجيل الدخول",
            helpText: "تذكرت كلمة المرور؟",
        },
    }[lang];

    const handleSubmit = (e) => {
        e.preventDefault();
        // UI confirmation only - no backend logic
    };

    return (
        <AuthCard
            title={t.title}
            subtitle={t.subtitle}
            badge={
                <span className="inline-flex items-center gap-1.5">
                    <KeyRound size={13} className="text-brand-active" />
                    <span>{t.badge}</span>
                </span>
            }
            footer={
                <p>
                    {t.helpText}{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-brand-active hover:underline inline-flex items-center gap-1"
                    >
                        {isRTL ? (
                            <ArrowRight size={14} className="shrink-0" />
                        ) : (
                            <ArrowLeft size={14} className="shrink-0" />
                        )}
                        <span>{t.backToLogin}</span>
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <Input
                    label={t.emailLabel}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    leftIcon={<Mail size={18} />}
                    className="h-11 rounded-xl border border-border-main text-sm"
                    dir="ltr"
                />

                {/* Action Button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-brand-active text-text-primary font-semibold hover:bg-brand-hover transition-colors shadow-sm cursor-pointer"
                    >
                        {t.sendOtpBtn}
                    </Button>
                </div>

                {/* Back to Login Secondary Link */}
                <div className="text-center pt-2">
                    <Link
                        to="/login"
                        className="text-xs text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1"
                    >
                        {isRTL ? (
                            <ArrowRight size={12} className="shrink-0" />
                        ) : (
                            <ArrowLeft size={12} className="shrink-0" />
                        )}
                        <span>{t.backToLogin}</span>
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}

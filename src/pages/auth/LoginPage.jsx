import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import AuthCard from "../../services/auth/components/authCard";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/button";
import useLanguage from "../../shared/hooks/useLanguage";
import useLogin from "../../services/auth/hooks/useLogin";

export default function LoginPage() {
    const { lang, isRTL } = useLanguage();
    const { handleLogin, loading } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    // Bilingual dictionary
    const t = {
        en: {
            title: "Welcome Back",
            subtitle: "Sign in with your email and password to access your account",
            emailLabel: "Email Address",
            emailPlaceholder: "name@example.com",
            passwordLabel: "Password",
            passwordPlaceholder: "Enter your password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot password?",
            signInBtn: "Sign In",
            loading: "Signing in...",
            orDivider: "or continue with",
            noAccount: "Don't have an account?",
            createAccount: "Create an account",
            emailRequired: "Email is required",
            emailInvalid: "Please enter a valid email address",
            passwordRequired: "Password is required",
        },
        ar: {
            title: "مرحباً بعودتك",
            subtitle: "سجل الدخول باستخدام بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك",
            emailLabel: "البريد الإلكتروني",
            emailPlaceholder: "name@example.com",
            passwordLabel: "كلمة المرور",
            passwordPlaceholder: "أدخل كلمة المرور",
            rememberMe: "تذكرني",
            forgotPassword: "نسيت كلمة المرور؟",
            signInBtn: "تسجيل الدخول",
            loading: "جاري تسجيل الدخول...",
            orDivider: "أو المتابعة عبر",
            noAccount: "ليس لديك حساب بعد؟",
            createAccount: "إنشاء حساب جديد",
            emailRequired: "البريد الإلكتروني مطلوب",
            emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
            passwordRequired: "كلمة المرور مطلوبة",
        },
    }[lang];

    return (
        <AuthCard
            title={t.title}
            subtitle={t.subtitle}
            footer={
                <p>
                    {t.noAccount}{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-brand-active hover:underline inline-flex items-center gap-1"
                    >
                        <span>{t.createAccount}</span>
                        {isRTL ? (
                            <ArrowLeft size={14} className="shrink-0" />
                        ) : (
                            <ArrowRight size={14} className="shrink-0" />
                        )}
                    </Link>
                </p>
            }
        >
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-4"
            >
                {/* Email Field */}
                <div>
                    <Input
                        label={t.emailLabel}
                        type="email"
                        placeholder={t.emailPlaceholder}
                        leftIcon={<Mail size={18} />}
                        error={errors.email?.message}
                        className="h-11 rounded-xl border border-border-main text-sm"
                        dir="ltr"
                        {...register("email", {
                            required: t.emailRequired,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t.emailInvalid,
                            },
                        })}
                    />
                </div>

                {/* Password Field */}
                <div>
                    <Input
                        label={t.passwordLabel}
                        type="password"
                        allowToggleVisibility
                        placeholder={t.passwordPlaceholder}
                        leftIcon={<Lock size={18} />}
                        error={errors.password?.message}
                        className="h-11 rounded-xl border border-border-main text-sm"
                        {...register("password", {
                            required: t.passwordRequired,
                        })}
                    />
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-text-secondary hover:text-text-primary transition-colors">
                        <input
                            type="checkbox"
                            {...register("rememberMe")}
                            className="size-4 rounded-md border border-border-main bg-input-bg accent-brand-active focus:ring-1 focus:ring-brand-active cursor-pointer"
                        />
                        <span>{t.rememberMe}</span>
                    </label>

                    <Link
                        to="/forgot-password"
                        className="font-medium text-brand-active hover:underline"
                    >
                        {t.forgotPassword}
                    </Link>
                </div>

                {/* Primary Submit Button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-xl bg-brand-active text-text-primary font-semibold hover:bg-brand-hover transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? t.loading : t.signInBtn}
                    </Button>
                </div>

                {/* Social Sign-in Divider */}
                <div className="relative my-4 flex items-center justify-center">
                    <div className="w-full border-t border-border-main/60" />
                    <span className="absolute bg-card-bg px-3 text-xs text-text-secondary">
                        {t.orDivider}
                    </span>
                </div>

                {/* Google Sign-in */}
                <Button
                    type="button"
                    className="w-full h-10 rounded-xl border border-border-main bg-input-bg text-text-primary hover:bg-active-bg text-xs font-medium transition-colors cursor-pointer"
                >
                    Google
                </Button>
            </form>
        </AuthCard>
    );
}

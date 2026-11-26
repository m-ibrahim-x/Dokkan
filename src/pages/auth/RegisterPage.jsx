
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { User, Mail, Phone, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import AuthCard from "../../services/auth/components/authCard";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/button";
import useLanguage from "../../shared/hooks/useLanguage";
import useRegister from "../../services/auth/hooks/useRegister";

export default function RegisterPage() {
    const { lang, isRTL } = useLanguage();
    const { requestOtp, loading } = useRegister();

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
    });

    const agreeTerms = useWatch({
        control,
        name: "agreeTerms",
    });

    // Bilingual dictionary
    const t = {
        en: {
            title: "Create Account",
            subtitle:
                "Sign up to join Dokkan and enjoy personalized shopping",
            usernameLabel: "Full Name",
            usernamePlaceholder: "e.g. John Doe",
            emailLabel: "Email Address",
            emailPlaceholder: "name@example.com",
            phoneLabel: "Phone Number",
            phonePlaceholder: "+20 10 1234 5678",
            passwordLabel: "Password",
            passwordPlaceholder: "At least 6 characters",
            rePasswordLabel: "Confirm Password",
            rePasswordPlaceholder: "Re-enter your password",
            agreeText:
                "I agree to the Terms of Service and Privacy Policy",
            registerBtn: "Create Account",
            hasAccount: "Already have an account?",
            signIn: "Sign In",
            required: "This field is required.",
            usernameMin: "Name must contain at least 2 characters.",
            invalidEmail: "Please enter a valid email address.",
            invalidPhone: "Phone number must contain 10 to 15 digits.",
            passwordMin: "Password must be at least 6 characters.",
            passwordMatch: "Passwords do not match.",
            termsRequired: "You must agree to the terms.",
        },
        ar: {
            title: "إنشاء حساب جديد",
            subtitle:
                "انضم إلى دكان واستمتع بتجربة تسوق متميزة ومخصصة لك",
            usernameLabel: "الاسم الكامل",
            usernamePlaceholder: "مثال: أحمد محمد",
            emailLabel: "البريد الإلكتروني",
            emailPlaceholder: "name@example.com",
            phoneLabel: "رقم الهاتف",
            phonePlaceholder: "+20 10 1234 5678",
            passwordLabel: "كلمة المرور",
            passwordPlaceholder: "6 أحرف على الأقل",
            rePasswordLabel: "تأكيد كلمة المرور",
            rePasswordPlaceholder: "أعد إدخال كلمة المرور",
            agreeText: "أوافق على شروط الخدمة وسياسة الخصوصية",
            registerBtn: "إنشاء الحساب",
            hasAccount: "لديك حساب بالفعل؟",
            signIn: "تسجيل الدخول",
            required: "هذا الحقل مطلوب.",
            usernameMin: "الاسم يجب أن يحتوي على حرفين على الأقل.",
            invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
            invalidPhone: "رقم الهاتف يجب أن يحتوي على 10 إلى 15 رقمًا.",
            passwordMin: "كلمة المرور يجب ألا تقل عن 6 أحرف.",
            passwordMatch: "كلمتا المرور غير متطابقتين.",
            termsRequired: "يجب الموافقة على الشروط.",
        },
    }[lang];

    // Submit Registration Form
    const onSubmit = async (formData) => {
        const payload = {
            ...formData,
            phone: formData.phone.replace(/[\s()-]/g, ""),
        };

        await requestOtp(payload);
    };

    return (
        <AuthCard
            title={t.title}
            subtitle={t.subtitle}
            footer={
                <p>
                    {t.hasAccount}{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-brand-active hover:underline inline-flex items-center gap-1"
                    >
                        <span>{t.signIn}</span>

                        {isRTL ? (
                            <ArrowLeft
                                size={14}
                                className="shrink-0"
                            />
                        ) : (
                            <ArrowRight
                                size={14}
                                className="shrink-0"
                            />
                        )}
                    </Link>
                </p>
            }
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-3.5"
            >
                {/* Username Field */}
                <Input
                    label={t.usernameLabel}
                    type="text"
                    placeholder={t.usernamePlaceholder}
                    leftIcon={<User size={18} />}
                    className="h-11 rounded-xl border border-border-main text-sm"
                    {...register("username", {
                        required: t.required,
                        validate: (value) =>
                            value.trim().length >= 2 ||
                            t.usernameMin,
                    })}
                    error={errors.username?.message}
                />

                {/* Email Field */}
                <Input
                    label={t.emailLabel}
                    type="email"
                    placeholder={t.emailPlaceholder}
                    leftIcon={<Mail size={18} />}
                    className="h-11 rounded-xl border border-border-main text-sm"
                    dir="ltr"
                    {...register("email", {
                        required: t.required,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t.invalidEmail,
                        },
                    })}
                    error={errors.email?.message}
                />

                {/* Phone Field */}
                <Input
                    label={t.phoneLabel}
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    leftIcon={<Phone size={18} />}
                    className="h-11 rounded-xl border border-border-main text-sm"
                    dir="ltr"
                    {...register("phone", {
                        required: t.required,
                        validate: (value) => {
                            const normalized = value.replace(
                                /[\s()-]/g,
                                ""
                            );

                            return (
                                /^\+?\d{10,15}$/.test(normalized) ||
                                t.invalidPhone
                            );
                        },
                    })}
                    error={errors.phone?.message}
                />

                {/* Password Field */}
                <Input
                    label={t.passwordLabel}
                    type="password"
                    allowToggleVisibility
                    placeholder={t.passwordPlaceholder}
                    leftIcon={<Lock size={18} />}
                    className="h-11 rounded-xl border border-border-main text-sm"
                    {...register("password", {
                        required: t.required,
                        minLength: {
                            value: 6,
                            message: t.passwordMin,
                        },
                        deps: ["rePassword"],
                    })}
                    error={errors.password?.message}
                />

                {/* Confirm Password Field */}
                <Input
                    label={t.rePasswordLabel}
                    type="password"
                    allowToggleVisibility
                    placeholder={t.rePasswordPlaceholder}
                    leftIcon={<Lock size={18} />}
                    className="h-11 rounded-xl border border-border-main text-sm"
                    {...register("rePassword", {
                        required: t.required,
                        validate: (value) =>
                            value === getValues("password") ||
                            t.passwordMatch,
                    })}
                    error={errors.rePassword?.message}
                />

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-text-secondary hover:text-text-primary transition-colors">
                        <input
                            type="checkbox"
                            className="mt-0.5 size-4 rounded-md border border-border-main bg-input-bg accent-brand-active focus:ring-1 focus:ring-brand-active cursor-pointer shrink-0"
                            {...register("agreeTerms", {
                                required: t.termsRequired,
                            })}
                        />

                        <span>{t.agreeText}</span>
                    </label>

                    {errors.agreeTerms && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.agreeTerms.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={
                            loading ||
                            isSubmitting ||
                            !agreeTerms
                        }
                        className="w-full h-11 rounded-xl bg-brand-active text-text-primary font-semibold hover:bg-brand-hover transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {t.registerBtn}
                    </Button>
                </div>
            </form>
        </AuthCard>
    );
}

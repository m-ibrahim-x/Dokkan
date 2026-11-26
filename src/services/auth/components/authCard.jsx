import { motion } from "motion/react";
import { Globe, Moon, Sun } from "lucide-react";
import Logo from "../../../shared/ui/logo";
import useTheme from "../../../shared/hooks/useTheme";
import useLanguage from "../../../shared/hooks/useLanguage";

const AuthCard = ({
    title,
    subtitle,
    children,
    footer,
    badge,
}) => {
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLanguage, isRTL } = useLanguage();
    const isDark = theme === "dark";

    return (
        <div className="relative w-full min-h-[calc(100vh-14rem)] flex items-center justify-center py-6 px-4 sm:px-6">
            {/* Subtle decorative background ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 start-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-brand-active/10 blur-3xl -z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-md rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-sm transition-colors"
            >
                {/* Top Control Bar: Language Switcher + Theme Toggle */}
                <div className="flex items-center justify-between pb-6 border-b border-border-main/50 mb-6">
                    {/* Dynamic Language / Direction Switcher */}
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border-main bg-input-bg text-text-primary hover:bg-active-bg transition-colors cursor-pointer"
                        title={isRTL ? "Switch to English (LTR)" : "التبديل إلى العربية (RTL)"}
                        aria-label="Toggle language and direction"
                    >
                        <Globe size={14} className="text-brand-active shrink-0" />
                        <span>{lang === "ar" ? "English" : "العربية"}</span>
                        <span className="text-[10px] uppercase font-bold text-text-secondary px-1 py-0.5 rounded bg-bg-main">
                            {lang === "ar" ? "LTR" : "RTL"}
                        </span>
                    </button>

                    {/* Dark / Light Mode Toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-main bg-input-bg text-text-primary hover:bg-active-bg transition-colors cursor-pointer"
                        title={isDark ? "Light mode" : "Dark mode"}
                        aria-label="Toggle color theme"
                    >
                        {isDark ? (
                            <Sun size={15} className="text-brand-active" />
                        ) : (
                            <Moon size={15} />
                        )}
                    </button>
                </div>

                {/* Brand Header */}
                <div className="flex flex-col items-center text-center">
                    <Logo markClassName="h-10" textClassName="h-7" />

                    {badge && (
                        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border-main bg-input-bg px-3 py-1 text-xs font-medium text-text-secondary">
                            {badge}
                        </div>
                    )}

                    <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-2 text-sm text-text-secondary max-w-sm">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Form / Content Area */}
                <div className="mt-6">
                    {children}
                </div>

                {/* Card Footer (Alternative links, switch between login / register) */}
                {footer && (
                    <div className="mt-6 pt-5 border-t border-border-main/50 text-center text-sm text-text-secondary">
                        {footer}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AuthCard;

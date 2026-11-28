import { useState } from "react";
import { Lock, Mail, Send, X, KeyRound, Info } from "lucide-react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/Input";

const ChangePasswordCard = ({ user }) => {
    const [showOtpForm, setShowOtpForm] = useState(false);

    // Initial email from user data or placeholder
    const defaultEmail = user?.email || "";
    const [email, setEmail] = useState(defaultEmail);

    const handleSendOtp = (e) => {
        e.preventDefault();
        // UI only: exit OTP form
        setShowOtpForm(false);
    };

    const handleCancel = () => {
        setEmail(defaultEmail);
        setShowOtpForm(false);
    };

    return (
        <div className="rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-sm transition-colors space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-main/60 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-input-bg text-brand-active">
                        <Lock className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-primary">Change Password</h3>
                        <p className="text-xs text-text-secondary">Keep your account secure with regular updates</p>
                    </div>
                </div>

                {!showOtpForm && (
                    <Button
                        type="button"
                        onClick={() => setShowOtpForm(true)}
                        leftIcon={<KeyRound className="size-4" />}
                        className="h-9 px-4 rounded-xl border border-border-main bg-input-bg text-text-primary hover:bg-active-bg text-xs font-semibold shadow-xs cursor-pointer"
                    >
                        Change Password
                    </Button>
                )}
            </div>

            {/* Content Area */}
            {!showOtpForm ? (
                /* ================= Default View ================= */
                <div className="flex items-center justify-between gap-4 py-2">
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        To change your password, we will send an OTP verification code to your registered email to confirm your identity.
                    </p>
                </div>
            ) : (
                /* ================= OTP Form View ================= */
                <form onSubmit={handleSendOtp} className="space-y-4 pt-1">
                    {/* Notice message */}
                    <div className="flex items-start gap-3 rounded-2xl border border-border-main/80 bg-input-bg/60 p-4">
                        <Info className="size-5 text-brand-active shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                            An OTP verification code will be sent to your registered email address to verify your identity before resetting your password.
                        </p>
                    </div>

                    {/* Email field */}
                    <div>
                        <Input
                            id="change-password-email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            leftIcon={<Mail className="size-4" />}
                            className="h-10 text-xs sm:text-sm"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            leftIcon={<X className="size-4" />}
                            className="h-10 px-4 rounded-xl border border-border-main bg-input-bg text-text-secondary hover:text-text-primary hover:bg-active-bg text-xs font-medium cursor-pointer"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            leftIcon={<Send className="size-4" />}
                            className="h-10 px-5 rounded-xl bg-brand-active text-text-primary hover:bg-brand-hover text-xs font-semibold shadow-xs cursor-pointer"
                        >
                            Send OTP
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ChangePasswordCard;

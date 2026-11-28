import { useState } from "react";
import { User, Mail, Phone, ShieldCheck, Edit3, Image, Check, X } from "lucide-react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/Input";
import useUpdateProfile from "../hooks/useUpdateProfile";

const ProfileInfoCard = ({ user }) => {
    const {
        formData,
        handleInputChange,
        resetForm,
        saveProfile,
        loading,
    } = useUpdateProfile();

    const [isEditing, setIsEditing] = useState(false);

    // Display fields from current user
    const username = user?.username || "User";
    const email = user?.email || "user@example.com";
    const phone = user?.phone || "Not provided";
    const role = user?.role || "Customer";
    const avatar = user?.avatar || null;

    const handleStartEditing = () => {
        resetForm();
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const result = await saveProfile();
        if (result?.success) {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        setIsEditing(false);
    };

    return (
        <div className="rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-sm transition-colors">
            {!isEditing ? (
                /* ================= View Mode ================= */
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        {/* Avatar */}
                        <div className="relative size-20 sm:size-24 rounded-full border-2 border-border-main bg-input-bg flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt={username}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <User className="size-10 sm:size-12 text-brand-active" />
                            )}
                        </div>

                        {/* User Details */}
                        <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                                    {username}
                                </h2>
                                <span className="inline-flex items-center gap-1 rounded-full border border-border-main bg-input-bg px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
                                    <ShieldCheck className="size-3 text-brand-active" />
                                    <span>{role}</span>
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 text-xs sm:text-sm text-text-secondary">
                                <span className="flex items-center gap-2">
                                    <Mail className="size-4 shrink-0 text-brand-active" />
                                    <span dir="ltr" className="select-all">{email}</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Phone className="size-4 shrink-0 text-brand-active" />
                                    <span dir="ltr">{phone}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="sm:self-center">
                        <Button
                            type="button"
                            onClick={handleStartEditing}
                            leftIcon={<Edit3 className="size-4" />}
                            className="h-10 px-5 rounded-xl border border-border-main bg-input-bg text-text-primary hover:bg-active-bg text-xs font-semibold shadow-xs cursor-pointer"
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
            ) : (
                /* ================= Edit Mode ================= */
                <form onSubmit={handleSave} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-border-main/60 pb-3">
                        <div className="flex items-center gap-2">
                            <Edit3 className="size-5 text-brand-active" />
                            <h3 className="text-lg font-bold text-text-primary">Edit Profile</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            id="profile-username"
                            label="Username"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            placeholder="Enter username"
                            leftIcon={<User className="size-4" />}
                            disabled={loading}
                            className="h-10 text-xs sm:text-sm"
                        />

                        <Input
                            id="profile-phone"
                            label="Phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="Enter phone number"
                            leftIcon={<Phone className="size-4" />}
                            disabled={loading}
                            className="h-10 text-xs sm:text-sm"
                        />

                        <Input
                            id="profile-avatar"
                            label="Avatar URL"
                            value={formData.avatar}
                            onChange={(e) => handleInputChange("avatar", e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                            leftIcon={<Image className="size-4" />}
                            disabled={loading}
                            className="h-10 text-xs sm:text-sm"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            leftIcon={<X className="size-4" />}
                            className="h-10 px-4 rounded-xl border border-border-main bg-input-bg text-text-secondary hover:text-text-primary hover:bg-active-bg text-xs font-medium cursor-pointer"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isLoading={loading}
                            leftIcon={<Check className="size-4" />}
                            className="h-10 px-5 rounded-xl bg-brand-active text-text-primary hover:bg-brand-hover text-xs font-semibold shadow-xs cursor-pointer"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfileInfoCard;

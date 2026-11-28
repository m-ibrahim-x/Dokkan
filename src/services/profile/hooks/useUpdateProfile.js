import { useState } from "react";
import { toast } from "sonner";

import useAuth from "../../../shared/hooks/useAuth";
import { updateUserProfile } from "../api/userApi";

const buildFormData = (currentUser) => ({
    username: currentUser?.username || "",
    phone: currentUser?.phone || "",
    avatar: currentUser?.avatar || "",
});

const buildChangedFields = (formData, currentUser) => {
    const original = buildFormData(currentUser);

    const normalizedOriginal = {
        username: (original.username || "").trim(),
        phone: (original.phone || "").trim(),
        avatar: (original.avatar || "").trim(),
    };

    const normalizedForm = {
        username: (formData.username || "").trim(),
        phone: (formData.phone || "").trim(),
        avatar: (formData.avatar || "").trim(),
    };

    const changes = {};

    if (normalizedForm.username !== normalizedOriginal.username) {
        changes.username = normalizedForm.username;
    }

    if (normalizedForm.phone !== normalizedOriginal.phone) {
        changes.phone = normalizedForm.phone;
    }

    // Avatar Handling:
    // If the entered avatar is empty and differs from original (meaning original had a value and user cleared it),
    // we preserve the existing avatar and do NOT send an empty string.
    // If the user provided a non-empty string that differs from original, send it.
    if (normalizedForm.avatar !== normalizedOriginal.avatar) {
        if (normalizedForm.avatar.length > 0) {
            changes.avatar = normalizedForm.avatar;
        }
    }

    return changes;
};

const useUpdateProfile = () => {
    const { user, updateUser } = useAuth();

    const [formData, setFormData] = useState(() => buildFormData(user));
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData(buildFormData(user));
    };

    const saveProfile = async () => {
        if (loading) return { success: false, hasChanges: true };

        const changes = buildChangedFields(formData, user);

        // If there are no changes, return a clear result and avoid calling the API.
        if (Object.keys(changes).length === 0) {
            toast.info("No changes to save.");
            return { success: true, hasChanges: false };
        }

        if (!user?._id) {
            toast.error("You must be signed in to update your profile.");
            return { success: false, hasChanges: true };
        }

        setLoading(true);

        try {
            const { data } = await updateUserProfile(
                changes,
                user._id
            );

            // Ensure the API returned the updated user.
            if (!data?.user) {
                toast.error("Profile update failed. Please try again.");
                return { success: false, hasChanges: true };
            }

            // Update the Auth Context with the latest user data.
            updateUser(data.user);

            toast.success(
                data.message || "Profile updated successfully!"
            );

            return { success: true, hasChanges: true };

        } catch (error) {
            const status = error.response?.status;

            if (!error.response) {
                toast.error(
                    "Unable to connect to the server. Please try again."
                );
            } else if (status === 400) {
                toast.error(
                    error.response?.data?.message ||
                    "Invalid profile information."
                );
            } else {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
            }

            // On failure, preserve the user's entered form values (formData is already untouched).
            return { success: false, hasChanges: true };

        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleInputChange,
        resetForm,
        saveProfile,
        loading,
    };
};

export default useUpdateProfile;

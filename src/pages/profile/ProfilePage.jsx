import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "../../shared/hooks/useAuth";
import Button from "../../shared/ui/button";
import ProfileInfoCard from "../../services/profile/components/ProfileInfoCard";
import ProfileAddressesCard from "../../services/profile/components/ProfileAddressesCard";
import ChangePasswordCard from "../../services/profile/components/ChangePasswordCard";

const ProfilePage = () => {
    const { user, logout, logoutLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (logout) {
            await logout();
        }
        navigate("/");
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 space-y-6 sm:space-y-8">
            {/* 1. Profile Information */}
            <ProfileInfoCard user={user} />

            {/* 2. Addresses */}
            <ProfileAddressesCard />

            {/* 3. Change Password */}
            <ChangePasswordCard user={user} />

            {/* 4. Full-width Logout Button */}
            <div className="pt-2">
                <Button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    isLoading={logoutLoading}
                    leftIcon={<LogOut className="size-4" />}
                    className="w-full h-12 rounded-2xl border border-status-danger/40 bg-card-bg text-status-danger hover:bg-status-danger/10 text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;

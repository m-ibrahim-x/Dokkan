
import { useState } from "react";
import {
    MapPin,
    Plus,
    Building,
    Globe,
    Navigation,
    Mailbox,
    X,
    Check,
} from "lucide-react";

import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/Input";
import useAddresses from "../hooks/useAddresses";

const ProfileAddressesCard = () => {
    const {
        addresses,
        addressForm,
        handleInputChange,
        addAddress,
        resetForm,
    } = useAddresses();

    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const handleOpenForm = () => {
        resetForm();
        setIsAddingAddress(true);
    };

    const handleAddAddress = (e) => {
        e.preventDefault();

        const success = addAddress();

        if (success) {
            setIsAddingAddress(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        setIsAddingAddress(false);
    };

    return (
        <div className="rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-sm transition-colors space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-main/60 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-input-bg text-brand-active">
                        <MapPin className="size-5" />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-text-primary">
                            Addresses
                        </h3>

                        <p className="text-xs text-text-secondary">
                            Manage your shipping and billing addresses
                        </p>
                    </div>
                </div>

                {!isAddingAddress && (
                    <Button
                        type="button"
                        onClick={handleOpenForm}
                        leftIcon={<Plus className="size-4" />}
                        className="h-9 px-4 rounded-xl border border-border-main bg-input-bg text-text-primary hover:bg-active-bg text-xs font-semibold shadow-xs cursor-pointer"
                    >
                        Add Address
                    </Button>
                )}
            </div>

            {/* Content */}
            {!isAddingAddress ? (
                <div className="space-y-4">

                    {/* Addresses List */}
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <div
                                key={address.id}
                                className="rounded-2xl border border-border-main bg-input-bg/30 p-4 sm:p-5 space-y-3"
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-4 text-brand-active" />

                                    <h4 className="text-sm font-semibold text-text-primary">
                                        Address {index + 1}
                                    </h4>
                                </div>

                                <div className="space-y-2 text-sm text-text-secondary">
                                    <p className="flex items-center gap-2">
                                        <Globe className="size-4 shrink-0 text-brand-active" />
                                        {address.country}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Navigation className="size-4 shrink-0 text-brand-active" />
                                        {address.city}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <MapPin className="size-4 shrink-0 text-brand-active" />
                                        {address.street}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Building className="size-4 shrink-0 text-brand-active" />
                                        {address.building}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Mailbox className="size-4 shrink-0 text-brand-active" />
                                        <span dir="ltr">
                                            {address.postalCode}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center rounded-2xl border border-dashed border-border-main/80 bg-input-bg/30">
                            <div className="size-12 rounded-full bg-input-bg flex items-center justify-center text-text-secondary mb-3">
                                <MapPin className="size-6 text-brand-active/70" />
                            </div>

                            <h4 className="text-sm font-semibold text-text-primary mb-1">
                                No addresses yet
                            </h4>

                            <p className="text-xs text-text-secondary max-w-sm mb-4">
                                You have not added any delivery addresses.
                                Add your first address for faster checkout.
                            </p>

                            <Button
                                type="button"
                                onClick={handleOpenForm}
                                leftIcon={<Plus className="size-4" />}
                                className="h-9 px-4 rounded-xl bg-brand-active text-text-primary hover:bg-brand-hover text-xs font-semibold shadow-xs cursor-pointer"
                            >
                                Add Address
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                /* Address Form */
                <form onSubmit={handleAddAddress} className="space-y-4 pt-1">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="address-country"
                            label="Country"
                            value={addressForm.country}
                            onChange={(e) =>
                                handleInputChange("country", e.target.value)
                            }
                            placeholder="e.g. Egypt"
                            leftIcon={<Globe className="size-4" />}
                            required
                            className="h-10 text-xs sm:text-sm"
                        />

                        <Input
                            id="address-city"
                            label="City"
                            value={addressForm.city}
                            onChange={(e) =>
                                handleInputChange("city", e.target.value)
                            }
                            placeholder="e.g. Cairo"
                            leftIcon={<Navigation className="size-4" />}
                            required
                            className="h-10 text-xs sm:text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="address-street"
                            label="Street"
                            value={addressForm.street}
                            onChange={(e) =>
                                handleInputChange("street", e.target.value)
                            }
                            placeholder="e.g. El-Tahrir St."
                            leftIcon={<MapPin className="size-4" />}
                            required
                            className="h-10 text-xs sm:text-sm"
                        />

                        <Input
                            id="address-building"
                            label="Building"
                            value={addressForm.building}
                            onChange={(e) =>
                                handleInputChange("building", e.target.value)
                            }
                            placeholder="e.g. Building 12, Apt 4"
                            leftIcon={<Building className="size-4" />}
                            required
                            className="h-10 text-xs sm:text-sm"
                        />
                    </div>

                    <div>
                        <Input
                            id="address-postal"
                            label="Postal Code"
                            value={addressForm.postalCode}
                            onChange={(e) =>
                                handleInputChange("postalCode", e.target.value)
                            }
                            placeholder="e.g. 11511"
                            leftIcon={<Mailbox className="size-4" />}
                            required
                            className="h-10 text-xs sm:text-sm"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3">
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
                            leftIcon={<Check className="size-4" />}
                            className="h-10 px-5 rounded-xl bg-brand-active text-text-primary hover:bg-brand-hover text-xs font-semibold shadow-xs cursor-pointer"
                        >
                            Add Address
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfileAddressesCard;

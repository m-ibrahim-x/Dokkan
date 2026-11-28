
import { useState } from "react";
import { toast } from "sonner";

const initialFormData = {
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
};

const useAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [addressForm, setAddressForm] = useState(initialFormData);

    const handleInputChange = (field, value) => {
        setAddressForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setAddressForm({ ...initialFormData });
    };

    const addAddress = () => {
        const newAddress = {
            country: addressForm.country.trim(),
            city: addressForm.city.trim(),
            street: addressForm.street.trim(),
            building: addressForm.building.trim(),
            postalCode: addressForm.postalCode.trim(),
        };

        const hasEmptyFields = Object.values(newAddress).some(
            (value) => !value
        );

        if (hasEmptyFields) {
            toast.error("Please fill in all address fields.");
            return false;
        }

        setAddresses((prev) => [
            ...prev,
            {
                id: Date.now(),
                ...newAddress,
            },
        ]);

        resetForm();

        toast.success("Address added successfully!");

        return true;
    };

    return {
        addresses,
        addressForm,
        handleInputChange,
        addAddress,
        resetForm,
    };
};

export default useAddresses;


import { useRef, useState } from "react";

const useOtpInput = (length = 6) => {
    const [digits, setDigits] = useState(
        Array(length).fill("")
    );

    const inputRefs = useRef([]);

    // Update one digit
    const handleDigitChange = (index, value) => {
        const numbers = value.replace(/\D/g, "");

        if (!numbers) {
            setDigits((prev) => {
                const updated = [...prev];
                updated[index] = "";
                return updated;
            });
            return;
        }

        // Support multiple digits if provided by the input
        const newDigits = [...digits];
        const availableDigits = numbers.slice(0, length - index);

        availableDigits.split("").forEach((digit, i) => {
            newDigits[index + i] = digit;
        });

        setDigits(newDigits);

        const nextIndex = Math.min(
            index + availableDigits.length,
            length - 1
        );

        inputRefs.current[nextIndex]?.focus();
    };

    // Keyboard navigation
    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !digits[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Paste OTP
    const handlePaste = (e) => {
        e.preventDefault();

        const pastedDigits = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, length);

        if (!pastedDigits) return;

        const newDigits = Array(length).fill("");

        pastedDigits.split("").forEach((digit, index) => {
            newDigits[index] = digit;
        });

        setDigits(newDigits);

        const focusIndex = Math.min(
            pastedDigits.length,
            length - 1
        );

        inputRefs.current[focusIndex]?.focus();
    };

    // Clear all digits
    const resetOtp = () => {
        setDigits(Array(length).fill(""));
        inputRefs.current[0]?.focus();
    };

    // Combined OTP value
    const otpValue = digits.join("");

    return {
        digits,
        otpValue,
        inputRefs,
        handleDigitChange,
        handleKeyDown,
        handlePaste,
        resetOtp,
    };
};

export default useOtpInput;

import { useContext } from "react";
import themeContext from "../../app/context/themeContext";

const useTheme = () => {
    const context = useContext(themeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
};

export default useTheme;
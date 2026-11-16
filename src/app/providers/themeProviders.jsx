import { useEffect, useState } from "react";
import themeContext from "../context/themeContext";

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );

        document.documentElement.style.colorScheme = theme;
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === "light" ? "dark" : "light"
        );
    };

    return (
        <themeContext.Provider value={{ theme, setTheme, toggleTheme }}>
        {children}
        </themeContext.Provider>
    );
}

export default ThemeProvider;
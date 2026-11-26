import { useEffect, useState } from "react";
import languageContext from "../context/languageContext";

const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        const savedLang = localStorage.getItem("lang");
        return savedLang === "ar" ? "ar" : "en";
    });

    const isRTL = lang === "ar";
    const dir = isRTL ? "rtl" : "ltr";

    useEffect(() => {
        localStorage.setItem("lang", lang);
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", dir);
    }, [lang, dir]);

    const toggleLanguage = () => {
        setLang((prev) => (prev === "en" ? "ar" : "en"));
    };

    return (
        <languageContext.Provider
            value={{
                lang,
                dir,
                isRTL,
                setLang,
                toggleLanguage,
            }}
        >
            {children}
        </languageContext.Provider>
    );
};

export default LanguageProvider;

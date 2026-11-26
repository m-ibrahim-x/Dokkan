import { useContext } from "react";
import languageContext from "../../app/context/languageContext";

const useLanguage = () => {
    const context = useContext(languageContext);

    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }

    return context;
};

export default useLanguage;

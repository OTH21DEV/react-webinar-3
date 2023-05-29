/**
 * The language selector is filled by languageOptions.
 * Users can change the language of the website from there.
 *create a context that contains the selected language and dictionary.
 */

import { createContext, useState } from "react";
import { languageOptions, dictionaryList } from "../languages";
//create the language context with default selected language

export const LanguageContext = createContext({
  userLanguage: "ru",
  dictionnary: dictionaryList.ru,
});

// it provides the language context to app
export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState("ru");
  localStorage.setItem("rcml-lang", "ru");
  console.log(userLanguage);
  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (newLanguage) => {
      const defaultLanguage = localStorage.getItem("rcml-lang");

      //   const [userLanguage, setUserLanguage] = useState(defaultLanguage || "ru");
      setUserLanguage(newLanguage);
      localStorage.setItem("rcml-lang", newLanguage);
      localStorage.getItem("rcml-lang");
    },
  };
  return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>;
}

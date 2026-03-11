import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "hi";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("omni_lang");
      return stored === "hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    if (lang === "hi") {
      document.documentElement.classList.add("lang-hi");
    } else {
      document.documentElement.classList.remove("lang-hi");
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "hi" : "en";
      try {
        localStorage.setItem("omni_lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

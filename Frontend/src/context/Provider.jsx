import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();
export const ErrorContext = createContext();
export const ThemeContext = createContext();

const ProviderContext = ({ children }) => {
  const [search, setSearch] = useState("");
  const [UIError, setUIError] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <SearchContext value={{ search, setSearch }}>
        <ErrorContext value={{ UIError, setUIError }}>{children}</ErrorContext>
      </SearchContext>
    </ThemeContext>
  );
};

export default ProviderContext;

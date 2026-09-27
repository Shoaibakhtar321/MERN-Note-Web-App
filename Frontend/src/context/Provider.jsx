import { createContext, useState } from "react";

export const SearchContext = createContext();
export const ErrorContext = createContext();

const ProviderContext = ({ children }) => {
  const [search, setSearch] = useState("");
  const [UIError, setUIError] = useState(false);
  return (
    <SearchContext value={{ search, setSearch }}>
      <ErrorContext value={{ UIError, setUIError }}>{children}</ErrorContext>
    </SearchContext>
  );
};

export default ProviderContext;

import { createContext, useState } from "react";

export const SearchContext = createContext();

const ProviderContext = ({ children }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext value={{ search, setSearch }}>{children}</SearchContext>
  );
};

export default ProviderContext;

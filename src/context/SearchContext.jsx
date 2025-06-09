import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSource, setSearchSource] = useState("met");

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchSource, setSearchSource }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

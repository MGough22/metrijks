import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSource, setSearchSource] = useState("met");
  const [collectionSearchTerm, setCollectionSearchTerm] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchSource,
        setSearchSource,
        collectionSearchTerm,
        setCollectionSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

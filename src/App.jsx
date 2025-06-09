import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router";
import SearchBar from "./components/SearchBar";
import ArtworkList from "./components/ArtworkList";
import { ArtworkDetail } from "./components/ArtworkDetail";
import { Exhibition } from "./components/Exhibition";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Header />
      <SearchBar setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/exhibition" element={<Exhibition />} />
        <Route path="/" element={<ArtworkList searchTerm={searchTerm} />} />
        <Route path="/artworks/:source/:id" element={<ArtworkDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

// <Route path="/artwork/met/:id" element={<ArtworkDetail />} />

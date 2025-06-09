import { useState } from "react";

// export default function SearchBar({ setSearchTerm }) {
//   const [query, setQuery] = useState("");
//   const [source, setSource] = useState("met");

//   const handleSubmit = e => {
//     e.preventDefault();
//     setSearchTerm(query);
//     console.log("Searching:", query, "from:", source);
//     // Later: trigger API call here
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
//       <input
//         type="text"
//         placeholder="Search for art..."
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//         style={{ marginRight: "1rem" }}
//       />
//       <label>
//         <input
//           type="radio"
//           value="met"
//           checked={source === "met"}
//           onChange={() => setSource("met")}
//         />
//         MET
//       </label>
//       <label style={{ marginLeft: "1rem" }}>
//         <input
//           type="radio"
//           value="rijks"
//           checked={source === "rijks"}
//           onChange={() => setSource("rijks")}
//         />
//         Rijks
//       </label>
//       <button type="submit" style={{ marginLeft: "1rem" }}>
//         Search
//       </button>
//     </form>
//   );
// }

export default function SearchBar({ setSearchTerm }) {
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length === 0) return;
    setSearchTerm(trimmed);
    // setSearchTerm(query);
    console.log("searchbar input", trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for art..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

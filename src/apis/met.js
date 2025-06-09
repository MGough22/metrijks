import axios from "axios";

const metApi = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});

// export const getMetSearchResults = async query => {
//   const idRes = await metApi.get("/search", {
//     params: {
//       q: query,
//       hasImages: true,
//     },
//   });

export const getMetSearchResults = async query => {
  const idRes = await metApi.get(`/search?hasImages=true&q=${query}`);

  //   const rawUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(
  //     query
  //   )}`;
  //   console.log("Actual outgoing request URL:", rawUrl);

  //   console.log("Querying MET for:", query);

  //   console.log("**********", idRes.data);

  const ids = idRes.data.objectIDs?.slice(0, 20) || [];

  //   console.log("Returned IDs:", ids.length);

  if (ids.length === 0) {
    console.warn("No results for", query);
    return { artworks: [] };
  }

  const detailPromises = ids.map(id => metApi.get(`/objects/${id}`));

  const detailResults = await Promise.allSettled(detailPromises);

  const artworks = detailResults
    .filter(
      res => res.status === "fulfilled" && res.value?.data?.primaryImageSmall
    )
    .map(res => {
      const data = res.value.data;
      return {
        id: data.objectID,
        title: data.title,
        artist: data.artistDisplayName || "Unknown",
        image: data.primaryImageSmall,
        source: "met",
      };
    });

  return { artworks };
};

export const getMetObjectDetails = async id => {
  const response = await metApi.get(`/objects/${id}`);
  return response.data;
};

// export const getMetSearchResults = async query => {
//   const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(
//     query
//   )}`;
//   console.log("URL used in app:", url);

//   const res = await fetch(url);
//   const data = await res.json();
//   console.log("Total results returned:", data.total);

//   const ids = data.objectIDs?.slice(0, 20) || [];

//   const detailPromises = ids.map(id =>
//     fetch(
//       `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
//     )
//   );
//   const detailResponses = await Promise.all(detailPromises);
//   const detailData = await Promise.all(detailResponses.map(res => res.json()));

//   const artworks = detailData
//     .filter(obj => obj.primaryImageSmall)
//     .map(obj => ({
//       id: obj.objectID,
//       title: obj.title,
//       artist: obj.artistDisplayName || "Unknown",
//       image: obj.primaryImageSmall,
//       source: "met",
//     }));

//   return { artworks };
// };

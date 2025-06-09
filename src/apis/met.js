import axios from "axios";

const metApi = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});

export const getMetSearchResults = async query => {
  const idRes = await metApi.get(`/search?hasImages=true&q=${query}`);

  const ids = idRes.data.objectIDs?.slice(0, 20) || [];

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

// export const getMetObjectDetails = async id => {
//   const response = await metApi.get(`/objects/${id}`);
//   return response.data;
// };

export const getMetObjectDetails = async id => {
  const res = await metApi.get(`/objects/${id}`);
  const data = res.data;

  return {
    id: data.objectID,
    source: "met",
    title: data.title,
    image: data.primaryImage || data.primaryImageSmall || "",
    artistDisplayName: data.artistDisplayName || "Unknown",
    objectDate: data.objectDate,
    medium: data.medium,
    dimensions: data.dimensions,
    creditLine: data.creditLine,
    objectURL: data.objectURL,
  };
};

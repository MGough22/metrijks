import axios from "axios";

const metApi = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});

const reservedLocator = objectId =>
  `https://collectionapi.metmuseum.org/api/collection/v1/iiif/${objectId}/restricted`;

export const getMetSearchResults = async (query, page = 1, pageSize = 20) => {
  const idRes = await metApi.get(`/search?hasImages=true&q=${query}`);
  const allIds = idRes.data.objectIDs || [];

  const total = allIds.length;
  if (total === 0) {
    console.warn("No results for", query);
    return { artworks: [], total };
  }

  const startIndex = (page - 1) * pageSize;
  const paginatedIds = allIds.slice(startIndex, startIndex + pageSize);

  const detailPromises = paginatedIds.map(id => metApi.get(`/objects/${id}`));
  const detailResults = await Promise.allSettled(detailPromises);

  console.log("met detailResults: ", detailResults);

  const artworks = detailResults
    .filter(res => res.status === "fulfilled" && res.value?.data)
    .map(res => {
      const data = res.value.data;
      return {
        id: data.objectID,
        title: data.title,
        artist: data.artistDisplayName || "Unknown",
        image: data.primaryImageSmall || reservedLocator(data.objectID),
        source: "met",
        objectURL:
          data.objectURL ||
          `https://www.metmuseum.org/art/collection/search/${data.objectID}`,
      };
    });

  return {
    artworks,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
};

export const getMetObjectDetails = async id => {
  const res = await metApi.get(`/objects/${id}`);
  const data = res.data;

  return {
    id: data.objectID,
    source: "met",
    title: data.title,
    image:
      data.primaryImage ||
      data.primaryImageSmall ||
      reservedLocator(data.objectID) ||
      "",
    artistDisplayName: data.artistDisplayName || "Unknown",
    objectDate: data.objectDate,
    culture: data.culture,
    medium: data.medium,
    dimensions: data.dimensions,
    creditLine: data.creditLine,
    objectURL: data.objectURL,
  };
};

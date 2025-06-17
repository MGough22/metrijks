import axios from "axios";

const rijksApi = axios.create({
  baseURL: "https://www.rijksmuseum.nl/api/en",
  params: {
    key: import.meta.env.VITE_RIJKS_KEY,
    format: "json",
  },
});

export const getRijksSearchResults = async (query, page = 1, pageSize = 20) => {
  const response = await rijksApi.get("/collection", {
    params: {
      q: query,
      ps: pageSize,
      p: page,
      imgonly: true,
    },
  });

  const artworks = response.data.artObjects.map(obj => ({
    id: obj.objectNumber,
    title: obj.title,
    artist: obj.principalOrFirstMaker,
    image: obj.webImage?.url || "",
    source: "rijks",
  }));

  return {
    artworks,
    total: response.data.count,
    page,
    totalPages: Math.ceil(response.data.count / pageSize),
  };
};

export const getRijksObjectDetails = async id => {
  const response = await rijksApi.get(`/collection/${id}`);
  const data = response.data.artObject;

  return {
    id: data.objectNumber,
    title: data.title,
    artist: data.principalOrFirstMaker,
    image: data.webImage?.url || "",

    objectURL:
      response.data.artObject?.links?.web ||
      `https://www.rijksmuseum.nl/en/collection/${id}`,

    source: "rijks",
    date: data.dating?.presentingDate || "Unknown",
    medium: data.materials?.join(", ") || "Unknown",
    dimensions:
      data.dimensions?.map(d => `${d.value} ${d.unit}`).join(", ") || "Unknown",
    creditLine: data.acquisition?.method || "Unknown",
  };
};

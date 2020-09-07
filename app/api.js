const apiKey = "75faddb358e44181908ba782c8d4a604";
const baseUrl = "https://newsapi.org/v2/";

export function getArticles(q, sources) {
  const params = {
    apiKey,
  };

  if (q) {
    params.q = encodeURIComponent(q);
  }

  if (sources.length > 0) {
    params.sources = encodeURIComponent(sources.join(","));
  }

  return fetch(
    baseUrl + "everything?" + new URLSearchParams(params)
  ).then((response) => response.json());
}

export function getSources() {
  const params = {
    apiKey,
  };

  return fetch(
    baseUrl + "sources?" + new URLSearchParams(params)
  ).then((response) => response.json());
}

const feeds = [
  {
    id: "1",
    name: "iPhone news",
    q: "iphone",
    sources: [],
  },
  {
    id: "2",
    name: "Android news",
    q: "android",
    sources: [],
  },
  {
    id: "3",
    name: "Javascript news",
    q: "Javascript",
    sources: [],
  },
  {
    id: "4",
    name: "PHP news",
    q: "PHP",
    sources: [],
  },
];

export function getFeeds() {
  return Promise.resolve(feeds);
}

export function addFeed(name, q, sources) {
  return new Promise((resolve) => {
    const newFeed = {
      id: String(feeds.length + 1),
      name,
      q,
      sources,
    };

    feeds.push(newFeed);
    resolve(newFeed);
  });
}

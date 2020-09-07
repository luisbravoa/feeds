const apiKey = "75faddb358e44181908ba782c8d4a604";
const url = "https://newsapi.org/v2/everything?";

export function getArticles(q) {
  const params = {
    apiKey,
  };

  if (q) {
    params.q = encodeURIComponent(q);
  }

  return fetch(url + new URLSearchParams(params)).then((response) =>
    response.json()
  );
}

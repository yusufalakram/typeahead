export const fetchSuggestions = (query, setHits) => {
  return fetch('https://places-dsn.algolia.net/1/places/query', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      type: 'country',
      language: 'en',
    }),
  })
    .then((response) => response.json())
    .then((json) => (json === undefined ? [] : json.hits))
    .then((hits) => (hits === undefined ? setHits([]) : setHits(hits)))
}

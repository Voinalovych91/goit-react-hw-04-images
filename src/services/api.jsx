const URL = 'https://pixabay.com/api/';
const BASE_KEY = '34896738-a1699c1dbaaca5ea67d26887d';

function apiSearchQuery(query, page) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${BASE_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Did not find anything by request ${query}`)
    );
  });
}

const api = {
  apiSearchQuery,
}

export default api;
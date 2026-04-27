const API_KEY = 'a8ad44719bcd4d6f7d54ba6bf9c58086';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

export const getTrendingMovies = () => {
  return fetchData(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
};

export const getTopRatedMovies = () => {
  return fetchData(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
};

export const getGenres = () => {
  return fetchData(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
};

export const getMoviesByGenre = (genreId) => {
  return fetchData(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
  );
};

export const searchMovies = (query) => {
  return fetchData(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
};

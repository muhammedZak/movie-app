import { createSkeletonRow, createRow } from './ui.js';

import {
  getGenres,
  getMoviesByGenre,
  getTopRatedMovies,
  getTrendingMovies,
  searchMovies,
} from './api.js';

const container = document.getElementById('movieRows');

export const renderAllRows = async () => {
  container.innerHTML = `
    ${createSkeletonRow('Trending')}
    ${createSkeletonRow('Top Rated')}
    ${createSkeletonRow('Action')}
    ${createSkeletonRow('Comedy')}
  `;

  try {
    const [trending, topRated, genres] = await Promise.all([
      getTrendingMovies(),
      getTopRatedMovies(),
      getGenres(),
    ]);

    let html = `
      ${createRow('Trending', trending.results, 'r1')}
      ${createRow('Top Rated', topRated.results, 'r2')}
    `;

    const selectedGenres = genres.genres.slice(0, 6);

    const genrePromises = selectedGenres.map((g) => getMoviesByGenre(g.id));

    const genreMovies = await Promise.all(genrePromises);

    genreMovies.forEach((movies, index) => {
      const genre = selectedGenres[index];
      html += createRow(genre.name, movies.results, `g${genre.id}`);
    });

    container.innerHTML = html;

    container.classList.remove('fade-in');
    void container.offsetWidth;
    container.classList.add('fade-in');
  } catch (error) {
    console.error('Error loading rows:', error);
    container.innerHTML = `
  <div class="error-state">
    <h2>⚠️ Failed to load movies</h2>
    <p>Please check your internet connection</p>
  </div>
`;
  }
};

export const handleSearch = async (e) => {
  const query = e.target.value.trim();

  if (!query) {
    renderAllRows();
    return;
  }

  container.innerHTML = `<p class="text-white px-4">Searching...</p>`;

  try {
    const movies = await searchMovies(query);
    if (movies.results.length === 0) {
      container.innerHTML = `
        <div class="text-white px-4 mt-5">
          <h4>No movies found 😢</h4>
        </div>
      `;
      return;
    }

    container.innerHTML = createRow(
      `Search Results for "${query}"`,
      movies.results,
      'search',
    );
  } catch (error) {
    container.innerHTML = `<p class="text-danger px-4">Error searching</p>`;
  }
};

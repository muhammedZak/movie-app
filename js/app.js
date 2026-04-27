import { getTrendingMovies } from './api.js';

import { renderAuthUI } from './authUI.js';

import { createCarousel } from './ui.js';

import { renderAllRows } from './utils.js';

import { initEvents } from './events.js';

const container = document.getElementById('movieRows');
const searchInput = document.getElementById('searchInput');
const navbar = document.querySelector('.navbar');

async function init() {
  renderAuthUI();

  initEvents(searchInput, navbar);

  try {
    const movies = await getTrendingMovies();

    if (movies.results.length > 0) createCarousel(movies.results);

    renderAllRows();
  } catch (error) {
    console.error('Init error:', error);
    container.innerHTML = `
  <div class="error-state">
    <h2>⚠️ Failed to load movies</h2>
    <p>Please check your internet connection</p>
  </div>
`;
  }
}

init();

import { isAuthenticated } from './auth.js';
import { toggleMyList } from './state.js';
import { handleSearch } from './utils.js';

export const initEvents = (searchInput, navbar) => {
  let debounceTimer;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      handleSearch(e);
    }, 400);
  });

  document.addEventListener('click', (e) => {
    const target = e.target;

    const playBtn = target.closest('.play-btn, .card-img');
    if (playBtn) {
      const movieId = playBtn.dataset.id;

      if (movieId) {
        handlePlay(movieId);
      }
      return;
    }

    const watchlistBtn = target.closest('.watchlist-btn');
    if (watchlistBtn) {
      e.stopPropagation();
      const { id, title, poster } = watchlistBtn.dataset;
      toggleMyList(id, title, poster, watchlistBtn);
      return;
    }

    const scrollBtn = target.closest('.scroll-btn');
    if (scrollBtn) {
      const rowId = scrollBtn.dataset.row;
      const dir = Number(scrollBtn.dataset.dir);
      scrollRow(rowId, dir);
    }
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
};

function scrollRow(id, direction) {
  const row = document.getElementById(id);
  const scrollAmount = 400;

  row.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth',
  });
}

function handlePlay(movieId) {
  if (!isAuthenticated()) {
    localStorage.setItem('redirectAfterLogin', `movie.html?id=${movieId}`);

    window.location.href = 'login.html';
    return;
  }

  window.location.href = `movie.html?id=${movieId}`;
}

const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

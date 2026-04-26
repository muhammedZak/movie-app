const API_KEY = 'a8ad44719bcd4d6f7d54ba6bf9c58086';
const BASE_URL = 'https://api.themoviedb.org/3';

const searchInput = document.getElementById('searchInput');
const navbar = document.querySelector('.navbar');
const carouselContainer = document.getElementById('heroCarousel');
const container = document.getElementById('movieRows');

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function renderAuthUI() {
  const authSection = document.getElementById('authSection');
  const user = getCurrentUser();

  if (!user) {
    authSection.innerHTML = `
      <a href="login.html" class="btn btn-outline-light btn-sm px-3">
        Login
      </a>
    `;
    return;
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  authSection.innerHTML = `
      <div class="profile-menu">
        <div class="avatar">${firstLetter}</div>

        <div class="dropdown-menu-pro">
      
          <div class="dropdown-header">
            <div class="avatar small">${firstLetter}</div>
            <div class="text">
              <p class="name">${user.name}</p>
              <p class="email">${user.email}</p>
            </div>
          </div>

          <div class="dropdown-divider"></div>

          <a href="profile.html">👤 Profile</a>
          <a href="mylist.html">🎬 My List</a>

          <div class="dropdown-divider"></div>

          <button onclick="logout()">🚪 Logout</button>

        </div>
      </div>
    `;
}

function showToast(message) {
  const toast = document.getElementById('toast');

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function getMyList() {
  const user = getCurrentUser();
  if (!user) return [];

  const allLists = JSON.parse(localStorage.getItem('myList')) || {};

  return allLists[user.email] || [];
}

function saveMyList(list) {
  const user = getCurrentUser();
  if (!user) return;

  const allLists = JSON.parse(localStorage.getItem('myList')) || {};

  allLists[user.email] = list;

  localStorage.setItem('myList', JSON.stringify(allLists));
}

function isInMyList(id) {
  return getMyList().some((movie) => Number(movie.id) === Number(id));
}

function toggleMyList(id, title, poster, btn) {
  if (!isAuthenticated()) {
    showToast('Please login to add watchlist 🔒');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
    return;
  }

  let list = getMyList();
  let added = false;

  const exists = list.some((m) => Number(m.id) === Number(id));

  if (exists) {
    list = list.filter((m) => Number(m.id) !== Number(id));
    added = false;
  } else {
    list.push({ id, title, poster_path: poster, status: 'pending' });
    added = true;
  }

  saveMyList(list);

  const heart = btn.querySelector('.heart');
  if (heart) {
    heart.classList.add('animate');

    setTimeout(() => {
      heart.classList.remove('animate');
    }, 300);
  }

  renderAllRows();

  showToast(added ? 'Added to My List ❤️' : 'Removed from My List ❌');
}

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

function getTrendingMovies() {
  return fetchData(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
}

function getTopRatedMovies() {
  return fetchData(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
}

function getGenres() {
  return fetchData(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
}

function getMoviesByGenre(genreId) {
  return fetchData(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
  );
}

function searchMovies(query) {
  return fetchData(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
}

function handlePlay(movieId) {
  if (!isAuthenticated()) {
    localStorage.setItem('redirectAfterLogin', `movie.html?id=${movieId}`);

    window.location.href = 'login.html';
    return;
  }

  window.location.href = `movie.html?id=${movieId}`;
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

let debounceTimer;

searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    handleSearch(e);
  }, 400);
});

// Play button listener
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

function scrollRow(id, direction) {
  const row = document.getElementById(id);
  const scrollAmount = 400;

  row.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth',
  });
}

function createSkeletonRow(title) {
  return `
    <div class="mb-5">
      <h3 class="mb-3 fw-bold">${title}</h3>

      <div class="movie-row">
        ${Array(8)
          .fill()
          .map(
            () => `
            <div class="movie-card skeleton-card">
              <div class="skeleton-img"></div>
            </div>
          `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function createRow(title, movies, rowId) {
  return `
    <div class="mb-5">
      <h3 class="mb-3 fw-bold">${title}</h3>

      <div class="row-wrapper">
        <button class="scroll-btn left" data-row="${rowId}" data-dir="-1">❮</button>

        <div id="${rowId}" class="movie-row">
          ${movies
            .map(
              (movie) => `
              <div class="movie-card">

              <button 
                 class="watchlist-btn"
                 data-id="${movie.id}"
                 data-title="${movie.title}"
                 data-poster="${movie.poster_path}"
              >
                <span class="heart">
                  ${isInMyList(movie.id) ? '❤️' : '🤍'}
                </span>
              </button>

                <img
                class="card-img"
                src="${
                  movie.poster_path?.startsWith('http')
                    ? movie.poster_path
                    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }"
               
                data-id="${movie.id}"
              />
              </div>
            `,
            )
            .join('')}
        </div>

        <button class="scroll-btn right" data-row="${rowId}" data-dir="1">❯</button>
      </div>
    </div>
  `;
}

function createCarousel(movies) {
  carouselContainer.innerHTML = `
    <div id="carouselExample" class="w-100 carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${movies
          .map(
            (movie, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              
              <!-- Background Image -->
              <div class="hero-slide" 
                style="background-image: url(https://image.tmdb.org/t/p/original${movie.backdrop_path})">
                
                <!-- Gradient Overlay -->
                <div class="hero-gradient"></div>

                <!-- Content -->
                <div class=" hero-content">
                  <p class="text-uppercase text-white-50 small mb-2">
                    ⭐ ${movie.vote_average} • ${movie.release_date?.split('-')[0]}
                  </p>

                  <h1 class="display-4 fw-bold text-white">
                    ${movie.title}
                  </h1>

                  <p class="lead text-white  col-lg-6">
                    ${movie.overview.substring(0, 120)}...
                  </p>

                  <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-light btn-lg px-4 play-btn" data-id="${movie.id}">
                      ▶ Play
                    </button>
                    <button class="btn btn-outline-light btn-lg px-4">
                      ℹ More Info
                    </button>
                  </div>
                </div>

              </div>

            </div>
          `,
          )
          .join('')}
      </div>
      </div>
    
  `;
}

async function handleSearch(e) {
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
}

async function renderAllRows() {
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
}

async function init() {
  renderAuthUI();

  try {
    const movies = await getTrendingMovies();

    if (movies.results.length > 0) createCarousel(movies.results);

    renderAllRows();
  } catch (error) {
    console.error('Init error:', error);
  }
}

init();

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

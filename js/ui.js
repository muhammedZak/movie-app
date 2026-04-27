import { isInMyList } from './state.js';

const carouselContainer = document.getElementById('heroCarousel');
const toast = document.getElementById('toast');

export const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
};

export const createRow = (title, movies, rowId) => {
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
};

export const createSkeletonRow = (title) => {
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
};

export const createCarousel = (movies) => {
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
};

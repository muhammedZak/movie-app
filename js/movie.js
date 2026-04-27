const API_KEY = 'a8ad44719bcd4d6f7d54ba6bf9c58086';
const BASE_URL = 'https://api.themoviedb.org/3';

const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return await res.json();
}

async function getMovieVideos(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

function renderMovie(movie, videoKey) {
  const container = document.getElementById('movieDetails');

  container.innerHTML = `
    <button class="back-btn">← Back</button>
    
    <div class="movie-hero" 
      style="background-image: url(https://image.tmdb.org/t/p/original${movie.backdrop_path})">

      <div class="movie-gradient"></div>

      <div class="container movie-content">
        <h1 class="movie-title">${movie.title}</h1>

        <p class="movie-meta">
          ⭐ ${movie.vote_average} • ${movie.release_date?.split('-')[0]}
        </p>

        <p class="movie-overview">
          ${movie.overview}
        </p>

        ${
          videoKey
            ? `
          <div class="trailer-wrapper mt-4">
            <iframe 
              src="https://www.youtube.com/embed/${videoKey}" 
              allowfullscreen>
            </iframe>
          </div>
        `
            : `<p>No trailer available</p>`
        }

      </div>
    </div>
  `;
  document.querySelector('.back-btn').addEventListener('click', goBack);
}

async function init() {
  const movie = await getMovieDetails(movieId);
  const videos = await getMovieVideos(movieId);

  const trailer = videos.find((v) => v.type === 'Trailer');

  renderMovie(movie, trailer?.key);
}

init();

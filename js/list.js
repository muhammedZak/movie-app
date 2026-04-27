import { getMyList, saveMyList } from './state.js';

document.querySelector('.home-btn').addEventListener('click', goHome);

function goHome() {
  window.location.href = 'index.html';
}

function getList() {
  return JSON.parse(localStorage.getItem('myList')) || {};
}

function removeFromList(id) {
  let list = getMyList();
  list = list.filter((m) => Number(m.id) !== Number(id));

  saveMyList(list);
  renderMyList();
}

function goToMovie(id) {
  window.location.href = `movie.html?id=${id}`;
}

function updateStatus(movieId, newStatus) {
  const list = getMyList();

  const updatedList = list.map((movie) => {
    if (Number(movie.id) === Number(movieId)) {
      if (
        newStatus === movie.status ||
        movie.status === 'completed' ||
        newStatus === 'pending'
      ) {
        return movie;
      }

      return { ...movie, status: newStatus };
    }
    return movie;
  });

  saveMyList(updatedList);
  renderMyList();
}

document.addEventListener('click', (e) => {
  const target = e.target;

  const removeBtn = target.closest('.remove-btn');
  if (removeBtn) {
    e.stopPropagation();
    const movieId = removeBtn.dataset.id;
    removeFromList(movieId);
    return;
  }

  const playBtn = target.closest('.mylist-card');
  if (playBtn) {
    const movieId = playBtn.dataset.id;
    goToMovie(movieId);
    return;
  }

  const statusOption = target.closest('.status-option');
  if (statusOption) {
    e.stopPropagation();

    const movieId = statusOption.dataset.id;
    const newStatus = statusOption.dataset.status;

    updateStatus(movieId, newStatus);
    return;
  }
});

function renderMyList() {
  const container = document.getElementById('myListContainer');
  const list = getMyList();

  if (list.length === 0) {
    container.innerHTML = `
    <div class="empty-state">
        <h3>No movies yet 😢</h3>
        <p>Start adding movies to your list</p>
     </div>
`;
    return;
  }

  container.innerHTML = list
    .map(
      (movie) => `
    <div class="col-6 col-sm-4 col-md-3 col-lg-2">

      <div class="mylist-card" data-id="${movie.id}">

        <img src="${
          movie.poster_path?.startsWith('http')
            ? movie.poster_path
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }" />

        <div class="card-overlay">
          <p>${movie.title}</p>
        </div>

        <button class="remove-btn" data-id="${movie.id}">
          ✕
        </button>

      </div>
      <div class="movie-status">
          <span class="status-pill ${movie.status}">
            ${movie.status}
          </span>

          <div class="status-dropdown-wrapper">
            <span class="arrow-icon">➡️</span>

            <div class="status-menu">
              <div class="status-option" data-id="${movie.id}" data-status="pending">Pending</div>
              <div class="status-option" data-id="${movie.id}" data-status="in-progress">In Progress</div>
              <div class="status-option" data-id="${movie.id}" data-status="completed">Completed</div>
            </div>
        </div>
        </div>

    </div>
  `,
    )
    .join('');
}

function init() {
  renderMyList();
}

init();

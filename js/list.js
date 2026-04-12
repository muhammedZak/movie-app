function getMyList() {
  return JSON.parse(localStorage.getItem('myList')) || [];
}

function saveMyList(list) {
  localStorage.setItem('myList', JSON.stringify(list));
}

function removeFromList(e, id) {
  e.stopPropagation();

  let list = getMyList();
  list = list.filter((m) => m.id !== id);

  saveMyList(list);
  renderMyList();
}

function goHome() {
  window.location.href = 'index.html';
}

function goToMovie(id) {
  window.location.href = `movie.html?id=${id}`;
}

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
      
      <div class="mylist-card" onclick="goToMovie(${movie.id})">
        
        <img src="${
          movie.poster_path?.startsWith('http')
            ? movie.poster_path
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }" />

        <div class="card-overlay">
            <p>${movie.title}</p>
        </div>
        
        <button class="remove-btn" onclick="removeFromList(event, ${movie.id})">
          ✕
        </button>

      </div>

    </div>
  `,
    )
    .join('');
}

init();

function init() {
  renderMyList();
}

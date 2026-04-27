import { isAuthenticated } from './auth.js';
import { showToast } from './ui.js';
import { renderAllRows } from './utils.js';

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

export const getMyList = () => {
  const user = getCurrentUser();
  if (!user) return [];

  const allLists = JSON.parse(localStorage.getItem('myList')) || {};

  return allLists[user.email] || [];
};

export const saveMyList = (list) => {
  const user = getCurrentUser();
  if (!user) return;

  const allLists = JSON.parse(localStorage.getItem('myList')) || {};

  allLists[user.email] = list;

  localStorage.setItem('myList', JSON.stringify(allLists));
};

export const isInMyList = (id) => {
  return getMyList().some((movie) => Number(movie.id) === Number(id));
};

export const toggleMyList = (id, title, poster, btn) => {
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
};

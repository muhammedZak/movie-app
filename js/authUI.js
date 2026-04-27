import { getCurrentUser } from './state.js';
import { logout } from './auth.js';

export const renderAuthUI = () => {
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

          <button class="logout-btn">🚪 Logout</button>

        </div>
      </div>
    `;

  document.querySelector('.logout-btn').addEventListener('click', logout);
};

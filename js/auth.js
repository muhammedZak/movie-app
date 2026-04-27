import { validateLogin, validateRegister } from './validate.js';
import { showToast } from './ui.js';

export const register = (name, email, password) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const exists = users.find((user) => user.email === email);
  if (exists) {
    showToast('User already exists!');
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    avatar: null,
  };

  users.push(newUser);

  localStorage.setItem('users', JSON.stringify(users));

  showToast('Successfully registered');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 400);
};

export const login = (email, password) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    showToast('Invalid credentials');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  const redirect = localStorage.getItem('redirectAfterLogin');

  if (redirect) {
    localStorage.removeItem('redirectAfterLogin');
    window.location.href = redirect;
  } else {
    window.location.href = 'index.html';
  }
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('currentUser');
};

export const requireAuth = () => {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
  }
};

export const authInit = () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (!validateLogin(emailInput, passwordInput)) {
        return;
      }

      login(emailInput.value.trim(), passwordInput.value.trim());
    });
  }

  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');

      if (!validateRegister(name, email, password)) {
        return;
      }

      register(name.value.trim(), email.value.trim(), password.value.trim());
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  authInit();
});

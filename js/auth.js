function register(name, email, password) {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const exists = users.find((user) => user.email === email);
  if (exists) {
    alert('User already exists!');
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

  window.location.href = 'index.html';
}

function login(email, password) {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    alert('Invalid credentials');
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
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

function isAuthenticated() {
  return !!localStorage.getItem('currentUser');
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
  }
}

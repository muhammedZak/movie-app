function register(name, email, password) {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userExist = users.find((user) => user.email === email);

  if (userExist) {
    alert('User already exists!');
    return;
  }

  users.push({ name, email, password });

  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration succussfull');
  window.location.href = 'login.html';
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

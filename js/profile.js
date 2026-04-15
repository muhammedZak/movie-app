const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
}

document.getElementById('name').value = currentUser.name;
document.getElementById('email').value = currentUser.email;

function updateProfile() {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const errorEl = document.getElementById('errorMsg');

  const updatedName = document.getElementById('name').value.trim();
  const updatedEmail = document.getElementById('email').value.trim();

  errorEl.textContent = '';

  if (!updatedName || !updatedEmail) {
    errorEl.textContent = 'All fields are required';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(updatedEmail)) {
    errorEl.textContent = 'Invalid email format';
    return;
  }

  const emailExists = users.find(
    (user) => user.email === updatedEmail && user.id !== currentUser.id,
  );

  if (emailExists) {
    errorEl.textContent = 'Email already in use';
    return;
  }

  users = users.map((user) => {
    if (user.id === currentUser.id) {
      return { ...user, name: updatedName, email: updatedEmail };
    }
    return user;
  });

  localStorage.setItem('users', JSON.stringify(users));

  const updatedUser = {
    ...currentUser,
    name: updatedName,
    email: updatedEmail,
  };

  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  errorEl.style.color = 'lightgreen';
  errorEl.textContent = 'Profile updated successfully!';

  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1000);
}

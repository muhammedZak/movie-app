function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showForm(formId) {
  document.getElementById('emailForm').classList.add('hidden');
  document.getElementById('otpForm').classList.add('hidden');
  document.getElementById('resetForm').classList.add('hidden');

  document.getElementById(formId).classList.remove('hidden');
}

function showError(input, message) {
  input.classList.add('is-invalid');
  input.parentElement.querySelector('.error-text').textContent = message;
}

function clearError(input) {
  input.classList.remove('is-invalid');
  input.parentElement.querySelector('.error-text').textContent = '';
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

document.getElementById('emailForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();

  clearError(emailInput);

  if (!email) {
    showError(emailInput, 'Email is required');
    return;
  }

  if (!isValidEmail(email)) {
    showError(emailInput, 'Enter valid email');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((u) => u.email === email);

  if (!user) {
    showError(emailInput, 'Email not registered');
    return;
  }

  const otp = generateOTP();

  const otpData = {
    email,
    otp,
    expires: Date.now() + 2 * 60 * 1000,
  };

  localStorage.setItem('otpData', JSON.stringify(otpData));

  emailjs
    .send('service_yvpwenl', 'template_khan4ic', {
      passcod: otp,
      time: new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString(),
      email: email,
    })
    .then(() => {
      alert('OTP sent to your email 📧');
      showForm('otpForm');
    })
    .catch(() => {
      alert('Failed to send OTP');
    });
});

document.getElementById('otpForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const otpInput = document.getElementById('otp');
  const enteredOTP = otpInput.value.trim();

  clearError(otpInput);

  const otpData = JSON.parse(localStorage.getItem('otpData'));

  if (!enteredOTP) {
    showError(otpInput, 'OTP is required');
    return;
  }

  if (!otpData) {
    showError(otpInput, 'No OTP found');
    return;
  }

  if (Date.now() > otpData.expires) {
    showError(otpInput, 'OTP expired');
    return;
  }

  if (enteredOTP !== otpData.otp) {
    showError(otpInput, 'Invalid OTP');
    return;
  }

  showForm('resetForm');
});

document.getElementById('resetForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const passInput = document.getElementById('newPassword');
  const newPassword = passInput.value.trim();

  clearError(passInput);

  if (newPassword.length < 6) {
    showError(passInput, 'Password must be at least 6 characters');
    return;
  }

  const otpData = JSON.parse(localStorage.getItem('otpData'));
  let users = JSON.parse(localStorage.getItem('users')) || [];

  users = users.map((user) => {
    if (user.email === otpData.email) {
      return { ...user, password: newPassword };
    }
    return user;
  });

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem('otpData');

  alert('Password reset successful 🎉');
  window.location.href = 'login.html';
});

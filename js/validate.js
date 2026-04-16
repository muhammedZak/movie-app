function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
    password,
  );
}

function showError(input, message) {
  input.classList.add('is-invalid');

  const errorDiv = input.parentElement.querySelector('.error-text');
  errorDiv.textContent = message;
}

function clearError(input) {
  input.classList.remove('is-invalid');

  const errorDiv = input.parentElement.querySelector('.error-text');
  errorDiv.textContent = '';
}

function validateRegister(nameInput, emailInput, passwordInput) {
  let isValid = true;

  [nameInput, emailInput, passwordInput].forEach(clearError);

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (name.length < 3) {
    showError(nameInput, 'Name must be at least 3 characters');
    isValid = false;
  }

  if (!isValidEmail(email)) {
    showError(emailInput, 'Enter a valid email');
    isValid = false;
  }

  if (!isStrongPassword(password)) {
    showError(
      passwordInput,
      'Password must contain uppercase, lowercase, number, and special character (min 6 chars)',
    );
    isValid = false;
  }

  return isValid;
}

function validateLogin(emailInput, passwordInput) {
  let isValid = true;

  clearError(emailInput);
  clearError(passwordInput);

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!isValidEmail(email)) {
    showError(emailInput, 'Enter a valid email');
    isValid = false;
  }

  if (password.length === 0) {
    showError(passwordInput, 'Password is required');
    isValid = false;
  }

  return isValid;
}

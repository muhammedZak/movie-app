function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const name = nameInput;
  const email = emailInput;
  const password = passwordInput;

  if (name.length < 3) {
    showError(nameInput, 'Name must be atleast 3 charactors');
    isValid = false;
  }

  if (!isValidEmail(email)) {
    showError(emailInput, 'Enter a valid email');
    isValid = false;
  }

  if (password.length < 6) {
    showError(passwordInput, 'Password must be at least 6 characters');
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

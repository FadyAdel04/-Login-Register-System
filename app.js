// DOM Elements
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const profileSection = document.getElementById('profile');
const errorMessage = document.getElementById('error-message');

const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');

const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');

const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');

// Toggle between Register, Login
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  errorMessage.style.display = 'none';
});

showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  errorMessage.style.display = 'none';
});

// Register a new user
registerButton.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  //if email is registered before
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const isEmailTaken = users.some(user => user.email === email);

  if (isEmailTaken) {
    showError('Email is already registered.');
    return;
  }

  // Save user data
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful! Please login.');
  registerForm.reset();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Login user
loginButton.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // Successful login
    loginForm.style.display = 'none';
    profileSection.style.display = 'block';
    profileName.textContent = user.name;
    profileEmail.textContent = user.email;
  } else {
    showError('Invalid email or password.');
  }
});


// Logout user
logoutButton.addEventListener('click', () => {
  profileSection.style.display = 'none';
  loginForm.style.display = 'block';
  loginForm.reset();
});

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}


//Password Visibility
function togglePasswordVisibility(inputId, toggleIconId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = document.getElementById(toggleIconId);

  toggleIcon.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }
  });
}

// Apply to both password fields
togglePasswordVisibility('password', 'toggle-password');
togglePasswordVisibility('login-password', 'toggle-login-password');
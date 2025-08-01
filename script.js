document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const dashboard = document.getElementById('dashboard');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    
    const savedUser = JSON.parse(localStorage.getItem('userData'));

    if (savedUser && username === savedUser.username && password === savedUser.password) {
     window.location.href = 'dashboard.html';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });
});
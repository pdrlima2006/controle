document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const dashboard = document.getElementById('dashboard');
  const briefcase = document.querySelector('.briefcase');

  // Animação: boneco entra, maleta abre e formulário aparece
  setTimeout(() => {
    briefcase.classList.remove('closed');
    briefcase.classList.add('open');

    setTimeout(() => {
      loginSection.style.display = 'block';
    }, 1000);
  }, 3000);

  // Seu login original
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

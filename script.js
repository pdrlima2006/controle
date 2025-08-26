// script.js - sem backend

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Preencha todos os campos!');
    return;
  }

  // Login fake: usuário "admin" e senha "1234"
  if (username === 'admin' && password === '1234') {
    localStorage.setItem('token', 'fake-token'); // simula um token
    localStorage.setItem('username', username); // opcional: salvar usuário
    window.location.href = 'dashboard.html';
  } else {
    alert('Usuário ou senha incorretos!');
  }
});

// Função para proteger páginas (dashboard)
export function checkLogin() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa fazer login!');
    window.location.href = 'index.html';
  }
}

// Função de logout
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'index.html';
}

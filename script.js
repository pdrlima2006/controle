// script.js - login e armazenamento no localStorage

// Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Preencha todos os campos!');
    return;
  }

  // Pega usuários cadastrados do localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Procura usuário cadastrado
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

  if (user) {
    // Salva token e usuário logado
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('username', username);
    window.location.href = 'dashboard.html'; // painel
  } else {
    alert('Usuário ou senha incorretos!');
  }
});

// Função para proteger páginas (dashboard)
export function checkLogin() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa fazer login!');
    window.location.href = 'index.html'; // página de login
  }
}

// Função de logout
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'index.html'; // redireciona para login ao sair
}

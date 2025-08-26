const backendURL = "https://controle-kd5w.onrender.com"; // URL do Render

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const res = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Usuário ou senha incorretos!');
    }
  } catch {
    alert('Erro de conexão com servidor!');
  }
});

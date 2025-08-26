import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool, initDb } from './db.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

initDb().catch(err => { console.error(err); process.exit(1); });

function createToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ success: false, message: 'Informe usuário e senha.' });

  try {
    const password_hash = bcrypt.hashSync(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1,$2) RETURNING id, username',
      [username, password_hash]
    );
    const token = createToken(result.rows[0]);
    res.status(201).json({ success: true, user: result.rows[0], token });
  } catch (err) {
    if (String(err.message).includes('unique')) 
      return res.status(409).json({ success: false, message: 'Usuário já existe.' });
    res.status(500).json({ success: false, message: 'Erro ao cadastrar.' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ success: false, message: 'Informe usuário e senha.' });

  try {
    const result = await pool.query('SELECT id, username, password_hash FROM users WHERE username=$1', [username]);
    const row = result.rows[0];
    if (!row || !bcrypt.compareSync(password, row.password_hash))
      return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });

    const token = createToken({ id: row.id, username: row.username });
    res.json({ success: true, user: { id: row.id, username: row.username }, token });
  } catch {
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
});

app.get('/me', authMiddleware, (req,res)=>res.json({ success:true, user:req.user }));

app.listen(PORT, ()=>console.log(`Backend rodando na porta ${PORT}`));
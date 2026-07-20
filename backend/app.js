import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import {randomUUID} from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const users = [];
app.post("/user/add", (req, res) => {
  const { name, email } = req.body;
  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const userId = randomUUID();

  users.push({ id: userId, name, email });

  res.status(201).json({
    message: "Data berhasil disimpan",
    data: {
      id: userId,
      name,
      email,
    },
  });
});

// Get all users
app.get("/user/list", (req, res) => {
  res.json(users);
});

app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;

  const initialLength = users.length;
  users = users.filter((u) => u.id !== id);

  if (users.length === initialLength) {
    return res.status(404).json({ message: "User tidak ditemukan." });
  }

  res.json({ message: "User berhasil dihapus!" });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      message: "Invalid JSON body",
    });
  }

  next(err);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
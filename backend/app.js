import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

const users = [];
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
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

  users.push({ name, email });

  res.status(201).json({
    message: "Data berhasil disimpan",
    data: {
      name,
      email,
    },
  });
});

// Get all users
app.get("/user/list", (req, res) => {
  res.json(users);
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
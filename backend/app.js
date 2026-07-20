import express from "express";

const app = express();
const port = 3000;

app.use(express.static("backend\\public"));
app.use(express.json());

const users = [];

app.post("/user/add", (req, res) => {
  const { name, email } = req.body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({
      message: "Name and email are required",
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
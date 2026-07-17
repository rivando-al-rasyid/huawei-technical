import express from "express";

const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse JSON (useful for future API requests)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  res.json({
    message: "Data received",
    username,
    password,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
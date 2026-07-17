import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

const users = [];

app.post("/user/add", (req, res) => {
  users.push(req.body);

  res.json({
    message: "Data berhasil disimpan",
  });
});

app.get("/user/list", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
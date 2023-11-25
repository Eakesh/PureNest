import express from "express";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  return res.json({ server: "up" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

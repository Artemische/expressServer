const app = require("express")();
const PORT = 3000;

app.get("/", (req, res) => {
  console.log("GET");
});

app.get("/food", (req, res) => {
  const { name } = req.query;
  
  res.send(`${name}`);
});

app.listen(PORT);
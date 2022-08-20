const app = require("express")();
const reader = require('xlsx');
const PORT = 3000;

app.get("/", (req, res) => {
  console.log("GET");
});

app.get("/food", (req, res) => {
  const { name } = req.query;

  const file = reader.readFile('./ABBREV.xlsx');
  const json = reader.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]])
  const results = json.filter((el) => el.Shrt_Desc.toLowerCase().includes(name.toLowerCase()));

  res.send(`${JSON.stringify(results[0])}`);
});

app.listen(PORT);
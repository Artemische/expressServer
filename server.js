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
  const results = json.filter((el) => el.Shrt_Desc.toLowerCase().includes(name.toLowerCase())).
    sort((a, b) => {
      const aPart = a.Shrt_Desc.toLowerCase().split(name.toLowerCase())[0];
      const bPart = b.Shrt_Desc.toLowerCase().split(name.toLowerCase())[0];
      const aInd = aPart ? 1 - (aPart.match(/[,]/g) || []).length : 2;
      const bInd = bPart ? 1 - (bPart.match(/[,]/g) || []).length : 2;

      return bInd - aInd;
  });
  const output = {
    "name": results[0]["Shrt_Desc"],
    "kcal, g": results[0]["Energ_Kcal"],
    "protein, g": results[0]["Protein_(g)"],
    "lipid, g": results[0]["Lipid_Tot_(g)"],
    "carbohydrates, g": results[0]["Carbohydrt_(g)"],
  }

  res.send(`${JSON.stringify(output)}`);
});

app.listen(PORT);
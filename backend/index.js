const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;

 app.use(express.json());

app.use('/api/product',require('./routes/product'))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

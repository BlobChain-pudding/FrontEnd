const express = require("express");
const cors = require('cors');
const h = require("./modules/handlers");
const app = express();
const PORT = 3000;

app.use(cors({
  origin:['http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static("static"));

app.post("/token", h.tokenHandler);

app.post("/sig", h.sigHandler);

app.post("/request", h.reqHandler);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

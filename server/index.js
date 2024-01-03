const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const initRoutes = require("./routes");
const app = express();
require("./config/redis.config");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

dbConnect();

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log("...Server Ready on " + PORT));

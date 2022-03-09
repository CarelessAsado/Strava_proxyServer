const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { currentUrl } = require("./models/url");

/*---------------------------*/
const app = express();
port = process.env.PORT || 5000;
/*-------------------------------*/
app.use(
  cors({
    origin: [currentUrl],
  })
);
/*---------------START DB and SERVER-------------------*/
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Atlas connected");
  app.listen(port, () =>
    console.log("Server connected at http://localhost:" + port)
  );
});
/*------------GET REFRESH AND NEW ACCESS TOKEN------------*/
const tokenRoute = require("./routes/tokens");
app.use("/", mid, tokenRoute);

function mid(req, res, next) {
  if (req.headers.origin === currentUrl) {
    return next();
  }
  res.status(403).json("Not authorized to use my proxy server");
}

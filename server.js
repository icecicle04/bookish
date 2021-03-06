const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./models");
const axios = require("axios");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "moonwalking",
    resave: true,
    saveUninitialized: true,
    // cookie:{
    //   expires: 600000
    // }
  })
);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
  // db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});

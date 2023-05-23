const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// const date = new Date("December 4, 2022 01:15:00");
const date = new Date();
const day = date.getDay();
const hour = date.getHours();

console.log(day, hour);
if (day < 1 || day > 5 || hour < 9 || hour > 17) {
  app.get("/*", (req, res, next) => {
    res.render("offhours/offhours", {
      pageTitle: "offHours",
    });
  });
} else {
  app.get("/", (req, res, next) => {
    res.render("home/home", {
      pageTitle: "Home",
    });
  });
  app.get("/service", (req, res, next) => {
    res.render("service/service", {
      pageTitle: "Service",
    });
  });
  app.get("/contact", (req, res, next) => {
    res.render("contactUs/contact", {
      pageTitle: "Contact Us",
    });
  });
}

const getError = (req, res, next) => {
  res.status(404).render("error", {
    pageTitle: "404",
  });
};
app.use(getError);

app.listen(3000);

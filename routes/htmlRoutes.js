var db = require("../models");
// const express = require("express");
// const router = express().Router();

module.exports = function(app) {
  require("./childApiRoutes")(app);
  require("./parentApiRoutes")(app);
  require("./forms")(app);
  require("./scheduleRoutes")(app);
  require("./mainroutes")(app);

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

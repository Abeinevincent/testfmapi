const express = require("express");
const buyerAuth = require("./auth/buyer/auth");
const auth = require("./auth/farmer/auth");
const buyerRoutes = require("./users/buyer");
const farmerRoute = require("./users/farmer");
const router = express.Router();

const routes = () => {
  // FARMER AUTH
  auth(router);

  // BUYER AUTH
  buyerAuth(router);

  // FARMER
  farmerRoute(router);

  // BUYER
  buyerRoutes(router);

  return router;
};

module.exports = routes;

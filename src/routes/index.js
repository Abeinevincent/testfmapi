const express = require("express");
const { bidItemsRoute } = require("./auction/documentedbiditems");
const buyerAuth = require("./auth/buyer/auth");
const auth = require("./auth/farmer/auth");
const { allProduceRoutes } = require("./farmerproduce/AllProduce");
const farmerProduceRoutes = require("./farmerproduce/FarmerProduce");
const farmerSpecificsRoutes = require("./farmerspecifics/farmerspecifics");
const {
  notificationsRoute,
} = require("./notifications/documentednotifications");
const { paymentsRoute } = require("./payments/payments");
const smsRoute = require("./sms/sms");
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

  // BID ITEMS
  bidItemsRoute(router);

  // FARMER PRODUCE ROUTES
  farmerProduceRoutes(router);

  // ALL PRODUCE ROUTES
  allProduceRoutes(router);

  // FARMER SPECIFICS ROUTE
  farmerSpecificsRoutes(router);

  // SMS ROUTE
  smsRoute(router);

  // PAYMENTS ROUTE
  paymentsRoute(router);

  // NOTIFICATIONS ROUte
  notificationsRoute(router);

  return router;
};

module.exports = routes;

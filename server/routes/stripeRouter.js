const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  handlerStripePayment,
  handleFreeSubscription,
  verifyPayment,
} = require("../controllers/handleStripePayment");

const stripeRouter = express.Router();

stripeRouter.post("/checkout", isAuthenticated, handlerStripePayment);
stripeRouter.post("/free-plan", isAuthenticated, handleFreeSubscription);
stripeRouter.post("/verify-payment/:paymentId", isAuthenticated, verifyPayment);

module.exports = stripeRouter;

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//-----isAuthenticated middleware-----
const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
    //!verify token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    //the actual user login
    //add the user to the req obj
    req.user = await User.findById(decoded?.id).select("-password");
    return next();
  } else {
    return res.status(401).json({ message: "Not Authorised, no token" });
  }
});
module.exports = isAuthenticated;

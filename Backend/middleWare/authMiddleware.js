const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// cheack user is authenticated or not.
exports.isAuthenticated =  asyncHandler(async (req, res, next) => {
  try {
      // bearer token split from localstorage token.
      const token = req.headers.cookie.split('token=')[1];
    //   console.log('token From isAuthenticated: ', req.headers.cookie.split('token=')[1]);
      // console.log('From isAuthenticated: ', req.cookies);

    //   const { token } = req.cookies;
    // console.log(token);

      if(token === 'undefined') {
          throw new Error('Unauthorized! No token provided || 401');
      }

      // console.log("cookies Token from auth: ", token)
      if(!token){
          // throw new ErrorHandler(`you are not authenticated!`, 400)
          throw new Error("Not authorized, please login");
          // res.status(401).send("Not authorized, please login");
      }else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id);

          // check user is exist or not on database.
          if(!user){
              // throw new ErrorHandler(`you are not authenticated!`, 400)
              throw new Error("Not authorized, please login");
              // res.status(401).send("Not authorized, please login");
          }
          req.user = user;
          next();
      }
  } catch (error) {
      res.status(500).json({
       success: false,
       error: error.message,
       // error: error.stack,
      })
  }
});

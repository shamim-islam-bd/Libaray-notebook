const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// exports.protect = asyncHandler(async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       res.status(401);
//       throw new Error("Not authorized, please login");
//     }

//     // Verify Token
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     // Get user id from token
//     const user = await User.findById(verified.id).select("-password");

//     if (!user) {
//       res.status(401);
//       throw new Error("User not found");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not authorized, please login");
//   }
// });



// cheack user is authenticated or not.
exports.protect = async(req, res, next) => {
  try {
      // bearer token split from localstorage token.
      const token = req.headers.authorization.split(' ')[1];
      // console.log('token From isAuthenticated: ', token);
      // console.log('From isAuthenticated: ', req.headers.authorization);

      // if(token === 'undefined') {
      //     throw new ErrorHandler(401, 'Unauthorized! No token provided.');
      // }
      // const { token } = req.cookies;

      // console.log("cookies Token from auth: ", token)
      if(!token){
          throw new ErrorHandler(`you are not authenticated!`, 400)
      }else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id);
          // check user is exist or not on database.
          if(!user){
              throw new ErrorHandler(`you are not authenticated!`, 400)
          }
          req.user = user;
          next();
      }
  } catch (error) {
      res.status(500).json({
       success: false,
       error: error.message,
      //  error: error.stack,
      })
  }
}

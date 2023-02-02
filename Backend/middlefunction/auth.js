const asyncHandler = require("express-async-handler");
const User = require("../schema/userModel");
const jwt = require("jsonwebtoken");

// cheack user is authenticated or not.
exports.isAuthenticated =  asyncHandler(async (req, res, next) => {
  try {
      // bearer token split from localstorage token.
      const token = req.headers.cookie.split('token=')[1];
      if(token === 'undefined') {
          throw new Error('Unauthorized! No token provided || 401');
      }

      if(!token){
          throw new Error("Not authorized, please login");
      }else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id);

          console.log("user frm Auth midlwre: ",user);

          // check user is exist or not on database.
          if(!user){
              throw new Error("Not authorized, please login");
          }
          req.user = user;
          next();
      }
  } catch (error) {
      res.status(500).json({
       success: false,
       error: error.message,
      })
  }
});


exports.authorizeBy = (...roles) => { // roles = ['admin', 'user']
  const rolesArray = [...roles];
  try {
      return (req, res, next) => { 
          const userRole = req.user.role;
          const result = rolesArray.map(role => userRole.includes(role)).find(item => item === true);
          // console.log("Result: ", result)

          if(!result) return res.status(401).json({
              message: `${req.user.role} cann't authorized to access this route.`
          })
          next();
      }
      
  } catch (error) {
      res.status(404).json({error: error.message})
  }
}

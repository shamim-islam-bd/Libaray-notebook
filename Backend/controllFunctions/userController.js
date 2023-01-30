const asyncHandler = require("express-async-handler");
const User = require("../schema/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../schema/tokenModel");

const { sendToken } = require("../utils/jwtToken");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Create new user
  const user = await User.create({ name, email, password });

  const token = await user.getJwtToken();

  if (user) {
    res.status(201).json({
      token,
      user,
    });

    // console.log("frm backend: ", user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }

    // User exists, check if password is correct.
    const isPassMatched = await bcrypt.compare(password, user.password);
    if (!isPassMatched) {
      throw new Error(`invailed email and password`);
    }

    sendToken(user, res, 200);

    //   Generate Token
    // const token = generateToken(user._id);

    // Send HTTP-only cookie
    // res.cookie("token", token, {
    //   // httpOnly: true,
    //   expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    //   secure: true,
    // });

    // if (user && passwordIsCorrect) {
    //   const { _id, name, email, photo, phone, bio } = user;
    //   res.status(200).json({
    //     _id,
    //     name,
    //     email,
    //     photo,
    //     phone,
    //     bio,
    //     token,
    //   });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get User Data
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({ users: users });
  } else {
    res.status(400);
    throw new Error("Users Not Found");
  }
});
// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  getAllUser,
  loginStatus,
};

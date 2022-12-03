const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const path = require("path");

const app = express();
// Connect to DB and start server...
const PORT = process.env.PORT;


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

app.use(
  cors({
    // origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    origin: ["http://localhost:5173", `http://localhost:${PORT}`],
    credentials: true,
  })
);


// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
// app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware..
app.use(errorHandler);





// here database connection is established & server is started.
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection Succesful");
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.log({
    message: err.message,
    stack: err.stack
    })
  })

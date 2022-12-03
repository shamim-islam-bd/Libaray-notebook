// external imports
const express =  require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');


// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());


// Connect to DB and start server...
const PORT = process.env.PORT;



app.use(
  cors({
    // origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    origin: ["http://localhost:5173", `http://localhost:${PORT}`],
    credentials: true,
  })
);

// external imports
const userRoute = require("./routes/userRoute");
const booksRoute = require("./routes/booksRoute");
const errorHandler = require("./middleWare/errorMiddleware");
// const contactRoute = require("./routes/contactRoute");




// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
  });


// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/books", booksRoute);
// app.use("/api/contactus", contactRoute);

  
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
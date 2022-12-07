const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// socket.io setup 
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);

const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const AdminRoute = require("./routes/AdminRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const path = require("path");

const Books = require("./models/bookModel");
const Document = require("./models/documents");




// Connect to DB and start server...
const PORT = process.env.PORT;


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// app.use(
//   cors({
//         // origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
//     origin: ["http://localhost:5173", `http://localhost:${PORT}`],
//     credentials: true,
//   })
// );


// Socket.io connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// //Whenever someone connects this gets executed
// io.on('connection', function(socket) {
//   console.log(`User connected ${socket.id}`);

//   //Whenever someone disconnects this piece of code executed
//   socket.on('disconnect', function () {
//      console.log(`User disconnected ${socket.id}`);
//   });

//   //Whenever someone sends a message this piece of code executed.
//   socket.on('message', function(message) {
//     console.log(`Message: ${message}`);
//     io.emit('message', message);
//   });


//   socket.on("send-changes", delta => {
//     socket.broadcast.emit("receive-changes", delta)
//   })

// });







// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/admin", AdminRoute);
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
    // when socket.io is used with express, we need to pass the server object to socket.io(server) instead of (app) object.
    server.listen(PORT, () => {  
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




  const defaultValue = ""

  io.on("connection", socket => {
    socket.on("get-document", async documentId => {
      // console.log("documentid: ", documentId);
      const document = await findOrCreateDocument(documentId)
      socket.join(documentId)
      socket.emit("load-document", document.data)
  
      socket.on("send-changes", delta => {
        socket.broadcast.to(documentId).emit("receive-changes", delta)
      })
  
      socket.on("save-document", async data => {
        await Document.findByIdAndUpdate(documentId, { data })
        // console.log("Data: ", data);
      })
    })
  })
  
  async function findOrCreateDocument(id) {
    if (id == null) return
  
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue })
  }
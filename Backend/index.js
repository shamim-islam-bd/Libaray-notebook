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

const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const AdminRoute = require("./routes/Admin");
const errorHandler = require("./middlefunction/error");
const path = require("path");

const Books = require("./schema/bookModel");
const Document = require("./schema/documents");




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
  .connect(process.env.MONGODB)
  .then(() => {
    // when socket.io is used with express, we need to pass the server object to socket.io(server) instead of (app) object.
    server.listen(PORT, () => {  
      console.log(`Database connected.`);
      console.log(`Server on ${PORT}`);
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
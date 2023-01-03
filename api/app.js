const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jgp" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application / json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://udemyproject:udemydb1009@cluster0.9gx2eko.mongodb.net/messages?retryWrites=true"
  )
  .then((result) => {
    app.listen(8080, () => {
      console.log("Server running at port 8080!");
    });
  })
  .catch((err) => console.log(err));

//  376
//  382 -> 383
// 384
// 387 https://github.com/KhunKyawTunwin/udemyfullcourse.git

//  391 half
//

// hello new commit
// hello new commit
// hello new commit
// hello new commit 1
// hello new commit 2
// hello new commit 3
// hello new commit 4
// hello new commit 5
// hello new commit 6
// hello new commit 7
/* 
389. How Does Authentication Work?
Well we obviously still have our client and server and the client still sends authentication data to the server,so the email and the password let's say. In the past, we then would have checked that data on the server and if it is valid, we would have established a session.Now we don't use a session anymore because restful APIs are stateless,they don't care about the client,
you learned about that strict decoupling of server and client and every request should be treated standalone,that means every request should have all the data it needs to authenticate itself. With a session,

Obviously we will still validate the input on the server, we'll still check for the validity of the e-mail and password combination.

*/

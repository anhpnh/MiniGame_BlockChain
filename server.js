let express = require("express");
let app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(
  "/scripts",
  express.static(__dirname + "/node_modules/web3.js-browser/build/", {
    index: false,
    immutable: true,
    cacheControl: true,
    maxAge: "30d",
  })
);

let server = require("http").Server(app);
let io = require("socket.io")(server);
server.listen(80);

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//Mongoose minigame/4vmIUIS8WRT1cSF7
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://minigame:4vmIUIS8WRT1cSF7@cluster0.qjnpw.mongodb.net/minigame?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log("Mongoose connected error: " + err);
    } else {
      console.log("Mongoose connected successfully");
    }
  }
);

require("./controllers/game")(app);

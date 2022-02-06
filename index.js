const express = require("express");
const path = require("path");
require("dotenv").config();

//App Express
const app = express();

//Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require('./sockets/socket');
//Path publico
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
const puerto = process.env.PORT;
server.listen(puerto, (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en el puerto: ", puerto);
});

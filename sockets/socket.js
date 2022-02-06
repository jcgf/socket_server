const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");
const bands = new Bands();
bands.addBands(new Band("Queen"));
bands.addBands(new Band("Bon Jovi"));
bands.addBands(new Band("Metallica"));
bands.addBands(new Band("AC/DC"));
//Mensajes sockets
io.on("connection", (client) => {
  console.log("Cliente Conectado");
  client.emit("active-bands", bands.getBands());
  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  client.on("mensaje", (payload) => {
    console.log("Mensaje:", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
  client.on("emitir-mensaje", (payload) => {
    //io.emit("nuevo-mensaje", payload);
    client.broadcast.emit("nuevo-mensaje", payload);
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("new-band", (payload) => {
    const newBand = new Band(payload.name);
    bands.addBands(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload)=>{
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});

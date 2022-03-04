let mongoose = require("mongoose");
const MensajesCollection = "mensajes";

const MensajesEsquema = mongoose.Schema({

  autor: { type: Object, require: true, minLength: 10, maxLength: 250},

  texto: { type: String, require: true, minLength: 1, maxLength:200},

  date: {type: Date}
});

module.exports = {
  Mensaje: mongoose.model(MensajesCollection, MensajesEsquema),
};

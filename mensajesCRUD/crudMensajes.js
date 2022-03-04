let { Mensaje } = require("../models/mensajesModel.js");
let { ConectMongo } = require("../options/options.js");

const getMsjs = async () => {
  await ConectMongo("mensajes");
  return await Mensaje.find({});
};

const setMsj = async (msjIn) => {
  ConectMongo().then(() => {
    Mensaje.insertMany(msjIn, (err) => {
      if (err) {
        console.log("Error grabando el msjs" + err)
      } else {
        console.log("msj guardado : " + JSON.stringify(msjIn));
      }
    });
  });
};

module.exports = {
  getMsjs,
  setMsj,
};

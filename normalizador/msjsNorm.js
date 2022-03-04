const { normalize, schema } = require("normalizr");

// console.log("Longitud antes de normalizar:", JSON.stringify(empresa).length);
// console.log(
//   "Longitud después de normalizar:",
//   JSON.stringify(normalizedEmpresa).length
// );

const autorSchema = new schema.Entity("autor");
const mensajesSchema = new schema.Entity("mensajes", {
  autor: autorSchema,
});

const normalizadorMSJS = (msjs) => {
  return normalize(msjs, mensajesSchema);
};

module.exports = {
  normalizadorMSJS,
};

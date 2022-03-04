const d = document;
const socket = io();

// const autorSchema = normalize.schema.Entity("autor");
// const mensajesSchema = normalize.schema.Entity("mensajes", {
//   autor: [autorSchema],
// });

// const desnormalizadoMSJS = (data) =>
//   normalize.denormalize(data, mensajesSchema, data.entities);

socket.on("mensajes", (data) => {
  let algo = data.entities.mensajes.undefined;
  chatRender(algo);
});

// const chatRender = (data) => {
//   let chatHtml = data
//     .map(
//       (m) => `
//     <div class='fila'>
//        <strong id='person'> ${m.autor.nombre}</strong>
//        <p id='time'> ${m.date} : <p>
//        <p id='msj'> ${m.texto}</p>
//    </div>
//     `
//     )
//     .join(" ");
//   d.getElementById("chatSection").innerHTML = chatHtml;
// };

const chatRender = (data) => {
  let chatHtml = "";
  x = Object.keys(data).length;
  let i = 0;
  while (i < x) {
    chatHtml += `
    <div class='fila'>
       <strong id='person'> ${data[i].autor.nombre}</strong>
       <p id='time'> ${data[i].date} : <p>
       <p id='msj'> ${data[i].texto}</p>
   </div>
    `
    d.getElementById("chatSection").innerHTML = chatHtml;

    i++;
  }
};
// let chatHtml = Object.keys(data).length
//   .forEach((e) => {
//     return `
//   <div class='fila'>
//      <strong id='person'> ${e.autor.nombre}</strong>
//      <p id='time'> ${e.date} : <p>
//      <p id='msj'> ${e.texto}</p>
//  </div>
//   `;
//   })
//     .join(" ");

//   d.getElementById("chatSection").innerHTML = chatHtml;
// };

const EnviarMsj = async () => {
  let id = d.getElementById("id").value;
  let nombre = d.getElementById("nombre").value;
  let apellido = d.getElementById("apellido").value;
  let edad = d.getElementById("edad").value;
  let alias = d.getElementById("alias").value;
  let texto = d.getElementById("text").value;

  let date = new Date();

  let autor = { id, nombre, apellido, edad, alias };
  let msj = { autor, texto, date };
  console.log(msj);
  if (autor && texto !== "") {
    await socket.emit("newMsj", msj);
  }
};

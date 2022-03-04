const express = require("express");
const metodos = require("./metodos");
const { urlencoded } = require("express");
const { getProductos } = require("./productosCRUD/crudPRODUCTOS.js");
const { getMsjs, setMsj } = require("./mensajesCRUD/crudMensajes.js");

const app = express();
const PORT = 3333;
const router = express.Router();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", router);

// find products
let productos = require("./productosCRUD/db.js");
getProductos().then((x) => (productos = x));

//rutes
router.get("/productos/listar", async (_, res) => {
  res.json(await new metodos(null, null).listar());
});
router.get("/productos/listar/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await new metodos(id, null).listarPorId());
});
router.post("/productos/guardar", async (req, res) => {
  res.json(await new metodos(null, req.body).guardar());
  console.log("productos guardados");
});
router.put("/productos/actualizar/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await new metodos(id, req.body).actualizar());
});
router.delete("/productos/borrar/:id?", async (req, res) => {
  const { id } = req.params;
  res.json((productos = await new metodos(id, req.body).borrar()));
});

//listen port
http.listen(PORT, () => {
  console.log("escuchando el servidor", http.address().port);
});
// set engine
app.set("view engine", "ejs");
// RUTA VISTA
router.get("/productos/vista", (_, res) => {
  res.render("pages/", (products = new metodos(null, null).listar()));
});
////
///// Ruta vista-test - faker
const productosGenerator = require("./generador/productos");

router.get("/productos/vista-test/:cant?", (req, res) => {
  let productosCollection = [];
  let cant = req.query.cant || 10;
  for (let i = 0; i < cant; i++) {
    let producto = productosGenerator.get();
    producto.id = i + 1;
    productosCollection.push(producto);
  }
  res.send(productosCollection);
});
/////////
//      sokets  //  //   //

let mensajes = require("./mensajesCRUD/msjsDB.js");
let { normalizadorMSJS } = require("./normalizador/msjsNorm");

io.on("connection", async (socket) => {
  await getProductos().then((x) => (productos = x));
  await getMsjs().then((x) => (mensajes = x));

  console.log("cliente conectado");
  await io.sockets.emit("mensajes", normalizadorMSJS(mensajes)); // emit mensajes
  await io.sockets.emit("PRODUCTOS", productos); //  emit productos

  // productos In
  socket.on("productIn", async (newP) => {
    await new metodos(null, newP, productos)
      .guardar()
      .then(() => getProductos().then((x) => (productos = x)))
      .then(() => io.sockets.emit("PRODUCTOS", productos));
  });
  // Msjs In
  socket.on("newMsj", async (data) => {
    await setMsj(data).then(
      async () =>
        await getMsjs().then((x) => {
          // normalizar aca
          mensajes = x;
          io.sockets.emit("mensajes", normalizadorMSJS(mensajes));
        })
    );
  });
});

import { Container } from "./containers/Container.js";
import  express  from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)


//Creando servidor de express 
const app = express();
const PORT = 8080;


// Iniciando Socket
const httpServer = createServer(app);
const io = new Server(httpServer);

//Array de productos
let productos = [
  {
    producto: "calculadora",
    precio : 500,
    urlImagen: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"
  },
];

// Base de datos messages
const Messages = new Container("messages");


// Socket connection
io.on("connection", (socket) => {

  console.log("un cliente se a conectado")

  socket.emit('productos', productos )     // envio productos de array
  
 // Productos
  socket.on('nuevo producto', data => {    // escucho productos que envia el cliente
    productos.push(data);  
    io.sockets.emit("productos-push",data) // envio el producto a todos los clientes 
  })


  // Chat Con base de datos en json
  
  // ejecuto funcion getAllMensajes para enviar base de datos
  getAllMessages(socket) 
  
  // Escucho nuevo mensaje y lo ejecuto con la funcion saveMenssage
	socket.on('new-message', data => {
    saveMessage(data)
	}) 
  
});

// Creo funcion para enviar base de datos
const getAllMessages = async (socket) => {  
  const allMessages = await Messages.getAll()
  io.sockets.emit('messages', allMessages )
}

// Creo funcion para enviar mensajes agregandoles la hora y fecha con dayjs
const saveMessage = async (message) =>{
  const date = new Date()
  const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss');
  const newMessages = {... message, dateFormated}
  await Messages.save(newMessages);
  const allMessages = await Messages.getAll();
  io.sockets.emit('messages-push', newMessages);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

const server = httpServer.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));






















/* // a) Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor

app.get('/productos', async (req, res) => {

 const mostrarProductos = await ProductContainer.getAll()
    res.json(mostrarProductos);
})


// b) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

app.get('/productosRandom', async (req, res) => {
  const id = await ProductContainer.getAll()
  const producto= await ProductContainer.getById(Math.floor(Math.random()* id.length + 1))
  res.send(producto);
})
 */

















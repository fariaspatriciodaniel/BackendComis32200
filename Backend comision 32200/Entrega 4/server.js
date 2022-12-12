import express from 'express';
import { create } from 'express-handlebars';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

const hbs = create();
 
//Handlebars como motor de plantilla
app.engine('handlebars', hbs.engine);

//Motor de plantillas que vamos a usar 
app.set('view engine', 'handlebars');

//Directorio donde estan nuestra plantillas 
app.set('views', './views');

//Array de productos
let productos = [];

//Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
app.get('/productos', (req, res) => {
    res.render('view/index', { productos });
})


//Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
app.post('/productos', (req, res) => {
    const { producto, precio, urlImagen } = req.body;
    productos.push({ producto, precio, urlImagen });
    res.redirect('/productos')
});




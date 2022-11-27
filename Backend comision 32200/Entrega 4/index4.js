import express, { Router, json, urlencoded } from "express";

const app = express();
const router = Router();

const productos = [
    {
        id: 1,
        title:"producto1",
        price: 100,
        thumbnail: "imagen1"
    },
    {
        id: 2,
        title:"producto2",
        price: 200,
        thumbnail: "imagen2"
    }
];


app.use(json());
app.use(urlencoded({ extended: true }));

router
.get(("/api/productos"),(req, res) => {
    res.json(productos);
})
.post((req, res) => {
    let nuevoId
    const { title, price, thumbnail } = req.body;

    if (!title || !price || !thumbnail)
    res.status(400).send("You must send name, surname and age");
    if(productos.length == 0){
            nuevoId = 1
        }
        //SI HAY DATA [...] [1] => 0
        else {
            nuevoId = productos[productos.length - 1].id + 1
        }
        productos.push({ title, price, thumbnail });

    res.status(201).json({ title, price, thumbnail });
});
router
.get("/api/productos/:id", (req, res) => {
    const { id } = req.params;
    const producto = productos.find((Items) => Items.id === Number(id));

    if (!producto) {
    res.status(404).json({
        status: "Not found",
        data: null,
    });
    } else {
    res.status(200).json({
        status: "Ok",
        data: producto,
    });
    }
});
router
.put("/api/productos/:id", (req, res) => {
    const { mensaje } = req.body;
    const { id } = req.params;

    const messageIndex = productos.findIndex((mensaje) => {
        return mensaje.id === Number(id);
    });

    productos.splice(messageIndex, 1, { id, mensaje });

    res.sendStatus(200);
});
router
.delete("/api/productos/:id", (req, res) => {
    const { id } = req.params;

    const messageIndex = productos.findIndex(
    (mensaje) => mensaje.id === Number(id)
    );

    productos.splice(messageIndex, 1);

    res.sendStatus(200);
});

app.use("/", router);

app.listen(3000, () => {
    console.log("Server listening port 3000");
});

app.on("error", (error) => {
    console.log(error);
});
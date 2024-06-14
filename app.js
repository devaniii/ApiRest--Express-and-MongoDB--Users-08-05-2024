const express = require('express');
const dbconnect = require('./config');
const ModelUser = require('./userModel');
const app = express();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelUser.create(body);
        res.status(201).send(respuesta);
    } catch (err) {
        res.status(500).send({ message: "Error creando el usuario", error: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const respuesta = await ModelUser.find({});
        res.send(respuesta);
    } catch (err) {
        res.status(500).send({ message: "Error obteniendo los usuarios", error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.findById(id);
        if (respuesta) {
            res.send(respuesta);
        } else {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Error obteniendo el usuario", error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (err) {
        res.status(500).send({ message: "Error actualizando el usuario", error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (err) {
        res.status(500).send({ message: "Error eliminando el usuario", error: err });
    }
});

app.use(express.json());
app.use('/users', router);

const startServer = async () => {
    try {
        await dbconnect();
        app.listen(3001, () => {
            console.log("El servidor está en el puerto 3001");
        });
    } catch (err) {
        console.error("Error al iniciar el servidor:", err);
    }
};

startServer();

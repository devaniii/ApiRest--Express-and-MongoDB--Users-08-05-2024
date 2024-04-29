const express = require('express');
const dbconnect = require('./config');
const ModelUser = require('./userModel'); // Corregido aquí
const app = express();

const router = express.Router();

//  CREATE CRUD //
// CREATE  - READ - UPDATE - DELETE //

router.post('/', async (req, res) => {
    const body = req.body
    const respuesta =  await ModelUser.create(body)
    res.send(respuesta);
})

router.get('/', async (req, res) => {
    const body = req.body
    const respuesta =  await ModelUser.find(body)
    res.send(respuesta);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const respuesta =  await ModelUser.findById(id)
    res.send(respuesta);
})

router.put('/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id
    const respuesta =  await ModelUser.findOneAndUpdate({_id:id}, body)
    res.send(respuesta);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const respuesta =  await ModelUser.deleteOne({_id : id})
    res.send(respuesta);
})


app.use(express.json());
app.use(router);
const startServer = async () => {
    try {
        await dbconnect(); // Esperar a que se complete la conexión a la base de datos
        app.listen(3001, () => {
            console.log("El servidor está en el puerto 3001");
        });
    } catch (err) {
        console.error("Error al iniciar el servidor:", err);
    }
};

startServer();

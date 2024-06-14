const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/userPrueba", {
            // Opciones obsoletas eliminadas
        });
        console.log("Conexión exitosa");
    } catch (err) {
        console.error("Error de conexión:", err);
    }
};

module.exports = dbconnect;

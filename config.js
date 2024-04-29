const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://127.0.0.1:27017/local");
        console.log("Conexión exitosa");
    } catch (err) {
        console.error("Error de conexión:", err);
    }
};

module.exports = dbconnect;

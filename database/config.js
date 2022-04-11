const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN);
        console.log(`DB Online`);
    } catch (error) {
        console.log(`Error`);
        throw new Error(`Error stablishing db connection`);
    }
    
}

module.exports = {
    dbConnection
}
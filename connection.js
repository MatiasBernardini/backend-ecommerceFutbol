require('dotenv').config();
const mongoose = require('mongoose');

const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_COLLECTION}.jitxkya.mongodb.net/ecommerce-camisetas-futbol?retryWrites=true&w=majority`;

const connectDb = async () => {
  try {
      await mongoose.connect (connectionStr).then(() => console.log('Conectado a MongoDB'))
  } catch (error) {
      console.log (`Hay un problema al conectarse a la DB, ${error.message}`)
  }
}

connectDb();
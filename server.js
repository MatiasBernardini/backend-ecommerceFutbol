const express = require ('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('./connection')
const {Server} = require('socket.io');
const io = new Server (server, {
    cors:'*',
    methods:'*'
})

const User = require('./models/User');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRouter');
const imageRoutes = require ('./routes/imageRoutes')

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes)
app.use('/images', imageRoutes)

server.listen(8080, ()=> {
    console.log('servidor funcionando en puerto 8080')
})
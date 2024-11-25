const express = require('express');
const usersRoutes = require('./routes/users');
const staffRoutes = require('./routes/staff');
const productsRoutes = require('./routes/products');
const app = express();

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.app.use(express.json());

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/users', usersRoutes);
        this.app.use('/staff', staffRoutes);
        this.app.use('/products', productsRoutes);
    }

    start() {
        this.app.listen(this.port,()=>{
            console.log('Server listening on port ' + this.port);
        });
    }
}

module.exports = {Server};

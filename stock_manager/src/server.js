const express = require ('express');
const usersRoutes = require('./routes/users');
const staffRoutes = require('./routes/staff');
const productsRoutes = require('./routes/products');
const suppliersRoutes = require('./routes/suppliers');
const productSuppliersRoutes = require('./routes/products_suppliers');

class Server{
    constructor(){
        this.app = express();
        this.port = 3000;

        this.app.use(express.json());
        this.routes();
    }

    routes(){
        this.app.use('/users', usersRoutes);
        this.app.use('/staff', staffRoutes);
        this.app.use('/products', productsRoutes);
        this.app.use('/suppliers', suppliersRoutes);
        this.app.use('/products_suppliers', productSuppliersRoutes);
    }

    start(){
        this.app.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        });
    }
}

module.exports = {Server};
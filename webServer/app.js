import { createServer } from 'http';
const server = createSer((req, res) => {
    console.log(reg,url);
    res.end('Hola Mundo!');
    res.end();
});


server.listen(8080);
console.log('Servidor iniciado');
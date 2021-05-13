const http = require('http');
const debug = require('debug')('node');
const app = require('./server/src/app');

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}

const OnError = error => {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    } 
}

const OnListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port ' + port;
    debug('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.on('error', OnError);
server.on('listening', OnListening);
server.listen(port);
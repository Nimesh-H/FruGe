

const http = require('http');
const app = require('./app')

const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Starting the server 
server.listen(port, console.log(`Server started on port ${port}`));
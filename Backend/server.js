require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();

// Import routers
const projectRouter = require('./router/projectRouter');


require('./database/connection/connection');

// Middleware setup
server.use(cors());
server.use(express.json());

// Routes setup
server.use(projectRouter);


const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.status(200).json("Project Management server started");
});

server.listen(PORT, () => {
    console.log(`Project Management started at port : ${PORT}`);
});

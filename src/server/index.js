const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { BASE_PATH, ENVIRONMENTS } = require('../constants');
const { connectDatabase } = require('../api/config/db');

const server = express();

let environmentPath = `${BASE_PATH}environment.env`;

if (process.env.ENVIRONMENT === ENVIRONMENTS.PRODUCTION) {
    environmentPath = `${BASE_PATH}environment.prod.env`;
}

if (process.env.ENVIRONMENT === ENVIRONMENTS.DEVELOPMENT) {
    server.use(cors({ origin: '*', methods: '*' }));
}

dotenv.config({ path: environmentPath });

connectDatabase();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cookieParser());

server.get('/', (req, res) => {
    res.send(`<h1>API Works</h1>`)
});

server.listen(PORT, () => {
    console.log(process.env.MESSAGE.split('{{PORT}}').join(PORT));
});

module.exports = { server };

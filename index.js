const { server } = require('./src/server');
const userRoute = require('./src/api/routes/user.route');
const { errorHandler } = require('./src/api/middleware/errorHandler');

server.get('/', (req, res, next) => {
    const data = {
        message: 'Hello World!',
    }
    res.status(200).send(data);
});

server.use('/users', userRoute);
server.use(errorHandler);

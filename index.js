const { server } = require('./src/server');
const { postRoute, userRoute, tagRoute } = require('./src/api/routes');
const { errorHandler } = require('./src/api/middleware/errorHandler');

server.get('/', (req, res, next) => {
    const data = {
        success: true,
        result: {
            message: 'Hello World!',
        },
    };
    
    res.status(200).send(data);
});

server.use('/users', userRoute);
server.use('/posts', postRoute);
server.use('/tags', tagRoute);
server.use(errorHandler);

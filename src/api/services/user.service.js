const { userMock } = require('../../mock');

exports.getAllUser = () => userMock;

exports.getUserById = (id) => userMock.find(user => user.id === id);

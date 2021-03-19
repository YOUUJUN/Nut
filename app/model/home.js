const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ycsoft', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
});

module.exports = sequelize;

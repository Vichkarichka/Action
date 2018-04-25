var mysql = require('promise-mysql');

var connect = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Action',
    connectionLimit: 20,
});

function getSqlConnection() {
    return connect.getConnection().disposer(function (connection) {
        connect.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;
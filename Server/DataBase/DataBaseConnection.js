let mysql = require('promise-mysql');

let connect = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Action',
    connectionLimit: 20,
});

function getSqlConnection() {
    return connect.getConnection().disposer((connection) => {
        connect.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;
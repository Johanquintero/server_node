const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = mysql.createConnection({ 
            host: 'mysql-johangarcia15.alwaysdata.net',
            user: '231804',
            port: '3306',
            password: '123456johan@_12',
            database: 'johangarcia15_nueva_db'
        });

        return connection;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = connect;
const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = mysql.createConnection({ 
            host: 'remotemysql.com',
            user: 'e7FuABwDYZ',
            port: '3306',
            password: 'S8tD8OP37J',
            database: 'e7FuABwDYZ'
        });

        return connection;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = connect;
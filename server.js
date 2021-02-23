const myslq = require('mysql');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'C@rb0n2020',
    database: 'emoployee_db'
});

const afterConnection = () => {
    console.log(res)
};

connection.connect((err => {
    if (err) throw err;
    console.log(`Connected as server ID: ${connection.threadID}`);
    afterConnection();
})
);
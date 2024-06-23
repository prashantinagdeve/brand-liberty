const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const {db} = require('./Db/db')
const {readdirSync} = require('fs');

const app = express()
const PORT = process.env.PORT;


// middlewaer
app.use(cors())
app.use(express.json())

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })  
}
server()
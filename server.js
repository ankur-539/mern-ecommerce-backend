// 'Access-Control-Allow-Origin'
import express from 'express';
import cors from 'cors'
import { configDotenv } from 'dotenv';
configDotenv();
import mydatabase from './db_connection/connectdb.js';

import routing from './routing/approuting.js'
const myapp = express();
const port = process.env.PORT;

myapp.use(express.json());
myapp.use(express.urlencoded({ extended: true }))
myapp.use(cors())
myapp.use(routing);

myapp.listen(port, "0.0.0.0", () => {
    console.log("node is running on: ", port);
})
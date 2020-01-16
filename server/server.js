// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');


import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/api'

const PORT = 80;
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.listen(PORT, () => {
    console.log("Server running on Port " + PORT);
})
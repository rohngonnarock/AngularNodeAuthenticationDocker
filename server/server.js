const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = 80;
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', require('./routes/api'))

app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.listen(PORT, () => {
    console.log("Server running on Port " + PORT);
})
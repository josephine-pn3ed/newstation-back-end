require('dotenv').config();
const express = require('express');
const app = express();
const newStation = require('./routes/newstation');
const { SERVER_PORT, SERVER_HOST } = process.env;

app.use(express.json());
app.use(newStation);


app.listen(SERVER_PORT, () => console.log(`Server running @ ${SERVER_HOST}:${SERVER_PORT}`));

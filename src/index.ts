require('dotenv').config();
const express = require('express');
const app = express();
const company = require('./routes/company');
const employee = require('./routes/employee');
const news = require('./routes/news');
const { SERVER_PORT, SERVER_HOST } = process.env;

app.use(express.json());
app.use(company, employee, news);


app.listen(SERVER_PORT, () => console.log(`Server running @ ${SERVER_HOST}:${SERVER_PORT}`));

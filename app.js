require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const csvController = require('./controllers/csvController');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', authController.login);
app.post('/upload-csv', authMiddleware, csvController.uploadCSV);
app.get('/data', authMiddleware, csvController.getData);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

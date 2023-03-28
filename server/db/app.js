const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})
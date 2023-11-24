const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/tasktally?directConnection=true';
const url = 'mongodb+srv://rakshit:CIVWh3bMPLKkC77p@cluster0.ej2ydeu.mongodb.net/tasktally?retryWrites=true&w=majority';

const connectToMongo = () => {
    mongoose.connect(url);
    console.log("Connected to mongoose succesfully");
}

module.exports = connectToMongo;

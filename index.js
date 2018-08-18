const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { shorten, redirect } = require('./api/controllers/shorten-controller');
const {
    APPLICATION_HTTP_PORT,
    MONGO_APPLICATION_URI,
    MONGO_APPLICATION_USERNAME,
    MONGO_APPLICATION_PASSWORD
} = config;

const connection = mongoose.connect(MONGO_APPLICATION_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    user: MONGO_APPLICATION_USERNAME,
    pass: MONGO_APPLICATION_PASSWORD
})
.catch(err => {
    console.log(err);
});

const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.get(redirect());
app.post(shorten());

app.listen(APPLICATION_HTTP_PORT, () => {
    console.log(`Gab.ly application up and running on port ${APPLICATION_HTTP_PORT}`)
});

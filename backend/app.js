const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');
app.use(express.json({limit: '5000mb',  extended: true, type:'application/json'}));
app.use(express.urlencoded({limit: '5000mb',  extended: true, type:'application/x-www-form-urlencoded'}));

app.use(cors());


// ROUTES IMPORT
const clickRoute = require('./click')
app.use('/click', clickRoute)


//INIT
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('conneted')
})
app.listen(3000)
const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person');
const MenuItem = require('./models/menu');
const bodyParser = require("body-parser");
require('dotenv').config();

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to parse X-www-form-urlencoded data
app.use(bodyParser.urlencoded({extended : true}));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("Hello Welcome to my hotel")
});

const personRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuRoute');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, ()=> {
    console.log(`Server started at ${PORT}`)
})

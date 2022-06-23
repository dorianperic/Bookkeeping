const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config( { path: 'config.env'})
const PORT = process.env.PORT || 8080

//logger
app.use(morgan('tiny'))

//parse w body-parser
app.use(bodyparser.urlencoded({extended : true}))

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.get('/', (req,res)=>{
    res.render('login');
})

app.get('/books', (req,res)=>{
    res.render('gallery');
})

app.get('/bo', (req,res)=>{
    res.render('backoffice');
})

app.get('/bo/add-book', (req,res)=>{
    res.render('backofficeaddbook');
})

app.get('/bo/update-book', (req,res)=>{
    res.render('backofficeupdatebook');
})

app.listen(PORT, ()=> {console.log(`serv run on http://localhost:${PORT}`)});


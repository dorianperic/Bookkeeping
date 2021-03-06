const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const connectDB = require('./server/database/connection');

//swagger options
const options = {
    definition : {
        openapi : "3.0.0",
        info : {
            title : "Bookkeeping API",
            version : "1.0.0",
            description : "Simple bookkeeping API with CRUD functionality"
        },
        servers : [
            {
                url : "http://localhost:3000"
            }
        ],
    },
    apis : ["./server/routes/*.js"],
}
const specs = swaggerJSDoc(options)

const app = express();

dotenv.config( { path: 'config.env'})
const PORT = process.env.PORT || 8080

//swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

//logger
app.use(morgan('tiny'))

//mongodb conn
connectDB();

//middlewares
app.use(fileUpload())
app.use(cookieParser());

//parse w body-parser
app.use(bodyparser.json({limit: '50mb', extended: false}));
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.text({ limit: '200mb' }));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load router
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> {console.log(`serv run on http://localhost:${PORT}`)});


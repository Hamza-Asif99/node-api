const express = require('express')
const mongoose = require('mongoose')
const Employee = require("./models/employeeSchema");
const config = require("./config/index")
const errorHandler = require("./utils/errorHandler")
const catch404 = require("./utils/catch404")

//requiring router
const employeeRoutes = require('./routes/employeeRoutes').employeeRouter

//connection string
const connection = mongoose.connect(config.dbConfig.connectionString+config.dbConfig.dbName, { useNewUrlParser: true, useUnifiedTopology: true });

let app = express()

app.use(express.json())

app.listen(config.port,()=>{
    console.log(`server started on ${config.ip}:${config.port} `)
})

//all the routes in the employee folder
app.use('/employees', employeeRoutes)

//error handler
app.use(errorHandler)
//catch all 404
app.use(catch404)


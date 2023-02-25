const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require("./config")
const morgan = require("morgan")
const utils = require('./utils')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//rate limiter
const security = require('./security')
//requiring router
const employeeRoutes = require('./routes/employee')
//connection string
const connection = mongoose.connect(config.dbConfig.connectionString+config.dbConfig.dbName, { useNewUrlParser: true, useUnifiedTopology: true });


let app = express()
app.use(cookieParser())

app.use(morgan("tiny"))
//security middleware
app.use(cors())
app.use(security.limiter)

app.disable("x-powered-by")

app.use(express.json())

app.listen(config.port,()=>{
    console.log(`server started on ${config.ip}:${config.port} `)
})

//all the routes in the employee folder
app.use('/employees', employeeRoutes)

//swagger docs mounted on /doc, using the same port as the application
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


//error handler
app.use(utils.errorHandler)
//catch all 404
app.use(utils.catch404)


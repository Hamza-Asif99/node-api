const express = require('express')
const mongoose = require('mongoose')
const Employee = require("./models/employeeSchema");

//requiring router
const employeeRoutes = require('./routes/employeeRoutes').employeeRouter

//connection string
const connection = mongoose.connect('mongodb://127.0.0.1:27017/task', { useNewUrlParser: true, useUnifiedTopology: true });

let app = express()
app.use(express.json())

app.listen(8080,()=>{
    console.log("server started on http://127.0.0.1:8080")
})

//all the routes in the employee folder
app.use('/employee', employeeRoutes)

//error handler
app.use((err, req, res, next) => {

    //if user tries to assign an already existing id to a new employee
    // this error is thrown
    if(err.code == '11000'){
        res.status(400).send({error:"This ID already exists"})
    }
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

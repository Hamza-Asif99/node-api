const mongoose = require('mongoose')

const {Schema} = mongoose

const employeeSchema = new Schema({
    empName: String,
    empDept: String,
    empCNIC: String
})
module.exports = mongoose.model('Employee',employeeSchema)
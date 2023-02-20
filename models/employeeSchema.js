const mongoose = require('mongoose')

const {Schema} = mongoose

const employeeSchema = new Schema({
    empID: {type:Number, unique:true},
    empName: String,
    empDept: Number,
    empCNIC: String
})
module.exports = mongoose.model('Employee',employeeSchema)
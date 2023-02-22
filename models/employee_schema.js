const mongoose = require('mongoose')

const {Schema} = mongoose

const employee_schema = new Schema({
    empID: {type:Number, unique:true},
    empName: String,
    empDept: Number,
    empCNIC: String,
    createdDate:{type:Date, default:Date.now()}
})
module.exports = mongoose.model('Employee',employee_schema)
const mongoose = require('mongoose')

const {Schema} = mongoose

const employee_schema = new Schema({
    empID: {type:Number, unique:true},
    empName: {type:String, required: true},
    empDept:  {type:Number, required: true},
    empCNIC: {type:String, required: true},
    createdDate:{type:Date, default:Date.now()}
})
module.exports = mongoose.model('Employee',employee_schema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {type:String},
    email: {type:String, unique: true},
    password: {type:String},
    approved: {type:Boolean, default:false}
})

module.exports = userSchema
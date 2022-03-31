const mongoose = require('mongoose');
const Schema =  mongoose.Schema
const hashSchema = new Schema({
    hash: {type:String,unique:true},
    email: {type:String},
    createDate: { type: Date, default: Date.now},
    expire: {type: Date,}
})


module.exports = hashSchema
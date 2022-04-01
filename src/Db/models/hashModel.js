const mongoose = require('mongoose');
const Schema =  mongoose.Schema
const hashSchema = new Schema({
    hash: {type:String},
    email: {type:String},
    createDate: { type: Date, default: Date.now},
    expire: {type: Date,}
})


module.exports = hashSchema
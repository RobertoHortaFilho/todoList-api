const mongoose = require('mongoose');
const Schema = mongoose.Schema
const NoteSchema = new Schema({
    user : {type: String},
    title : {type: String, default: 'title'},
    content : {type:String},
    date: {type: Date, default: Date.now}
})

module.exports = NoteSchema
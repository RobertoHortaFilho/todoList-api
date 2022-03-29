const mongoose = require('mongoose')
const link = 'mongodb+srv://robertotodo:XyL62pt51BcYy6Ih@lists.5rmad.mongodb.net/notes?retryWrites=true&w=majority'

var connectionNotes =  mongoose.createConnection('mongodb+srv://robertotodo:XyL62pt51BcYy6Ih@lists.5rmad.mongodb.net/notes?retryWrites=true&w=majority')
var connectionUsers =  mongoose.createConnection('mongodb+srv://robertotodo:XyL62pt51BcYy6Ih@lists.5rmad.mongodb.net/users?retryWrites=true&w=majority')

const Schema = mongoose.Schema
const note = new Schema({
    title: String,
    content: String,
})
const user = new Schema({
    name: String,
    email: String,
    password: String,
})

var modelNote = connectionNotes.model('notinha',note)
var modelUser = connectionUsers.model('user',user)

async function criar(obj){
    await modelUser.create(obj)
    await modelNote.create({title:"fazer janta",content:'sopinha de janta'})
} 

criar({
    name: 'roberto filho',
    email: 'roberto@123.com',
    password: '1234'})

console.log('db')

module.exports = {a:'a'}

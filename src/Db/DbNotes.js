const mongoose = require('mongoose')
const noteSchema = require('./models/NotesModel')

const db = function (){
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const link = `mongodb+srv://${user}:${password}@lists.5rmad.mongodb.net/notes?retryWrites=true&w=majority`
    var noteModel = undefined

    async function connect(){
        const connectionNotes = await mongoose.createConnection(link)
        noteModel = await connectionNotes.model('note',noteSchema)
    }



    async function findAll(){
        const data = await noteModel.find()
        return data
    }
    
    return {
        connect,
        findAll}

}

module.exports =  db()
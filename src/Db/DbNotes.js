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

    async function findAll(userId){
        const data = await noteModel.find({userId:userId})
        return data
    }

    async function find(id){
        const data = await noteModel.findOne({_id: id})
        return data
    }

    async function create(obj){
        try {
            await noteModel.create(obj)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function update(id,obj){
        try{
            await noteModel.updateOne({_id:id},obj)
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async function del(id){
        try{
            await noteModel.deleteOne({_id:id})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
    
    return {
        connect,
        findAll,
        create,
        find,
        update,
        del
    }

}

module.exports =  db()
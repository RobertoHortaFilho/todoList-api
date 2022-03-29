const mongoose = require('mongoose');
const userSchema = require('./models/UserModel')

function db (){
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const link = `mongodb+srv://${user}:${password}@lists.5rmad.mongodb.net/account?retryWrites=true&w=majority`
    var userModel = undefined


    async function connect (){
        const connectionUsers = await mongoose.createConnection(link)
        userModel = connectionUsers.model('user',userSchema)
    }

    async function findAll(){
        if (userModel == undefined){
            return undefined
        }
        const users = await userModel.find()
        return users
    }

    return {
        connect,
        findAll,
    }
}

module.exports = db()
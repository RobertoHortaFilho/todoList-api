const mongoose = require('mongoose');
const userSchema = require('./models/UserModel')
const hashSchema = require('./models/hashModel')


function db (){
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const link = `mongodb+srv://${user}:${password}@lists.5rmad.mongodb.net/account?retryWrites=true&w=majority`
    var userModel = undefined
    var hashModel;


    async function connect (){
        const connectionUsers = await mongoose.createConnection(link)
        userModel = connectionUsers.model('user', userSchema)
        hashModel = connectionUsers.model('hashes', hashSchema)

        
    }

    async function findOne(obj){
        if (userModel == undefined){
            return undefined
        }
        const users = await userModel.findOne(obj)
        return users
    }
    
    async function create(obj){
        try {
            await userModel.create(obj)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function update(id,obj){
        try {
            await userModel.updateOne({_id:id},obj)
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }

    async function del(id){

        try {
            await userModel.deleteOne({_id:id})
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //hash
    async function hashCreate(){

        const dateExpire = new Date()
        dateExpire.setMinutes(dateExpire.getMinutes()+ 30)
        const obj = {
            email:'email',
            hash: '123',
            expire: dateExpire
        }

        await hashModel.create(obj)
    }

    return {
        connect,
        findOne,
        create,
        del,
        update,
        hashCreate,
    }
}

module.exports = db()
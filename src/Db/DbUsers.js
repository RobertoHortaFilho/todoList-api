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
     function hashCreate(email){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz1234567890'
        var hash = ''
        const charLength = characters.length;

        for(var i = 0; i < 30;i++){
            hash = hash + characters.charAt(Math.floor(Math.random()*charLength))
        }
        const dateExpire = new Date()
        dateExpire.setMinutes(dateExpire.getMinutes()+ 30)
        const obj = {
            email:email,
            hash: hash,
            expire: dateExpire
        }
        insertHashDb(obj)
        return hash
        
    }

    async function insertHashDb(obj){
        await hashModel.create(obj)
        return
    }

    async function hashFind(obj){
        const hashData = await hashModel.findOne(obj)
        return hashData

    }

    async function hashDel(hash){
        if(await hashModel.deleteOne({hash:hash})){
            return true
        }else{
            return false
        }
        
    }

    return {
        connect,
        findOne,
        create,
        del,
        update,
        hashCreate,
        hashFind,
        hashDel
    }
}

module.exports = db()
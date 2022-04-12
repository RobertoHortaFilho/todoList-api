const routes = require('express').Router();
const mail = require('../emailVerification')
const DbUserFactory = require('../Db/DbUsers')
DbUserFactory.connect()


//create
routes.post('/signup', async (req, res) =>{
    const {email, password, userName} = req.body
    const obj = {
        email:email, 
        password:password, 
        userName:userName}

    try{
        await DbUserFactory.create(obj)
        const hash = DbUserFactory.hashCreate(email)
        //const fullUrl = req.protocol + '://' + req.get('host')
        //mail.send(email, hash, fullUrl)
        


        res.status(201).json({message:'create accont success pls verify',response:true,data:{hash:hash,email:email}})
    }catch(error){
        res.status(500).json({error: error,response:false})
    }
})

routes.get(('/verify/:hash'), async (req,res) =>{
    console.log('verificando')
    const hash = req.params.hash
    const hashObj = await DbUserFactory.hashFind({hash:hash})
    console.log(hashObj)
    
    if(hashObj.hash === hash){
        // email verificado
        const user = await DbUserFactory.findOne({email:hashObj.email})
        //console.log(user['_id'])
        await DbUserFactory.update(user['_id'],{approved:true})
        await DbUserFactory.hashDel(hash)
        res.status(200).json({response:true})
        return 
    }
    res.status(500).json({response:false})

    
})

routes.get('/login', async (req, res) =>{
    const {email, password} = req.body

    const user = await DbUserFactory.findOne({email:email})

    if (user.email === email && user.password === password){
        res.status(200).json({message:'ok',user,response:true})
    }else{
        res.status(200).json({message:'access denied',response:true})
    }
    
})

//read
routes.get('/email/:email', async(req, res) =>{
    const email = req.params.email
    const user = await DbUserFactory.findOne({email:email})
    
    if (user == null){
        res.status(200).json({message:'email nao existe', email:false, user:null,response:false})
        return
    }
    res.status(200).json({message:'user found',email:true, user:user,response:true})

})
routes.get('/id/:id', async(req, res) =>{
    const id = req.params.id
    console.log(id)
    const user = await DbUserFactory.findOne({_id:id})
    res.status(200).json({user:user,response:true})
})

//update
routes.patch('/:id', async (req, res) =>{
    const id = req.params.id;
    const obj = {}
    if(req.body.hasOwnProperty("userName")){
        obj.userName = req.body.userName
    }
    if(req.body.hasOwnProperty("password")){
        obj.password = req.body.password
    }

    if(await DbUserFactory.update(id,obj)){
        res.status(200).json({message:'updated',response:true})
    }else{
        res.status(500).json({message:'failed',response:false})
    }
})


//delete

routes.delete('/:id', async(req,res) =>{
    const id = req.params.id;

    if(await DbUserFactory.del(id)){
        res.status(200).json({message:'user deleted',response:true})
    }else{
        res.status(500).json({message:'error user not deleted', response:false})
    }
})


module.exports = routes;
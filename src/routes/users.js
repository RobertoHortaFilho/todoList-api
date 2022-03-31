const routes = require('express').Router();
const DbUserFactory = require('../Db/DbUsers')
DbUserFactory.connect()
const nodemailer = require('nodemailer')

//create
routes.post('/signup', async (req, res) =>{
    const {email, password, userName} = req.body
    const obj = {
        email:email, 
        password:password, 
        userName:userName}

    try{
        await DbUserFactory.create(obj)
        const transporter = nodemailer.createTransport({
            service :'gmail',
            auth: {
                user: 'todolistverify@gmail.com',
                pass: 'todolistpassword'
            }

        })
        const  mailOptions = {
            from : 'todoListVerify@gmail.com',
            to : 'roberto54454e@gmail.com',
            subject: 'verifique o email (ToDo List)',
            text: ' clique aqui para verificar o email'
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.status(201).json({message:'create accont success pls verify',response:true})
    }catch(error){
        res.status(500).json({error: error,response:false})
    }
})

routes.post('/login', async (req, res) =>{
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
    await DbUserFactory.hashCreate()
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
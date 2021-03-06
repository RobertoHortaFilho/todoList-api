const routes = require('express').Router()
const DbNoteFactory = require('../Db/DbNotes')
DbNoteFactory.connect()



//read
routes.get('/:userId', async (req, res) =>{
    const userId = req.params.userId
    try {
        const notes = await DbNoteFactory.findAll(userId)
        res.status(200).json({notes,response:true})
    } catch (error) {
        res.status(500).json({error,response:false})    
    }
    
})
//read with ID
routes.get('/search/:id', async (req,res) =>{
    const id = req.params.id
    try {
        const note = await DbNoteFactory.find(id)
        res.status(200).json({note,response:true})
    } catch (error) {
        res.status(500).json({error,response:false})
    }
})


//create
routes.post('/', async (req,res) =>{ 
    const {userId , title, content} = req.body
    if(!verifyOk(userId, title, content)){
        res.status(500).json({error:'user id invalido',response:false})
        return    
    }
    const note = {userId,title,content}

    try {
        const resposta = await DbNoteFactory.create(note)
        if (resposta){
            res.status(201).json({message:'created',response:true})
        }else{
            res.status(500).json({message:'error note not created',response:false})
        }
        
    } catch (error) {
        res.status(500).json({error,response:false})
    }
})

// Update

routes.patch('/:id', async (req, res) =>{
    console.log('patch')
    const id = req.params.id
    const {userId, title, content} = req.body
    const updated =  Date.now()
    const obj = {userId,title,content,updated}
    if(!verifyOk(userId, title, content)){
        res.status(500).json({error:'user title or content is undefined',response:false})
        return
    }

    const resposta = await DbNoteFactory.update(id,obj)
    if (resposta){
        res.status(206).json({message:'updated',response:true})
    }else{
        res.status(500).json({error:'error',response:false})
    }
})

// Delete

routes.delete('/:id', async (req, res) =>{
    const id = req.params.id;
    if (id == undefined){
        res.status(500).json({error:'miss note ID',response:false})
        return
    }

    if(await DbNoteFactory.del(id)){
        res.status(200).json({message:'note deleted in DB',response:true})
        return
    }
    res.status(500).json({error:'note not deleted',response:false})
})




function verifyOk(userId, title, content){
    if (userId == '' || userId == undefined || userId == null){
        return false
    }
    if (title == '' || title == undefined || title == null){
        return false
    }
    if (content == '' || content == undefined || content == null){
        return false
    }
    return true
    
}


module.exports = routes
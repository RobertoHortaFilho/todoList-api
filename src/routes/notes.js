const routes = require('express').Router()
const DbNoteFactory = require('../Db/DbNotes')
DbNoteFactory.connect()



//read
routes.get('/:userId', async (req, res) =>{
    const userId = req.params.userId
    try {
        const notes = await DbNoteFactory.findAll(userId)
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json(error)    
    }
    
})
//read with ID
routes.get('/search/:id', async (req,res) =>{
    const id = req.params.id
    try {
        const note = await DbNoteFactory.find(id)
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json(error)
    }
})


//create
routes.post('/', async (req,res) =>{ 
    const {userId , title, content} = req.body
    if(!verifyOk(userId, title, content)){
        res.status(500).json({error:'user id invalido'})
        return    
    }
    const note = {userId,title,content}

    try {
        const resposta = await DbNoteFactory.create(note)
        if (resposta){
            res.status(201).json({message:'created'})
        }else{
            res.status(500).json({message:'error note not created'})
        }
        
    } catch (error) {
        res.status(500).json({error})
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
        res.status(500).json({error:'user title or content is undefined'})
        return
    }

    const resposta = await DbNoteFactory.update(id,obj)
    if (resposta){
        res.status(206).json({message:'updated'})
    }else{
        res.status(500).json({error:'error'})
    }
})

// Delete

routes.delete('/:id', async (req, res) =>{
    const id = req.params.id;
    if (id == undefined){
        res.status(500).json({error:'miss note ID'})
        return
    }

    if(await DbNoteFactory.del(id)){
        res.status(200).json({message:'note deleted in DB'})
        return
    }
    res.status(500).json({error:'note note deleted'})
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
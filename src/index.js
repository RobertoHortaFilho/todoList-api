const express = require('express');
require('dotenv').config();


const DbNoteFactory = require('./Db/DbNotes')
DbNoteFactory.connect()



const app = express();


app.get('/', async (req,res) =>{
    console.log(await DbNoteFactory.findAll())
    res.send('ola')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('listen on port ' + PORT))
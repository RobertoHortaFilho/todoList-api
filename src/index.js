const express = require('express');
require('dotenv').config();


const DbNoteFactory = require('./Db/DbNotes')
DbNoteFactory.connect()
const DbUserFactory = require('./Db/DbUsers')
DbUserFactory.connect()


const app = express();


app.get('/', async (req,res) =>{
    res.send('api todoList')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('listen on port ' + PORT))
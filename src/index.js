const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();


const DbUserFactory = require('./Db/DbUsers')
DbUserFactory.connect()

const notesRoutes = require('./routes/notes')

//configs
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('./static'))


app.use('/notes',notesRoutes)

app.get('/', async (req,res) =>{
    res.send('api todoList')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('listen on port ' + PORT))
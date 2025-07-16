const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT ||  9000;

app.use(cors());
app.use(express.json());

let todos = [];

function validateInput(req, res, next){

    const {title, id} = req.body;

    // check for missing id or title
    if(!title || !id){
        res.status(409).json({
            error: "Title or ID is missing"
        })
        return;
    }

    // check for duplicate id
    const duplicate = todos.find(u => u.id === id)
    if(duplicate){
        res.status(409).json({
            error: "ID already exist!"
        })
        return;
    }

    next();

}

app.post('/addTodo', validateInput ,function(req, res){
    const {title, id} = req.body;
    todos.push({
        title,
        id
    })
    res.json({
        msg: "todo added successfully"
    })
})

app.delete('/deleteTodo/:id', function(req, res){
    const id = parseInt(req.params.id);
    for(let i = 0; i < todos.length; i++){
        if(todos[i].id === id) {
            todos.splice(i, 1);
            break;
        }
    }
    res.json({
        msg: `todo deleted successfully with id: ${id}`
    })
})

app.get('/', function(req, res){
    res.json(todos)
})

app.listen(port);
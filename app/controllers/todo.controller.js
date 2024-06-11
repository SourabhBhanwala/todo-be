const Todo = require('../models/todo.model.js');
const { v4: uuidv4 } = require('uuid');

// Create and Save a new todo
exports.create = (req, res) => {

    // Validate request
    if (!req.body.task) {
        return res.status(400).send({
            message: "todo task can not be empty"
        });
    }
    // const guid = uuidv4();
    // Create a todo
    const todo = new Todo({       
        task: req.body.task,
        priority: req.body.priority,
        status:req.body.status,
    });

    // Save todo in the database
    todo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the todo."
            });
        });

};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
    Todo.find()
        .then(Todos => {
            res.send(Todos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todos."
            });
        });
};

// Find a single todo with a todoId
exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: "todo not found with id " + req.params.todoId
                });
            }
            res.send(todo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "todo not found with id " + req.params.todoId
                });
            }
            return res.status(500).send({
                message: "Error retrieving todo with id " + req.params.todoId
            });
        });
};

// Update a todo identified by the todoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.task) {
        return res.status(400).send({
            message: "todo task can not be empty"
        });
    }

    // Find todo and update it with the request body
    Todo.findByIdAndUpdate(req.params.todoId, {
        task: req.body.task,
        priority: req.body.priority,
        status:req.body.status,
    }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: "todo not found with id " + req.params.todoId
                });
            }
            res.send(todo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "todo not found with id " + req.params.todoId
                });
            }
            return res.status(500).send({
                message: "Error updating todo with id " + req.params.todoId
            });
        });
};

// Delete a todo with the specified todoId in the request
exports.delete = (req, res) => {
    Todo.findByIdAndDelete(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });
        }
        res.send({message: "todo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "todo not found with id " + req.params.todoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete todo with id " + req.params.todoId
        });
    });
    
};
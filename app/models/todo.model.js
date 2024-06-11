const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    task: String,
    priority: String,
    status:Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('todo', TodoSchema);
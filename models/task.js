const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: String,
    category: String,
    userId: { type: String, required: true },
    completed: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);

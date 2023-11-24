const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// fetch all tasks
router.get('/fetchTask', fetchuser, async (req, res) => {
    try {
        const task = await Task.find({ user: req.user.id });
        res.json(task);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// add tasks
router.post('/addTask', fetchuser, [
    body('task', 'Task can not be empty').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    try {
        const { task } = req.body;
        const newTask = new Task({
            task, user: req.user.id
        });
        let savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// edit tasks
router.put('/updateTask/:id', fetchuser, async (req, res) => {
    try {
        const { task } = req.body;
        const updatedTask = {};
        if (task) { updatedTask.task = task };
        let oldTask = await Task.findById(req.params.id);
        if (!oldTask) {
            return res.status(404).send("Not found");
        }
        if (oldTask.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        oldTask = await Task.findByIdAndUpdate(req.params.id, { $set: updatedTask }, { new: true });
        res.json(oldTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

// delete tasks
router.delete('/deleteTask/:id', fetchuser, async (req, res) => {
    try {
        let oldTask = await Task.findById(req.params.id);
        if (!oldTask) {
            return res.status(404).send("Not found");
        }
        if (oldTask.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        oldTask = await Task.findByIdAndDelete(req.params.id);
        res.json({"Success":"Task deleted", oldTask: oldTask});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
import React, { useState } from 'react';
import TaskContext from "./TaskContext";
import host from './config';

const TaskSate = (props) => {
    const tasksInitial = [];
    const [tasks, setTasks] = useState(tasksInitial);

    // get all data
    const getTask = async () => {
        const response = await fetch(`${host}/api/task/fetchTask`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setTasks(json);
    }

    // add
    const addTask = async (task) => {
        const response = await fetch(`${host}/api/task/addTask`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ task })
        });
        const json = await response.json();
        const newtask = json;
        setTasks(tasks.concat(newtask));
    }

    // edit
    const updateTask = async (id, task) => {
        const response = await fetch(`${host}/api/task/updateTask/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ task })
        });
        const json = await response.json();
        console.log(json);
        let newTask = JSON.parse(JSON.stringify(tasks));
        for (let index = 0; index < newTask.length; index++) {
            const element = newTask[index];
            if (element._id === id) {
                newTask[index].task = task
                break;
            };
        }
        setTasks(newTask);
    }

    // delete
    const deleteTask = async (id) => {
        const response = await fetch(`${host}/api/task/deleteTask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log("Deleting a task with id: ", json);
        let newTask = tasks.filter((task) => { return task._id !== id });
        setTasks(newTask);
    }
    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>
            {props.children}
        </TaskContext.Provider>
    )
};

export default TaskSate;
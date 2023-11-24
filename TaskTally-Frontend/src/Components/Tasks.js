import React, { useContext, useEffect, useRef, useState } from 'react';
import TaskContext from '../Context/task/TaskContext';
import { useNavigate } from "react-router-dom";
import TaskCard from './TaskCard';
import AddTask from './AddTask';

const Tasks = () => {
    let navigate = useNavigate();
    const context = useContext(TaskContext);
    const { tasks, getTask, updateTask } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [task, setTask] = useState({ etask: '' })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getTask();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    const editTask = (currentTask) => {
        ref.current.click();
        setTask({ eid: currentTask._id, etask: currentTask.task });
    };


    const handleSubmit = () => {
        updateTask(task.eid, task.etask)
        refClose.current.click();
    }
    const onChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }
    return (
        <div>
            <AddTask />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etask" className="form-label">Edit Task</label>
                                    <input type="text" className="form-control" id="etask" name='etask' value={task.etask} onChange={onChange} required minLength={5} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={task.etask.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>All your Tasks</h2>
                <div className="container">
                {tasks.length === 0 && 'Nothing to display'}
                </div>
                {
                    tasks.map((task) => {
                        return <TaskCard task={task} key={task._id} editTask={editTask} />
                    })
                }
            </div>
        </div>
    )
}

export default Tasks
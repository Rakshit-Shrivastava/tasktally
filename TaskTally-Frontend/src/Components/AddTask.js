import React, { useContext, useState } from 'react';
import TaskContext from '../Context/task/TaskContext';

const AddTask = () => {
    const context = useContext(TaskContext);
    const { addTask } = context;
    const [task, setTask] = useState({task: ''})
    const handleSubmit =(event)=>{
        event.preventDefault();
        addTask(task.task);
        setTask({task: ''});
    }
    const onChange = (event) => {
        setTask({...task, [event.target.name]: event.target.value});
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Tasks</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="task" className="form-label">New Task</label>
                        <input type="text" className="form-control" id="task" name='task' onChange={onChange} required minLength={5} value={task.task}/>
                    </div>
                    <button disabled={task.task.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddTask
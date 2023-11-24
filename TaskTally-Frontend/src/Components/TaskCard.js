import React, { useContext } from 'react';
import TaskContext from '../Context/task/TaskContext';

const TaskCard = (props) => {
    const context = useContext(TaskContext);
    const { deleteTask } = context;
    let { task, editTask } = props
    return (
        <div className='col-md-3'>
            <div className="card my-2">
                <div className="card-body d-flex align-items-center justify-content-between">
                    <p className="card-title m-0">{task.task}</p>
                    {/* <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>{editTask(task)}}>Edit</button>
                        <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>{deleteTask(task._id)}}>Delete</button> */}
                   <div>
                   <i className="fa-regular fa-pen-to-square mx-1" data-mdb-toggle="tooltip"  title="Edit" onClick={() => { editTask(task) }} ></i>
                    <i className="fa-regular fa-trash-can mx-1" data-mdb-toggle="tooltip"  title="Delete" onClick={() => { deleteTask(task._id) }} ></i>
                   </div>
                </div>

            </div>
        </div>
    )
}

export default TaskCard
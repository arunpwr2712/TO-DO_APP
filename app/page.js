"use client";
import React, { useState } from "react";

const page = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedtaskList, setCompletedTaskList] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTaskList([...taskList, { task, description }]);
    setTask("");
    setDescription("");
    console.log(taskList);
  };

  const deleteHandler=(i) => {
    let copytask=[...taskList];
    copytask.splice(i, 1);
    setTaskList(copytask);
  };
  
  const completeHandler=(i) =>{
    let completedtasks=taskList.at(i);
    setCompletedTaskList([...completedtaskList,completedtasks]);
    deleteHandler(i);
  };

  const deletecompletedHandler=(i) => {
    let copytask=[...completedtaskList];
    copytask.splice(i, 1);
    setCompletedTaskList(copytask);
  };


  let renderTask = <h2>No Task Available</h2>;
  if (taskList.length > 0) {
    renderTask = taskList.map((t, i) => {
      return (
        <li key={i}>
            <div className="m-5 p-3 flex items-center justify-around">
              <h4 className="text-2xl font-semibold">{t.task}</h4>
              <h5 className="text-xl font-semibold">{t.description}</h5>
              <button 
              onClick={() =>{
                completeHandler(i)
              }}
              className="border-solid border-2 border-green-700 bg-green-400 px-3 py-1 rounded">Completed</button>
              <button onClick={()=>{deleteHandler(i)}} 
              className="border-solid border-2 border-red-700 bg-red-400 px-3 py-1 rounded">Delete</button>
            </div>
          </li>
      );
    });
  }
  
 

  let renderCompleted=<h2>No Task Completed</h2>;
  if (completedtaskList.length > 0) {
    renderCompleted = completedtaskList.map((t, i) => {
      return (
          <li key={i}>
            <div className="m-5 p-3 flex items-center justify-around">
              <h4 className="text-2xl font-semibold">{t.task}</h4>
              <h5 className="text-xl font-semibold">{t.description}</h5>
              <button onClick={()=>{deletecompletedHandler(i)}} 
              className="border-solid border-2 border-red-700 bg-red-400 px-3 py-1 rounded">Delete</button>
            </div>
          </li>
      );
    });
  }

  return (
    <>
      <div className="m-10 p-5 border-solid border-4 border-black rounded">
        <h1 className="text-4xl font-bold m-10">MY TO DO LIST</h1>
        <form
          className="flex items-center justify-around"
          onSubmit={submitHandler}
        >
          <div>
            <label>Tasks : </label>
            <input
              type="text"
              id="task"
              className="border-solid border-2 border-black"
              placeholder="Enter Your Task"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
              required
              />
          </div>

          <div>
            <label>Description : </label>
            <input
              type="text"
              id="description"
              className="border-solid border-2 border-black"
              placeholder="Enter Task Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="px-5 py-1 border-solid border-2 border-black bg-black text-white rounded-md font-bold"
          >
            ADD Task
          </button>
        </form><br /><br /><br />

        <div id="result" >
          <h1 className="text-3xl font-bold">Tasks</h1><br/>
          <ul>{renderTask}</ul>
        </div>

        <div id="completed" className="mt-10">
          <h1 className="text-3xl font-bold">Completed Tasks</h1><br/>
          <ul>{renderCompleted}</ul>
        </div>

      </div>
    </>
  );
};

export default page;

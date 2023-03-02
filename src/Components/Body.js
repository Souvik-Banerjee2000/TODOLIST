import React from 'react'
import TaskList from "./TaskList"
import "../css/Body.css"
function Body() {
    return (
        <div className = "taskBody">
            <TaskList space={5} title ="To Do"/>
            <TaskList space = {1} title =" In Progress"/>
            <TaskList space = {5} title ="Done"/>


        </div>
    )
}

export default Body

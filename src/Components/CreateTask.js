import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';



const CreateTask = ({tasks,setTasks}) => {
   const[show,setshow]=useState(false)
   const showName=()=>{
    if(show==true){
        setshow(false)
    }else
    setshow(true)
        }
    const [task,setTask]=useState({
        id:"",
        name:"",
        status:"issue"
    })
    console.log(task)
    const handleSubmit=(e)=>{
    e.preventDefault()
    if(task.name.length<3) return toast.error("a task must more than 3")
    if(task.name.length>100) return toast.error("a task not more than 100")


    setTasks((prev)=>{
        const list=[...prev,task]

        localStorage.setItem("tasks",JSON.stringify(list))

        return list
       
    })
    toast.success("task created")

    setTask({
        id:"",
        name:"",
        status:"issue"

    })

}
  return (
    <div className='container'>
    <div className='first col-md-12'>
     ISSUE TRACKER
    </div>
     <div className='second col-md-12'>
         BOARD
     
    </div>
    
    <button onClick={showName} className='show'>ADD ISSUE</button>
    {show && (
    <form onSubmit={handleSubmit}>
        
        <input type="text" className='input' value={task.name} onChange={(e)=>setTask({...task,id:uuidv4(),name:e.target.value})}/>
        <button className='btn-add'>create</button>
        
    </form>
    )}
    </div>
  )
}

export default CreateTask
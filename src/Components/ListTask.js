import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {toast} from "react-hot-toast"




const ListTask = ({tasks,setTasks}) => {
  
  const [issues,setIssues]=useState([])
  const [todos,setTodos]=useState([])
  const [inProgress,setInProgress]=useState([])
  const [closed,setClosed]=useState([])

  useEffect(()=>{
  const fIssues=tasks.filter((task)=>task.status==="issue")
  const fTodos=tasks.filter((task)=>task.status === "todo")
  const fInProgress=tasks.filter((task)=>task.status === "inprogress")
  const fClosed=tasks.filter((task)=>task.status === "closed")

setIssues(fIssues)
setTodos(fTodos)
setInProgress(fInProgress)
setClosed(fClosed)

  },[tasks])

  const statuses=["issue","todo","inprogress","closed"]
  return (
    <div className='head'>{statuses.map((status,index)=>(
        <Section key={index}
         status={status} 
         tasks={tasks} 
         setTasks={setTasks}
         issues={issues}
          todos={todos}
           inProgress={inProgress}
            closed={closed}
        />
        ))}
    </div>
  )
}

export default ListTask

const Section=({status,tasks,setTasks,issues,todos,inProgress,closed})=>{
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop:(item)=>addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))




  let text="Issues";
  
  let tasksToMap=issues

  if(status=== "todo"){
    text="Todo"
    
    tasksToMap=todos
    }

  if(status==="inprogress"){
    text="In Progresss"
    tasksToMap=inProgress
  }
  if(status==="closed"){
    text="closed"
    tasksToMap=closed
  }

  const addItemToSection=(id)=>{

    setTasks((prev)=>{

      const mTasks=prev.map((t)=>{
         if(t.id === id){
            return{...t,status: status}
      }

      return t
    })
    localStorage.setItem("tasks",JSON.stringify(mTasks))
    toast("Issue status has changed")
      return mTasks
    })
    
  }
  


    return(
    <div ref={drop} className='text1'>
     <Header text={text} count={tasksToMap.length}/>
     {tasksToMap.length>0 && tasksToMap.map((task)=>(<Task key={task.id}
     task={task} tasks={tasks} setTasks={setTasks}/>
     ))}
     </div>
    )

}

const Header=({text,count})=>{

  return(<>
  <div className='textnew'>
   {text}
   <div className='text3'>{count}</div>
   </div>
   </>
  )

}
const Task=({task,tasks,setTasks})=>{
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item:{id: task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

console.log(isDragging)






  const deleteItem=(id)=>{
    console.log(id);
    const fTasks=tasks.filter((t)=>t.id !== id)
    localStorage.setItem("tasks",JSON.stringify(fTasks))
    setTasks(fTasks)

    toast("Task removed")
  }

  return(<div ref={drag} className='text4'>
     <p>{task.name}</p>
     <button className='btntext' onClick={()=>deleteItem(task.id)}>x</button>
   </div>
  )

}
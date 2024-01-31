import './App.css';
import {useEffect, useState} from 'react'

import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ListTask from './Components/ListTask';
import CreateTask from './Components/CreateTask';


function App() {
  
  const [tasks,setTasks] = useState([]);

  console.log("tasks",tasks)
  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem("tasks")))
    
  },[])
  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
    
    <div className="container">
    <CreateTask tasks={tasks} setTasks={setTasks}/>
  
    <ListTask tasks={tasks} setTasks={setTasks}/>
      
    
    </div>
 
    </DndProvider>
    
  );
}

export default App;

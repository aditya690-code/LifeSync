import React, { useRef } from 'react'
import Header from '../components/ToDO/Header';
import TasksPage from '../components/ToDO/TasksPage';
import gsap from 'gsap';

const ToDo = () => {
  const tl = gsap.timeline();
  const addTask = (title,content)=>{
    if(title === '' || content === '') return;
    console.log('title',title)
    console.log('content',content)
  }

  return (
    <div className="bg-r h-[calc(100vh-4rem)] w-full px-4 flex flex-col justify-between gap-5 py-7">
      <Header addTask={addTask} />
      <TasksPage tl={tl} />

    </div>
  )
}

export default ToDo

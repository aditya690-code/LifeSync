import React from "react";
import {Trash2} from 'lucide-react';

const Task = ({ task, onDragStart, OnDelete },) => (
  <div
    draggable
    onDragStart={() => onDragStart(task)}
    className="task
      p-5 px-6  shadow
      cursor-grab active:cursor-grabbing
      hover:scale-[1.02] transition
      bg-white flex items-center justify-between
      
    "
  >
    <div className="info">
      <h2 className="font-medium text-md">{task.title}</h2>
      <p className="text-sm text-gray-400">{task.description}</p>
    </div>
    <Trash2 size={20} className="cursor-pointer text-red-400 active:scale-95" onClick={()=> OnDelete(task.id)} />
  </div>
);

export default Task;
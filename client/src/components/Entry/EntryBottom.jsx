import React from 'react'
import { 
    Book, 
    Wallet, 
    CheckSquare, 
    StickyNote, } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

const EntryBottom = () => {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:".page3",
        start:"top 40%",
      }
    });

    tl.from(".header h3,.header h2",{
      y:400,
      duration:0.8,
      autoAlpha:0,
      stagger:0.1
    })

    tl.from("#left",{
      x:-700,
      duration:0.4,
      stagger:0.1,
    },"-=0.2")

    tl.from("#right",{
      x:700,
      duration:0.4,
      stagger:0.1,
    },">")

    tl.pause();

  })

  return (
    <>
      <div className="page3 overflow-hidden w-screen h-screen">
        {/* header */}
        <div className="header overflow-hidden flex justify-center flex-wrap gap-4 p-4 pt-12">
          <h3 className="w-full text-center text-indigo-600 text-4xl font-bold">FEATURES</h3>
          <h2 className="w-full text-center text-3xl">Everything you need to stay on top</h2>
        </div>

        <div className="w-full h-8/12 flex flex-wrap items-center justify-evenly gap-6">

          <div id="left" className="transition-all duration-300 group w-[35%] p-9 h-60 bg-[#edefefd5] hover:bg-[#d6cce9a1]  scale-100 rounded-2xl">
            <div className="p-3 bg-indigo-600 scale-90 group-hover:scale-100 transition-all ease-in-out text-white rounded-xl w-fit">
              {< Wallet size={30} />}
            </div>
            <h5 className="text-2xl mt-5 font-semibold">Expense Tracker</h5>
            <p className="w-[60%]">Monitor your spending habits with simple, visual tracking.</p>
          </div>
          <div id="right" className="transition-all duration-300 group w-[35%] p-9 h-60 bg-[#edefefd5] hover:bg-[#d6cce9a1]  scale-100 rounded-2xl">
            <div className="p-3 bg-indigo-600 scale-90 group-hover:scale-100 transition-all ease-in-out text-white rounded-xl w-fit">
              {< CheckSquare size={30} />}</div>
            <h5 className="text-2xl mt-5 font-semibold">Habit Tracker</h5>
            <p className="w-[60%]">Build streaks and maintain daily routines effortlessly.</p>
          </div>

          <div id="left" className="transition-all duration-300 group w-[35%] p-9 h-60 bg-[#edefefd5] hover:bg-[#d6cce9a1]  scale-100 rounded-2xl">
            <div className="p-3 bg-indigo-600 scale-90 group-hover:scale-100 transition-all ease-in-out text-white rounded-xl w-fit">
              {< Book size={30} />}
            </div>
            <h5 className="text-2xl mt-5 font-semibold">Personal Journal</h5>
            <p className="w-[60%]">Securely document your daily thoughts and memories.</p>
          </div>
          <div id="right" className="transition-all duration-300 group w-[35%] p-9 h-60 bg-[#edefefd5] hover:bg-[#d6cce9a1]  scale-100 rounded-2xl">
            <div className="p-3 bg-indigo-600 scale-90 group-hover:scale-100 transition-all ease-in-out text-white rounded-xl w-fit">
              {< StickyNote size={30} />}</div>
            <h5 className="text-2xl mt-5 font-semibold">Quick Notes</h5>
            <p className="w-[60%]">Jot down ideas and tasks on colorful sticky notes.</p>
          </div>

        </div>

          <div className="footer w-full h-20 border-t flex justify-between px-8 items-center bg-[#c2c7cea8] mt-8">
            <p className="text-[#94A4B8]">© 2025 LifeSync, Inc.</p>
            <a href="" className="text-[#94A4B8]">Privacy Terms</a>
          </div>
      </div>
    </>
  )
}

export default EntryBottom

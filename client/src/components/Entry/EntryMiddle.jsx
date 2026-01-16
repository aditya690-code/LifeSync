import React, { useRef } from "react";
import {
  Book,
  Wallet,
  CheckSquare,
  StickyNote,
} from "lucide-react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

const EntryMiddle = () => {
  const boxRef = useRef();
  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:".page2Ani",
        start:"top 50%",
      }
    });

    tl.from(".page2",{
      y:500,
      autoAlpha:0,
      duration:0.8
    })
    .to(".left,.right",{
      scale:0.85,
      duration:0.4,
      ease:'elastic.inOut'
    })
    .from(".left ,.right",{
      y:500,
      autoAlpha:0,
      duration:0.6,
      stagger:0.15,
    },">")
    tl.pause();
  });


  return (
    <span className="page2Ani">
      {/* Page 2 */}
      <div ref={boxRef} className="page2 w-full h-10/11 py-12 flex justify-center items-center bg-[#b9bec3b2]">
        <div className="page2-box overflow-hidden flex w-[35%] h-[80%] justify-center flex-wrap gap-1 rotate-4 transition-all duration-600 ease-in-out hover:rotate-2">

          {/* Card 1 */}
          <div className="left bg-white flex gap-4 flex-col justify-center h-70 w-60 p-6 rounded-2xl border border-slate-100 shadow-sm scale-85 hover:scale-90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-pulse">
            <div className="w-fit mx-auto p-2 rounded-3xl bg-indigo-200 text-indigo-400">
              <Wallet size={30} />
            </div>

            <span className="flex flex-col gap-2 items-center">
              <div className="w-[55%] h-3 rounded-3xl bg-[#b9bec3b2]" />
              <div className="w-1/4 h-3 rounded-3xl bg-[#b9bec3b2]" />
            </span>
          </div>

          {/* Card 2 */}
          <div className="right bg-white flex gap-4 flex-col justify-center h-70 w-60 p-6 rounded-2xl border border-slate-100 shadow-sm scale-85 hover:scale-90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-pulse">
            <div className="w-fit mx-auto p-2 rounded-3xl bg-green-200 text-green-500">
              <CheckSquare size={30} />
            </div>

            <span className="flex flex-col gap-2 items-center">
              <div className="w-[55%] h-3 rounded-3xl bg-[#b9bec3b2]" />
            </span>
          </div>

          {/* Card 3 */}
          <div className="left bg-white flex gap-4 flex-col justify-center h-70 w-60 p-6 rounded-2xl border border-slate-100 shadow-sm scale-85 hover:scale-90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-pulse">
            <div className="w-fit mx-auto p-2 rounded-3xl bg-pink-200 text-pink-400">
              <Book size={30} />
            </div>

            <span className="flex flex-col gap-2 items-center">
              <div className="w-[55%] h-3 rounded-3xl bg-[#b9bec3b2]" />
            </span>
          </div>

          {/* Card 4 */}
          <div className="right bg-white flex gap-4 flex-col justify-center h-70 w-60 p-6 rounded-2xl border border-slate-100 shadow-sm scale-85 hover:scale-90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-pulse">
            <div className="w-fit mx-auto p-2 rounded-3xl bg-yellow-200 text-yellow-500">
              <StickyNote size={30} />
            </div>

            <span className="flex flex-col gap-2 items-center">
              <div className="w-[55%] h-3 rounded-3xl bg-[#b9bec3b2]" />
            </span>
          </div>

        </div>
      </div>
    </span>
  );
};

export default EntryMiddle;
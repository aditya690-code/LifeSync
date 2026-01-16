import React, { useRef } from "react";
import { 
    ArrowRight,
  } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {Link} from "react-router-dom"


const EntryUpper = () => {

  const page1Ref = useRef();

  useGSAP(()=>{
    const tl = gsap.timeline();
    tl.from(".head",{
      delay:1.5,
      y:400,
      autoAlpha:0,
      duration:0.5,
    })

    .from(".head span",{
      autoAlpha:0,
      duration:0.5
    },">")

    .from(".main-p",{
      y:200,
      duration:0.8,
      autoAlpha:0
    },"-=0.8")

    .from(".main-btn",{
      y:400,
      duration:0.8,
      autoAlpha:0
    },"-=0.8")

  },{scope:page1Ref})

  

  return (
    <>
      <div ref={page1Ref} className="flex items-center flex-wrap justify-center w-full h-[calc(100vh-4rem)]">
        <div className="w-full h-1/2 overflow-hidden">
          <h2 className="head text-7xl font-bold w-full leading-16.5 text-center overflow-hidden py-3">
            Master your day with
            <br />
            <span className=" text-indigo-700"> 
              LifeSync
            </span>
          </h2>
          <p className="main-p w-[40%] text-center mx-auto my-6 opacity-90 text-[#64758B]">
            The all-in-one personal management dashboard. Track your expenses,
            maintain daily habits, write your journal, and organize your
            thoughts—all in one secure place.
          </p>
          <Link to={'/home'}  className="main-btn w-fit flex items-center gap-3 px-7 py-4 bg-indigo-700 text-white shadow rounded-lg mx-auto cursor-pointer">
            Get Started Free <ArrowRight size={20} />
          </Link>
          <Link></Link>
        </div>
      </div>
    
    </>
  );
};

export default EntryUpper;

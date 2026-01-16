import { Activity } from "lucide-react";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomeUpper = () => {
  const headRef = useRef();

  //
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(headRef.current, {
        y: 200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        ".upper h2",
        { y: 60, opacity: 0, duration: 0.4, ease: "power3.out" },
        "-=0.6"
      );

      tl.from(".upper p", {
        y: 40,
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
      });
    },
    { scope: headRef }
  );

  return (
    <div className="upper" ref={headRef}>
      <div className=" animate-slide-up bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden transition-transform hover:scale-[1.01] duration-300">
        <div className=" relative z-10">
          <h2 className="text-3xl font-bold mb-2">{getGreeting()}, Friend.</h2>

          <p className="opacity-90 text-indigo-100">
            Here is what's happening in your life today.
          </p>
        </div>
        <Activity className="absolute right-0 bottom-0 text-white opacity-10 w-48 h-48 -mr-10 -mb-10 animate-pulse" />
      </div>
    </div>
  );
};

export default HomeUpper;

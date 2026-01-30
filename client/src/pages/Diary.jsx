import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import NotesUpper from "../components/Notes/NotesUpper";
import LeftDiary from "../components/Diary/LeftDiary";
import RightDiary from "../components/Diary/RightDiary";

import { useSelector } from "react-redux";

const Diary = () => {
  const { isLoading, error } = useSelector((state) => state.diary);

  const ref = useRef();

  useGSAP(
    () => {
      const tl3 = gsap.timeline();
      tl3
        .from(".left", { x: -400, delay: 0.7, autoAlpha: 0 })
        .from(".right", { x: 800, autoAlpha: 0 }, ">")
        .from(".left .header", { y: -300, autoAlpha: 0 })
        .from(
          ".head-item",
          { y: 250, scale: 0, autoAlpha: 0, stagger: 0.15 },
          "-=0.7",
        );
    },
    { scope: ref },
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1> Error </h1>;
  }

  return (
    <div
      ref={ref}
      className="diary h-[calc(100vh-4rem)] w-full overflow-hidden"
    >
      <NotesUpper
        setForm={(str) => {}}
        layout={"list"}
        setLayout={(str) => {}}
        setActiveNote={(str) => {}}
        setAnyNote={() => {}}
      />
      {/* MAIN LAYOUT */}
      <div className="h-[calc(100vh-7.5rem)] p-4 h-[] flex overflow-hidden gap-12">
        {/* LEFT SIDEBAR */}
        <LeftDiary />

        {/* RIGHT CONTENT */}
        <RightDiary />
      </div>
    </div>
  );
};

export default Diary;

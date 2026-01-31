import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ListItem from "../Common/ListItem";
import gsap from "gsap";

const TaskList = ({ data }) => {
  const containerRef = useRef(null);

  // Each TaskList manages its own timeline
  const listTL = useRef(null);
  if (!listTL.current) listTL.current = gsap.timeline();

  useGSAP(
    () => {
      listTL.current.clear(); // clear previous animations

      // Animate all children (ListItem) in this container
      listTL.current.fromTo(
        containerRef.current.children,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.1 },
      );
    },
    {
      dependencies: [data], // re-run animation whenever data changes
      scope: containerRef, // safe scoping
    },
  );

  return (
    <div
      ref={containerRef}
      className="w-full max-h-full overflow-y-auto no-scrollbar"
    >
      {data.map((task, i) => (
        <ListItem data={task} key={task.id ?? i} />
      ))}
    </div>
  );
};

export default TaskList;

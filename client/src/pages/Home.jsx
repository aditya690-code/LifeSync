import { useState, useEffect } from "react";
import HomeUpper from "../components/Home/HomeUpper";
import HomeMiddle from "../components/Home/HomeMiddle";
import HomeBottom from "../components/Home/HomeBottom";
import { setEntry, setTotalEntry } from "../redux/features/diary/diarySlice";
import { useDispatch, useSelector } from "react-redux";
import { diaries } from "../services/data";
import gsap from "gsap";


const Home = ({expenses,tasks,notes}) => {
const tl = gsap.timeline()

const dispatch = useDispatch();


useEffect(() => {
  dispatch(setEntry(diaries));
  dispatch(setTotalEntry(diaries.length));
}, [diaries]);

  const diary = useSelector((state)=>state.diary.entry);

  function onChangeTab(route) {
    window.location.href = route;
  }

  let [stats, _] = useState({
    recentExpenses: [],
    pendingHabits: [],
    latestDiary: [
      {
        title: "Morning Reflections",
        date: "12/12/2025",
        content:
          "Woke up super fresh today. Trying to keep this momentum going!",
      },
    ],
  });

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const todo = tasks.filter((t) => t.status === "todo");
  const progress = tasks.filter((t) => t.status === "progress");
  const done = tasks.filter((t) => t.status === "done");

  const totalTasks = todo.length + progress.length + done.length;
  const completedTasks = done.length;
  
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className="flex flex-col overflow-hidden space-y-6 px-8 pt-4" >
      <HomeUpper />

      <HomeMiddle
        onChangeTab={onChangeTab} 
        total={total} 
        progressPercent={progressPercent}
        notes={notes.length}
      />
      <HomeBottom 
        tl={tl} 
        onChangeTab={onChangeTab} 
        data={stats} 
        expenses={expenses} 
        tasks={tasks} 
        diaries={diary}
        notes={notes}
      />
    </div>
  );
};

export default Home;

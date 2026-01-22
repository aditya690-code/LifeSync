// import {
//   CheckSquare,
//   IndianRupee,
//   LayoutGrid,
//   LayoutList,
//   Plus,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import CalendarGrid from "../components/Calendar/CalendarGrid";
// import CalendarList from "../components/Calendar/CalendarList";
// import { setEntry } from "../redux/features/diary/diarySlice";
// import { handleLayout } from "../services/function";
// import Layout from "../components/shared/Layout";
// import { days, monthNames } from "../services/calendar";
// import CalendarSection from "../components/Calendar/CalendarSection";



// export default function Calendar() {
//   const layout = localStorage.getItem("layout") || "list";
//   const text = localStorage.getItem("text") || "expenses";
//   const today = new Date();
//   const [activeText, setActiveText] = useState(text);
//   const [activeLayout, setActiveLayout] = useState(layout);
//   const [currentDate, setCurrentDate] = useState(
//     new Date(today.getFullYear(), today.getMonth(), 1),
//   );
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const day = today.getDay();
//   const [activeDate, setActiveDate] = useState({
//     day: days[day],
//     date: today.getDate(),
//     month: monthNames[month],
//     year: year,
//   });
//   const totalDays = new Date(year, month + 1, 0).getDate();
//   const firstDayIndex = new Date(year, month, 1).getDay();

//   // Data
//   const diaries = useSelector((state) => state.diary.entry) || [];
//   const notes = useSelector((state) => state.notes.notes) || [];
//   const todo = useSelector((state) => state.todo.todo) || [];
//   const expenses = useSelector((state) => state.expenses.expenses) || [];

//   const dispatch = useDispatch();
//   // dispatch();

//   const [progress, setProgress] = useState(0);
//   const [spend, setSpend] = useState([]);
//   const [data, setData] = useState(expenses);


//   const formatNum = (n) => {
//     return n > 9 ? n : "0" + n;
//   };
//   // function normalizeDate(dateStr) {
//   //   const [dd, mm, yyyy] = dateStr.split("/");
//   //   return `${dd}/${mm}/${yyyy}`;
//   // }
//   const formatDate = (dateStr) => {
//     const [day, month, year] = dateStr.split("/");
//     const d = new Date(year, month - 1, day);
//     return `${formatNum(d.getDate())}/${formatNum(
//       d.getMonth() + 1,
//     )}/${d.getFullYear()}`;
//   };

//   // const setDataByDate = (dt, data) => {
//   //   const formatted = formatDate(dt);
//   //   return data.filter((item) => item.createdAt === formatted);
//   // };

//   const setDataByDate = (dt, data) => {

//     const d = new Date(year, month - 1, day);

//     return data.filter(
//       (item) =>
//         item.createdAt.date === d.getDate() &&
//         item.createdAt.month === d.getMonth() &&
//         item.createdAt.year === d.getFullYear(),
//     );
//   };


//   function isFind(date, data) {
//     return data.some(
//       (item) =>
//         date.date === item.createdAt.date &&
//         date.month === item.createdAt.month &&
//         date.year === item.createdAt.year,
//     );
//   }

//   function isExpenses(date, month, year) {
//     return isFind({ date, month, year }, expenses);
//   }

//   function isHabit(date, month, year) {
//     return isFind({ date, month, year }, todo);
//   }

//   function isNotes(date, month, year) {
//     return isFind({ date, month, year }, notes);
//   }

//   function isJournal(date, month, year) {
//     return isFind ({ date, month, year }, diaries);
//   }

//   const findAt = (mn) => monthNames.indexOf(mn) + 1;

//   const findCompleted = (db) => {
//     return db.filter((item) => item.isDone == true);
//   };

//   const handleProgress = (dt) => {
//     const prdb = setDataByDate(dt, todo) || [];
//     const compl = findCompleted(prdb) || 0;
//     const newProgress =
//       prdb.length === 0 ? 0 : Math.round((compl.length / prdb.length) * 100);
//     setProgress(newProgress);
//   };

//   useEffect(() => {
//     const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
//       activeDate.year
//     }`;

//     let temp = [];
//     if (activeText === "notes") temp = setDataByDate(dt, notes);
//     else if (activeText === "diary") temp = setDataByDate(dt, diaries);
//     else if (activeText === "expenses") {
//       temp = setDataByDate(dt, expenses) || [];
//       setSpend(temp);
//     }
//     handleProgress(dt);
//     setData(temp);
//   }, [activeDate, activeText]);

//   function handleText(txt) {
//     localStorage.setItem("text", txt);
//     setActiveText(txt);
//     if (txt === "notes") {
//       const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
//         activeDate.year
//       }`;
//       const temp = setDataByDate(dt, notes);
//       setData(temp);
//     } else if (txt === "diary") {
//       const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
//         activeDate.year
//       }`;
//       const temp = setDataByDate(dt, diaries);
//       setData(temp);
//     } else if (txt === "expenses") {
//       const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
//         activeDate.year
//       }`;
//       const temp = setDataByDate(dt, expenses);
//       setData(temp);
//     }
//   }

// console.log(notes)
//   return (
//     <div className="flex justify-center gap-5 p-6 py-5">
//       {/* Left */}
//       <CalendarSection />

//       {/* Right */}

//     </div>
//   );
// }





// Calendar section

  const layout = localStorage.getItem("layout") || "list";
  const text = localStorage.getItem("text") || "expenses";
  const today = new Date();
  const [activeText, setActiveText] = useState(text);
  // const [activeLayout, setActiveLayout] = useState(layout);
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = today.getDay();
  const [activeDate, setActiveDate] = useState({
    day: days[day],
    date: today.getDate(),
    month: monthNames[month],
    year: year,
  });
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Data
  const diaries = useSelector((state) => state.diary.entry) || [];
  const notes = useSelector((state) => state.notes.notes) || [];
  const todo = useSelector((state) => state.todo.todo) || [];
  const expenses = useSelector((state) => state.expenses.expenses) || [];

  // const dispatch = useDispatch();
  // dispatch();

  const [progress, setProgress] = useState(0);
  const [spend, setSpend] = useState([]);
  const [data, setData] = useState(expenses);

  // const formatNum = (n) => {
  //   return n > 9 ? n : "0" + n;
  // };
  // function normalizeDate(dateStr) {
  //   const [dd, mm, yyyy] = dateStr.split("/");
  //   return `${dd}/${mm}/${yyyy}`;
  // }
  // const formatDate = (dateStr) => {
  //   const [day, month, year] = dateStr.split("/");
  //   const d = new Date(year, month - 1, day);
  //   return `${formatNum(d.getDate())}/${formatNum(
  //     d.getMonth() + 1,
  //   )}/${d.getFullYear()}`;
  // };

  // const setDataByDate = (dt, data) => {
  //   const formatted = formatDate(dt);
  //   return data.filter((item) => item.createdAt === formatted);
  // };

  const setDataByDate = (dt, data) => {
    const d = new Date(year, month - 1, day);

    return data.filter(
      (item) =>
        item.createdAt.date === d.getDate() &&
        item.createdAt.month === d.getMonth() &&
        item.createdAt.year === d.getFullYear(),
    );
  };

  const findAt = (mn) => monthNames.indexOf(mn) + 1;

  const findCompleted = (db) => {
    return db.filter((item) => item.isDone == true);
  };

  const handleProgress = (dt) => {
    const prdb = setDataByDate(dt, todo) || [];
    const compl = findCompleted(prdb) || 0;
    const newProgress =
      prdb.length === 0 ? 0 : Math.round((compl.length / prdb.length) * 100);
    setProgress(newProgress);
  };

  useEffect(() => {
    const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
      activeDate.year
    }`;

    let temp = [];
    if (activeText === "notes") temp = setDataByDate(dt, notes);
    else if (activeText === "diary") temp = setDataByDate(dt, diaries);
    else if (activeText === "expenses") {
      temp = setDataByDate(dt, expenses) || [];
      setSpend(temp);
    }
    handleProgress(dt);
    setData(temp);
  }, [activeDate, activeText]);

  // function handleText(txt) {
  //   localStorage.setItem("text", txt);
  //   setActiveText(txt);
  //   if (txt === "notes") {
  //     const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
  //       activeDate.year
  //     }`;
  //     const temp = setDataByDate(dt, notes);
  //     setData(temp);
  //   } else if (txt === "diary") {
  //     const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
  //       activeDate.year
  //     }`;
  //     const temp = setDataByDate(dt, diaries);
  //     setData(temp);
  //   } else if (txt === "expenses") {
  //     const dt = `${activeDate.date}/${findAt(activeDate.month)}/${
  //       activeDate.year
  //     }`;
  //     const temp = setDataByDate(dt, expenses);
  //     setData(temp);
  //   }
  // }




import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  IndianRupee,
  LayoutGrid,
  LayoutList,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

/* =======================
   CONSTANTS
======================= */

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/* =======================
   COMPONENT
======================= */

const CalendarSection = () => {
  const today = new Date();

  /* =======================
     STATE
  ======================= */

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [activeDate, setActiveDate] = useState({
    day: days[today.getDay()],
    date: today.getDate(),
    month: monthNames[today.getMonth()],
    year: today.getFullYear(),
  });

  const [activeText, setActiveText] = useState(
    localStorage.getItem("text") || "expenses"
  );

  const [data, setData] = useState([]);
  const [spend, setSpend] = useState([]);
  const [progress, setProgress] = useState(0);

  /* =======================
     DERIVED VALUES
  ======================= */

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  /* =======================
     REDUX DATA
  ======================= */

  const diaries = useSelector((state) => state.diary.entry) || [];
  const notes = useSelector((state) => state.notes.notes) || [];
  const todo = useSelector((state) => state.todo.todo) || [];
  const expenses = useSelector((state) => state.expenses.expenses) || [];

  /* =======================
     HELPERS
  ======================= */

  const getDay = (date) =>
    new Date(year, month, date).getDay();

  const findMonthIndex = (mn) =>
    monthNames.indexOf(mn);

  const setDataByDate = (dt, source) => {
    const [d, m, y] = dt.split("/").map(Number);

    return source.filter(
      (item) =>
        item.createdAt &&
        item.createdAt.date === d &&
        item.createdAt.month === m - 1 &&
        item.createdAt.year === y
    );
  };

  const isFind = (date, source) =>
    source.some(
      (item) =>
        item.createdAt &&
        item.createdAt.date === date.date &&
        item.createdAt.month === date.month &&
        item.createdAt.year === date.year
    );

  const handleProgress = (dt) => {
    const db = setDataByDate(dt, todo);
    const completed = db.filter((i) => i.isDone);
    setProgress(db.length ? Math.round((completed.length / db.length) * 100) : 0);
  };

  /* =======================
     MONTH CONTROLS
  ======================= */

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setActiveDate({
      day: days[today.getDay()],
      date: today.getDate(),
      month: monthNames[today.getMonth()],
      year: today.getFullYear(),
    });
  };

  /* =======================
     EFFECT
  ======================= */

  useEffect(() => {
    const dt = `${activeDate.date}/${findMonthIndex(activeDate.month) + 1}/${activeDate.year}`;

    let temp = [];
    if (activeText === "notes") temp = setDataByDate(dt, notes);
    else if (activeText === "diary") temp = setDataByDate(dt, diaries);
    else if (activeText === "expenses") {
      temp = setDataByDate(dt, expenses);
      setSpend(temp);
    }

    handleProgress(dt);
    setData(temp);
  }, [activeDate, activeText, notes, diaries, expenses, todo]);

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="relative left w-2xl h-[calc(100vh-7rem)]">
      <div className="w-full h-full bg-white p-6 rounded-3xl shadow">

        {/* Header */}
        <div className="flex h-12 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {monthNames[month]} {year}
          </h2>

          <div className="flex items-center h-12 gap-4 bg-gray-100 px-4 py-2 rounded-md">
            <button onClick={prevMonth}>‹</button>
            <button onClick={goToToday}>TODAY</button>
            <button onClick={nextMonth}>›</button>
          </div>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 text-center text-gray-400 mb-4">
          {days.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid h-[70%] grid-cols-7 gap-4">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: totalDays }).map((_, i) => {
            const date = i + 1;
            const isToday =
              date === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={date}
                className={`cursor-pointer h-20 rounded-2xl border flex flex-col items-center justify-center gap-2
                  ${isToday ? "bg-indigo-100" : ""}
                `}
                onClick={() =>
                  setActiveDate({
                    day: days[getDay(date)],
                    date,
                    month: monthNames[month],
                    year,
                  })
                }
              >
                <p>{date}</p>

                <div className="h-4 flex gap-1">
                  {isFind({ date, month, year }, expenses) && <span className="h-1.5 w-1.5 bg-green-400 rounded-full" />}
                  {isFind({ date, month, year }, todo) && <span className="h-1.5 w-1.5 bg-purple-400 rounded-full" />}
                  {isFind({ date, month, year }, notes) && <span className="h-1.5 w-1.5 bg-yellow-400 rounded-full" />}
                  {isFind({ date, month, year }, diaries) && <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CalendarSection;
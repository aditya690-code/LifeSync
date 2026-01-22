import React, { useState, useEffect } from "react";
import {
  days,
  getDay,
  goToToday,
  isFind,
  monthNames,
  nextMonth,
  prevMonth,
} from "../../services/calendar";
import {
  CheckSquare,
  IndianRupee,
  LayoutGrid,
  LayoutList,
  Plus,
} from "lucide-react";
import { useSelector } from "react-redux";

const CalendarSection = () => {
  const today = new Date();

  const [activeDate, setActiveDate] = useState({
    day: getDay(today.getDay()),
    date: today.getDate(),
    month: monthNames[today.getMonth()],
    year: today.getFullYear(),
  });


  const month = activeDate.month;
  const year = activeDate.year;
  const totalDays = new Date(year, month, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Redux
  const diaries = useSelector((state) => state.diary.entry);
  const expenses = useSelector((state) => state.expenses.expenses);
  const todo = useSelector((state) => state.todo.todo);
  const notes = useSelector((state) => state.notes.notes);

  console.log("active date", activeDate);
  console.log("total days", totalDays);

  return (
    <div className="relative left w-2xl h-[calc(100vh-7rem)]">
      <div className="w-full h-full bg-white p-6 rounded-3xl shadow">
        {/* Header */}
        <div className="flex h-12 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {monthNames[month]} <span className="text-indigo-600">{year}</span>
          </h2>

          <div className="flex items-center h-12 gap-4 bg-gray-100 px-4 py-2 rounded-md">
            <button
              onClick={prevMonth}
              className="hover:bg-white h-full font-light text-xl cursor-pointer w-8 flex items-center justify-center rounded-md "
            >
              ‹
            </button>
            <button
              onClick={goToToday}
              className="font-semibold cursor-pointer hover:opacity-50"
            >
              TODAY
            </button>
            <button
              onClick={() => nextMonth(month,year,setActiveDate)}
              className="hover:bg-white h-full font-light text-xl cursor-pointer w-8 flex items-center justify-center rounded-md "
            >
              ›
            </button>
          </div>
        </div>
        {/* Week Days */}
        <div className="grid grid-cols-7 text-center text-gray-400 mb-4 pr-5.5">
          {days.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        {/* Dates Grid */}
        <div className="grid h-[70%] grid-cols-7 gap-4">
          {/* Empty boxes */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Dates */}
          {Array.from({ length: totalDays }).map((_, i) => {
            const date = i + 1;
            const isToday =
              date === today.getDate() &&
              month === today.getMonth()  &&
              year === today.getFullYear();

            return (
              <div
                key={date}
                className={`cursor-pointer h-20 w-15 rounded-2xl border flex flex-col items-center justify-center flex-wrap gap-2 text-lg font-semibold
                    ${isToday ? "bg-indigo-100" : "border-gray-200"}
                    ${
                      activeDate.date === date &&
                      activeDate.month === monthNames[activeDate.month] &&
                      activeDate.year === activeDate.year
                        ? "border-indigo-600"
                        : "border-gray-200"
                    }`}
                onClick={() =>
                  setActiveDate({
                    day: days[getDay(date)],
                    date: date,
                    month: monthNames[month],
                    year: year,
                  })
                }
              >
                <p>{date} </p>
                <div className="h-4 w-[80%] flex justify-evenly items-center">
                  {isFind(date, month, year, expenses) && (
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full"></div>
                  )}
                  {isFind(date, month, year, todo) && (
                    <div className="h-1.5 w-1.5 bg-purple-400 rounded-full"></div>
                  )}
                  {isFind(date, month, year, notes) && (
                    <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full"></div>
                  )}
                  {isFind(date, month, year, diaries) && (
                    <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="absolute w-[80%] h-5 bottom-2 flex gap-4 justify-center">
            <div className="flex items-center gap-1">
              <p className="h-2 w-2 rounded-full bg-green-400"></p>
              <p className="text-xs text-gray-600">Expenses</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="h-2 w-2 rounded-full bg-purple-400"></p>
              <p className="text-xs text-gray-600">Habit</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="h-2 w-2 rounded-full bg-yellow-400"></p>
              <p className="text-xs text-gray-600">Notes</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="h-2 w-2 rounded-full bg-indigo-400"></p>
              <p className="text-xs text-gray-600">Journal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;

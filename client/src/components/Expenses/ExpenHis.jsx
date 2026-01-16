import {
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  NotepadTextDashed,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ExpenHis = () => {
  let expenses = useSelector((state) => state.expenses.expenses);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getPrevMon = () => {
    const prev = new Date(year, month - 1, 1);
    setMonth(prev.getMonth());
    setYear(prev.getFullYear());
  };

  const getNextMon = () => {
    const prev = new Date(year, month + 1, 1);
    setMonth(prev.getMonth());
    setYear(prev.getFullYear());
  };

  expenses = expenses.filter(
    (item) => item.createdAt.month === month && item.createdAt.year === year
  );

  function groupExpensesByCategory(expenses) {
    return expenses.reduce((acc, expense) => {
      const { title, amount } = expense;

      if (!acc[title]) {
        acc[title] = {
          total: 0,
          expenses: [],
        };
      }

      acc[title].total += amount;
      acc[title].expenses.push(expense);

      return acc;
    }, {});
  }
  let expensesByCategory = groupExpensesByCategory(expenses);

  function sortExpensesByCategory(data, order = "desc") {
    return Object.fromEntries(
      Object.entries(data).sort(([, a], [, b]) => {
        return order === "asc" ? a.total - b.total : b.total - a.total;
      })
    );
  }

  expensesByCategory = sortExpensesByCategory(expensesByCategory);

  /* ===== COLORS ===== */
  const CATEGORY_COLORS = {
    Groceries: "#E63946",
    Travel: "#1D3557",
    Rent: "#F1FAEE",
    Bills: "#457B9D",
    Internet: "#A8DADC",
    Shopping: "#FF6F61",
    Entertainment: "#6A4C93",
    Subscriptions: "#F4A261",
    Health: "#2A9D8F",
    Fitness: "#00B4D8",
    Education: "#8338EC",
    Books: "#BC6C25",
    EMI: "#EF233C",
    Loan: "#3A86FF",
    Insurance: "#8D99AE",
    Fuel: "#D62828",
    Cab: "#0077B6",
    Gifts: "#FFB703",
    "Personal Care": "#C77DFF",
  };

  /* ===== CALCULATIONS ===== */
  const categories = Object.keys(expensesByCategory);

  const chartData = categories.map((cat) => ({
    name: cat,
    value: expensesByCategory[cat].total,
    color: CATEGORY_COLORS[cat] || "#111",
  }));
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  let startPercent = 0;
  const gradient =
    total > 0
      ? chartData
          .map((item) => {
            const percent = (item.value / total) * 100;
            const slice = `${item.color} ${startPercent}% ${
              startPercent + percent
            }%`;
            startPercent += percent;
            return slice;
          })
          .join(", ")
      : "#e5e7eb";

  return (
    <div className="flex flex-col gap-6 w-full mt-4 h-[calc(100vh-10.2rem)]">
      {/* TOP SUMMARY */}
      <div
        className="rounded-3xl p-8                 
            animate-slide-up 
            bg-linear-to-r 
          from-indigo-600 
          to-purple-600
          text-white
            shadow-lg"
      >
        {/* Month Navigation */}
        <div className="flex justify-between items-center max-w-xl mx-auto">
          <button className="p-2 rounded-full hover:bg-white/20 transition">
            <ChevronLeft
              size={24}
              onClick={getPrevMon}
              className="cursor-pointer"
            />
          </button>

          <h2 className="text-2xl font-semibold tracking-wide">
            {monthNames[month]} {year}
          </h2>

          <button className="p-2 rounded-full hover:bg-white/20 transition">
            <ChevronRight
              size={24}
              className="cursor-pointer"
              onClick={getNextMon}
            />
          </button>
        </div>

        {/* Total Spend */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl px-10 py-4 text-center">
            <p className="text-sm opacity-80">Total spend this month</p>
            <div className="flex items-center justify-center gap-1 mt-1 font-bold">
              <IndianRupee size={22} />
              <span className="text-3xl">{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-gray-200 bg-[#ededed]">
          <h3 className="text-xl font-semibold text-gray-800 ">Transactions</h3>
        </div>

        {/* Body */}

        <div className="bg-white flex-1 w-full overflow-hidden flex justify-evenly">
          {/* List overview */}
          {Object.keys(expensesByCategory).length > 0 ? (
            <div className="left border-0 h-full p-6 py-0 w-[48%] overflow-hidden overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 py-6">
                {Object.keys(expensesByCategory).map((title) => (
                  <div
                    key={title}
                    className="item rounded-xl border-none bg-[#eae9e9] border p-4 hover:shadow-md transition"
                  >
                    <h6 className="text-sm font-medium text-gray-600">
                      {title}
                    </h6>

                    <h4 className="text-2xl font-bold text-indigo-700 mt-2">
                      ₹ {expensesByCategory[title].total.toLocaleString()}
                    </h4>

                    <p className="text-xs text-gray-400 mt-1">
                      {expensesByCategory[title].expenses.length} transactions
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Empty state
            <div className="h-full w-[48%] flex justify-center items-center">
              <div className="flex gap-2 text-gray-400">
                <NotepadTextDashed size={20} />
                <p className="text-sm font-medium">No expenses this month</p>
              </div>
            </div>
          )}

          {/* Circle overview */}
          <div className="right w-[48%] border-0 h-94 p-6 flex flex-col items-center justify-center py-6">
            {/* Circle */}
            <div className="relative w-62 h-62">
              <div
                className="circle w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(${gradient})`,
                }}
              ></div>

              {/* Donut Hole */}
              <div className="circle absolute inset-0 m-auto w-36 h-36 bg-white rounded-full"></div>

              {/* Center Text */}
              <div className="circle-info absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500">Total</span>
                <strong className="text-2xl">₹ {total.toLocaleString()}</strong>
              </div>
            </div>

            {/* Legend */}
            <ul className="mt-2 w-full space-y-2 max-h-20 overflow-y-scroll no-scrollbar">
              {chartData.length > 0 ? (
                chartData.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ background: item.color }}
                      ></span>
                      {item.name}
                    </div>
                    <strong>₹ {item.value}</strong>
                  </li>
                ))
              ) : (
                <div className="flex h-20 justify-center items-center">
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenHis;

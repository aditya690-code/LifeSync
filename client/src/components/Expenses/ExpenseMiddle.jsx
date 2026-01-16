import React,{useRef} from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ExpenseMiddle = ({expenses}) => {
  const itemRef = useRef();
  /* ===== DEMO DATA ===== */
  let expensesByCategory = {};


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
  expensesByCategory = groupExpensesByCategory(expenses);

  function sortExpensesByCategory(data, order = "desc") {
    return Object.fromEntries(
      Object.entries(data).sort(([, a], [, b]) => {
        return order === "asc"
          ? a.total - b.total
          : b.total - a.total;
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

  const chartData = categories.map((cat, ) => ({
    name: cat,
    value: expensesByCategory[cat].total,
    color: CATEGORY_COLORS[cat] || "#999",
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  let startPercent = 0;
  const gradient = chartData
    .map((item) => {
      const percent = (item.value / total) * 100;
      const slice = `${item.color} ${startPercent}% ${
        startPercent + percent
      }%`;
      startPercent += percent;
      return slice;
    })
    .join(", ");
  /* ===== JSX ===== */

  // Animation
  useGSAP(()=>{
    const tl2 = gsap.timeline({ease: "power3.out"});

    tl2  
    .from(".box",{
      y:600,
      autoAlpha:0,
      scale:0,
      duration:0.6,
    })

    .from(".box .head",{
      y: 600,
      autoAlpha:0,
      duration:0.6,
    })

    .from(".box .head span",{
      x: -600,
      autoAlpha:0,
      duration:0.6,
    })

    .from(".box .left",{
      y: 600,
      autoAlpha:0,
      duration:0.6,
      scale:0,
    })

    .from(".box .right",{
      y: 600,
      autoAlpha:0,
      duration:0.6,
      scale:0
    },">")

    .fromTo(".item",{
      y: 700,
      scale:0,
      opacity:0,
      autoAlpha:0,
    },
    {
      y:0,
      scale:1,
      autoAlpha:1,
      duration:0.3,
      stagger:0.15
    },"+=0.2")

    .from(".circle",{
      y:600,
      scale:0,
      autoAlpha:0,
      duration:0.4,
    },"<")

    .from(".circle-info",{
      y:600,
      scale:0,
      autoAlpha:0,
      duration:0.4,
      delay:0.3,
    },'<')

    .from("li",{
      x:-400,
      autoAlpha:0,
      scale:0,
      duration:0.4,
      stagger:0.17
    },"<")

    .from("strong",{
      x:400,
      autoAlpha:0,
      scale:0,
      duration:0.4,
      stagger:0.17
    },"<")

  })

  return (
    <div className="box w-full h-124 bg-white my-4 space-y-10 flex flex-wrap justify-evenly rounded-2xl">
      {/* Header */}
        <h4 className="head w-full h-16 pl-12 bg-[#E4E4E4] text-xl font-semibold flex items-center gap-2 mb-6 rounded-2xl rounded-b-none">
          <span>
            Category Wise Breakdown
          </span>
        </h4>
      {/* ===== Category Breakdown ===== */}
      <div className="left border-0 bg-[#ededed] h-94 rounded-2xl shadow p-6 w-[48%] overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.keys(expensesByCategory).map((title) => (
            <div
              key={title} ref={itemRef}
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

          {/* Category Breakdown using circle */}
      <div className="right w-[48%] border-0 h-94 bg-[#ededed] rounded-2xl shadow p-6 flex flex-col items-center justify-center">

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
            <strong className="text-2xl">
              ₹ {total.toLocaleString()}
            </strong>
          </div>
        </div>

        {/* Legend */}
        <ul className="mt-2 w-full space-y-2 max-h-20 overflow-y-scroll no-scrollbar">
          {chartData.map((item) => (
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
          ))}
        </ul>
      </div>
  
    </div>
  );
};

export default ExpenseMiddle;
import React from "react";

const Tab = ({onChangeTab,item,i}) => {

  const styles = {
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    hoverText: "hover:text-green-700",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    hoverText: "hover:text-purple-700",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    hoverText: "hover:text-orange-700",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    hoverText: "hover:text-yellow-700",
  },
};

  return (
    <div
      key={i}
      onClick={() => onChangeTab(item.tab)}
      className={`tab animate-scale-in delay-${
        (i + 1) * 100
      } bg-white p-6 anima rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          style={styles[item.color]}
          className={`p-2 bg-${item.color}-100 text-${item.color}-600 rounded-lg group-hover:scale-110 transition-transform`}
        >
          <item.icon size={20} />
        </div>
        <span
          className={`text-slate-500 font-medium text-sm group-hover:text-${item.color}-600 transition`}
        >
          {item.label}
        </span>
      </div>
      <div className="flex items-center">
        <div className="text-2xl font-bold text-slate-800">{item.val}</div>
        {item.sub}
      </div>
    </div>
  );
};

export default Tab;

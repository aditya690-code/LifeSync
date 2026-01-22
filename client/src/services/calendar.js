export const monthNames = [
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

export const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const prevMonth = (month, year, setdb) => {
  const prevMonthDate = new Date(year, month - 1);
  setdb(prevMonthDate);
};

export const goToToday = (setdb) => {
  const today = new Date();
  setdb(today);
};

export const nextMonth = (month, year, setdb) => {
  const nextMonth = new Date(year, month + 1);
  setdb(nextMonth);
};

export const getDay = (day) => {
  return days[day];
};

export function isFind(date, month, year, data) {
  return data.some(
    (item) =>
      date === item.createdAt.date &&
      month === item.createdAt.month &&
      year === item.createdAt.year,
  );
}

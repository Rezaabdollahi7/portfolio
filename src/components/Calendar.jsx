import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const today = new Date();
  const isToday = (day) => {
    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-empty-day"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <button
          key={day}
          className={`calendar-day ${isToday(day) ? "calendar-today" : ""}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <section id="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-prev">
          <ChevronLeft />
        </button>
        <h2>{monthNames[currentDate.getMonth()]}</h2>
        <button onClick={nextMonth} className="calendar-next">
          <ChevronRight />
        </button>
      </div>

      <div className="calendar-weekdays">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="calendar-days">{renderCalendar()}</div>
    </section>
  );
};

export default Calendar;

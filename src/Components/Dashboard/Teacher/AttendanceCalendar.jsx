import { useState } from 'react';

const AttendanceCalendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1?.toDateString() === date2?.toDateString();
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelectedDate = isSameDate(date, selectedDate);
      const isTodayDate = isToday(date);
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            p-2 rounded-lg font-medium text-center hover:bg-pink-100 
            ${isSelectedDate 
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md' 
              : isTodayDate 
                ? 'bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 border-2 border-pink-300' 
                : 'text-gray-700 hover:text-pink-600'
            }
          `}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-8 rounded-2xl shadow-xl border border-pink-100">
      

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
            📅 Attendance Calendar
          </span>
        </div>

        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-600 hover:bg-pink-50 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#111430] to-purple-600 bg-clip-text text-transparent">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-600 hover:bg-pink-50 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-6 text-center">
            <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100">
              <span className="text-sm font-medium text-gray-600">Selected Date: </span>
              <span className="font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
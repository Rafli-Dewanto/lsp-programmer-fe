'use client';

import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';

interface DatePickerWithRangeProps {
  date: {
    from: Date;
    to: Date;
  };
  setDate: (date: { from: Date; to: Date }) => void;
}

const DatePickerWithRange = ({ date, setDate }: DatePickerWithRangeProps) => {
  const [fromDate, setFromDate] = useState(date.from.toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(date.to.toISOString().split('T')[0]);

  useEffect(() => {
    setFromDate(date.from.toISOString().split('T')[0]);
    setToDate(date.to.toISOString().split('T')[0]);
  }, [date]);

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = new Date(e.target.value);
    setFromDate(e.target.value);
    setDate({
      from: newFromDate,
      to: date.to,
    });
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = new Date(e.target.value);
    setToDate(e.target.value);
    setDate({
      from: date.from,
      to: newToDate,
    });
  };

  const handleQuickSelect = (days: number) => {
    const today = new Date();
    const fromDate = addDays(today, -days);
    setDate({
      from: fromDate,
      to: today,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="from-date" className="text-sm font-medium text-gray-600">
            From
          </label>
          <input
            type="date"
            id="from-date"
            value={fromDate}
            onChange={handleFromDateChange}
            max={toDate}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="to-date" className="text-sm font-medium text-gray-600">
            To
          </label>
          <input
            type="date"
            id="to-date"
            value={toDate}
            onChange={handleToDateChange}
            min={fromDate}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleQuickSelect(7)}
          className="text-sm text-gray-600 hover:text-pink-600"
        >
          Last 7 days
        </button>
        <button
          onClick={() => handleQuickSelect(30)}
          className="text-sm text-gray-600 hover:text-pink-600"
        >
          Last 30 days
        </button>
        <button
          onClick={() => handleQuickSelect(90)}
          className="text-sm text-gray-600 hover:text-pink-600"
        >
          Last 90 days
        </button>
      </div>
    </div>
  );
};

export default DatePickerWithRange;
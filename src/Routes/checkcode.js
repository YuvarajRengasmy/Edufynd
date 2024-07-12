import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  const handleYearChange = year => {
    setSelectedYear(year);
  };

  return (
    <div>
      <DatePicker
        selected={selectedYear}
        onChange={handleYearChange}
        showYearPicker
        dateFormat="yyyy"
        dropdownMode="select"
        renderCustomHeader={({ date }) => (
          <div>
            <select
              value={date.getFullYear()}
              onChange={e => handleYearChange(parseInt(e.target.value, 10))}
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default DatePickerComponent;

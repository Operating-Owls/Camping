import React, { useState, useEffect } from 'react';
import './Calendar.css';
// import dotenv from 'dotenv';

// dotenv.config();

// Utility functions to get date information
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [flash, setFlash] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const handlePreviousMonth = () => {
    if (month > today.getMonth() || year > today.getFullYear()) {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const selected = new Date(year, month, day);
    if (selected < today) {
      setFlash(day);
      setTimeout(() => setFlash(null), 300); // Reduce the duration to 300ms
    } else {
      if (!selectedDate || selected.getTime() !== selectedDate.getTime()) {
        setSelectedDate(selected);
        console.log(`Selected Date: ${selected.toLocaleDateString()}`);  // Log the selected date to the console only if it changes
      }
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const isSelected = selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
      const isFlash = flash === day;

      days.push(
        <div
          key={day}
          className={`calendar-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}${isFlash ? ' flash' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };


  // MY CODE

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const fetchWeather = async (zip) => {
    const apiKey = process.env.REACT_APP_API_KEY || "35410084ec3a4008a3a01332241607";
    console.log('API Key:', apiKey);  // Log the API key for debugging
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${zip}&days=7`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const forecast = data.forecast.forecastday;  // Extract the forecast data
      setWeatherData(forecast);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const getWeatherForSelectedDate = () => {
    if (!selectedDate || !weatherData) return { condition: { text: 'NA' }, avgtemp_f: 'NA' };
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const forecastForSelectedDate = weatherData.find(day => day.date === selectedDateString);
    return forecastForSelectedDate ? forecastForSelectedDate.day : { condition: { text: 'NA' }, avgtemp_f: 'NA' };
  };

  useEffect(() => {
    if (selectedDate && zipCode) {
      fetchWeather(zipCode);
    }
  }, [selectedDate, zipCode]);

  useEffect(() => {
    if (zipCode) {
      fetchWeather(zipCode);
    }
  }, [zipCode]);

  const weatherForSelectedDate = getWeatherForSelectedDate();

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePreviousMonth} disabled={month <= today.getMonth() && year <= today.getFullYear()}>
            Previous
          </button>
          <span>{currentDate.toLocaleString('default', { month: 'long' })} {year}</span>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-day-name">{day}</div>
          ))}
          {renderDays()}
        </div>
      </div>
      <div className="weather-info">
        <h2>Weather Information</h2>
        <input 
          type="text" 
          value={zipCode} 
          onChange={(e) => setZipCode(e.target.value)} 
          placeholder="Enter Zip Code" 
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {selectedDate && (
          <div>
            <h3>Weather Forecast for {selectedDate.toLocaleDateString()}</h3>
            <p>Condition: {weatherForSelectedDate.condition.text}</p>
            <p>Temperature: {weatherForSelectedDate.avgtemp_f}°F</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

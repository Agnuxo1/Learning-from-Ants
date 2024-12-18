import React from 'react';

function LunarClock({ time }) {
  const lunarDay = Math.floor(time.getTime() / (24 * 60 * 60 * 1000)) % 29; // Lunar day (0-28)
  const lunarHour = time.getHours();
  const lunarMinute = time.getMinutes();

  return (
    <div className="lunar-clock">
      <h3>Lunar Time</h3>
      <div className="clock-display">
        <span>Day: {lunarDay + 1}</span>
        <span>Time: {lunarHour.toString().padStart(2, '0')}:{lunarMinute.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}

export default LunarClock;


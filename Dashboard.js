import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from "@/components/ui/slider"

function Dashboard({ data, updateSimulation, isDarkMode }) {
  const chartData = [
    { name: '0h', ...data },
    { name: '4h', ...data, food: data.food * 1.1, proteins: data.proteins * 1.05, heat: data.heat + 1 },
    { name: '8h', ...data, food: data.food * 1.2, proteins: data.proteins * 1.1, heat: data.heat + 2 },
    { name: '12h', ...data, food: data.food * 1.3, proteins: data.proteins * 1.15, heat: data.heat + 3 },
    { name: '16h', ...data, food: data.food * 1.4, proteins: data.proteins * 1.2, heat: data.heat + 4 },
    { name: '20h', ...data, food: data.food * 1.5, proteins: data.proteins * 1.25, heat: data.heat + 5 },
    { name: '24h', ...data, food: data.food * 1.6, proteins: data.proteins * 1.3, heat: data.heat + 6 },
  ];

  const handleSliderChange = (key, value) => {
    updateSimulation({ [key]: value[0] });
  };

  const darkModeColors = {
    background: '#2a2a2a',
    text: '#ffffff',
    grid: '#555555',
  };

  const lightModeColors = {
    background: '#ffffff',
    text: '#000000',
    grid: '#cccccc',
  };

  const colors = isDarkMode ? darkModeColors : lightModeColors;

  return (
    <div className="dashboard" style={{ backgroundColor: colors.background, color: colors.text }}>
      <h2>Bio-inspired Recycling Simulator for Lunar Bases</h2>
      <div className="stats-container">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="stat" style={{ backgroundColor: colors.background, color: colors.text }}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <span>{value.toFixed(2)} {key === 'temperature' ? '°C' : key === 'sunlightHours' ? 'hours' : ''}</span>
            {['organicWaste', 'nonOrganicWaste', 'food', 'proteins', 'methane', 'bioethanol', 'biodiesel', 'co2', 'oxygen'].includes(key) && (
              <Slider
                defaultValue={[value]}
                max={1000}
                step={10}
                onValueChange={(val) => handleSliderChange(key, val)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="chart-container" style={{ width: '100%', height: 300, backgroundColor: colors.background }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="name" stroke={colors.text} />
            <YAxis stroke={colors.text} />
            <Tooltip 
              contentStyle={{ backgroundColor: colors.background, color: colors.text, border: `1px solid ${colors.grid}` }}
              itemStyle={{ color: colors.text }}
              labelStyle={{ color: colors.text }}
            />
            <Legend wrapperStyle={{ color: colors.text }} />
            <Line type="monotone" dataKey="food" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="proteins" stroke="#82ca9d" />
            <Line type="monotone" dataKey="heat" stroke="#ff7300" />
            <Line type="monotone" dataKey="energy" stroke="#ffc658" />
            <Line type="monotone" dataKey="co2" stroke="#ff5733" />
            <Line type="monotone" dataKey="oxygen" stroke="#33ff57" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;


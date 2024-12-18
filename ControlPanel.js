import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

function ControlPanel({ 
  updateSimulation, 
  toggleDarkMode, 
  isDarkMode, 
  toggleAISimulation, 
  isAISimulating,
  astronauts,
  onAstronautsChange
}) {
  const [microorganismActivity, setMicroorganismActivity] = useState(0.8);
  const [recyclingEfficiency, setRecyclingEfficiency] = useState(0.7);
  const [bioreactorTemperature, setBioreactorTemperature] = useState(25);

  const handleMicroorganismActivityChange = useCallback((value) => {
    const newActivity = value[0];
    setMicroorganismActivity(newActivity);
    updateSimulation({
      food: 50 * newActivity,
      proteins: 25 * newActivity,
      heat: 20 + (10 * newActivity),
      methane: 30 * newActivity,
      bioethanol: 20 * newActivity,
      biodiesel: 15 * newActivity,
    });
  }, [updateSimulation]);

  const handleRecyclingEfficiencyChange = useCallback((value) => {
    const newEfficiency = value[0];
    setRecyclingEfficiency(newEfficiency);
    updateSimulation({
      rawMaterials: 500 * newEfficiency,
      energy: 1000 * newEfficiency,
    });
  }, [updateSimulation]);

  const handleBioreactorTemperatureChange = useCallback((value) => {
    const newTemperature = value[0];
    setBioreactorTemperature(newTemperature);
    updateSimulation({
      heat: newTemperature,
      energy: 1000 - (newTemperature - 25) * 10,
    });
  }, [updateSimulation]);

  const handleAstronautsChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onAstronautsChange(value);
    }
  }, [onAstronautsChange]);

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <div className="control">
        <label>Microorganism Activity:</label>
        <Slider
          defaultValue={[microorganismActivity]}
          max={1}
          step={0.05}
          onValueChange={handleMicroorganismActivityChange}
        />
        <span>{(microorganismActivity * 100).toFixed(0)}%</span>
      </div>
      <div className="control">
        <label>Recycling Efficiency:</label>
        <Slider
          defaultValue={[recyclingEfficiency]}
          max={1}
          step={0.05}
          onValueChange={handleRecyclingEfficiencyChange}
        />
        <span>{(recyclingEfficiency * 100).toFixed(0)}%</span>
      </div>
      <div className="control">
        <label>Bioreactor Temperature:</label>
        <Slider
          defaultValue={[bioreactorTemperature]}
          min={0}
          max={50}
          step={1}
          onValueChange={handleBioreactorTemperatureChange}
        />
        <span>{bioreactorTemperature}°C</span>
      </div>
      <div className="control">
        <label>Dark Mode:</label>
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
        />
      </div>
      <div className="control">
        <Button onClick={toggleAISimulation}>
          {isAISimulating ? 'Stop AI Simulation' : 'Start AI Simulation'}
        </Button>
      </div>
      <div className="control">
        <label>Number of Astronauts:</label>
        <Input
          type="number"
          value={astronauts}
          onChange={handleAstronautsChange}
          min={0}
        />
      </div>
    </div>
  );
}

export default ControlPanel;


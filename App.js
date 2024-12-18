import React, { useState, useCallback, useMemo, useEffect } from 'react';
import LunarBase from './components/LunarBase';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import ReportPanel from './components/ReportPanel';
import LocationSelector from './components/LocationSelector';
import LunarClock from './components/LunarClock';
import './styles.css';

const lunarLocations = [
  { name: "Cabeus B Peak", avgTemp: -173, maxSunlightHours: 10 },
  { name: "Haworth", avgTemp: -178, maxSunlightHours: 12 },
  { name: "Malapert Massif", avgTemp: -170, maxSunlightHours: 14 },
  { name: "Nobile Ridge 1", avgTemp: -175, maxSunlightHours: 11 },
  { name: "Nobile Ridge 2", avgTemp: -176, maxSunlightHours: 11.5 },
  { name: "Gerlache Rim 2", avgTemp: -177, maxSunlightHours: 13 },
  { name: "Slater Plain", avgTemp: -172, maxSunlightHours: 12.5 },
];

function App() {
  const [simulationData, setSimulationData] = useState({
    organicWaste: 1000,
    nonOrganicWaste: 500,
    food: 500,
    proteins: 250,
    heat: 20,
    methane: 100,
    bioethanol: 100,
    biodiesel: 100,
    rawMaterials: 1000,
    energy: 1000,
    temperature: -20,
    sunlightHours: 14,
    co2: 100,
    oxygen: 1000,
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(lunarLocations[0]);
  const [lunarTime, setLunarTime] = useState(new Date());
  const [isAISimulating, setIsAISimulating] = useState(false);
  const [astronauts, setAstronauts] = useState(4);

  const updateSimulation = useCallback((newData) => {
    setSimulationData(prevData => ({
      ...prevData,
      ...newData,
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const handleLocationChange = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const toggleAISimulation = useCallback(() => {
    setIsAISimulating(prev => !prev);
  }, []);

  const handleAstronautsChange = useCallback((value) => {
    setAstronauts(value);
  }, []);

  const derivedSimulationData = useMemo(() => {
    const tempVariation = Math.sin((lunarTime.getHours() / 24) * Math.PI * 2) * 10;
    const currentTemp = selectedLocation.avgTemp + tempVariation;
    const currentSunlightHours = Math.max(0, Math.sin((lunarTime.getHours() / 24) * Math.PI * 2) * selectedLocation.maxSunlightHours);

    // Calculate values based on number of astronauts
    const organicWastePerAstronaut = 1.5; // kg per day
    const nonOrganicWastePerAstronaut = 1; // kg per day
    const foodConsumptionPerAstronaut = 2; // kg per day
    const energyConsumptionPerAstronaut = 10; // kWh per day
    const co2ProductionPerAstronaut = 1; // kg per day
    const oxygenConsumptionPerAstronaut = 0.84; // kg per day

    return {
      ...simulationData,
      temperature: currentTemp,
      sunlightHours: currentSunlightHours,
      organicWaste: simulationData.organicWaste + (organicWastePerAstronaut * astronauts),
      nonOrganicWaste: simulationData.nonOrganicWaste + (nonOrganicWastePerAstronaut * astronauts),
      food: Math.max(0, simulationData.food - (foodConsumptionPerAstronaut * astronauts)),
      energy: Math.max(0, simulationData.energy - (energyConsumptionPerAstronaut * astronauts)),
      co2: simulationData.co2 + (co2ProductionPerAstronaut * astronauts),
      oxygen: Math.max(0, simulationData.oxygen - (oxygenConsumptionPerAstronaut * astronauts)),
    };
  }, [simulationData, selectedLocation, lunarTime, astronauts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLunarTime(prevTime => {
        const newTime = new Date(prevTime.getTime() + 1000 * 60);
        return newTime;
      });

      if (isAISimulating) {
        // Intelligent AI simulation logic
        const aiSimulation = (currentData) => {
          const targetTemp = 20; // Comfortable temperature in Celsius
          const minFood = astronauts * 3; // Minimum 3kg of food per astronaut
          const minOxygen = astronauts * 0.84 * 2; // Minimum 2 days worth of oxygen
          const minEnergy = astronauts * 10 * 2; // Minimum 2 days worth of energy

          let newData = { ...currentData };

          // Temperature control
          if (newData.temperature < targetTemp) {
            newData.heat = Math.min(newData.heat + 1, 30);
            newData.energy -= 5;
          } else if (newData.temperature > targetTemp) {
            newData.heat = Math.max(newData.heat - 1, 10);
            newData.energy -= 5;
          }

          // Food production
          if (newData.food < minFood) {
            const foodProduced = Math.min(10, newData.organicWaste * 0.2);
            newData.food += foodProduced;
            newData.organicWaste -= foodProduced * 2;
            newData.energy -= 2;
          }

          // Protein production
          if (newData.proteins < minFood / 2) {
            const proteinsProduced = Math.min(5, newData.organicWaste * 0.1);
            newData.proteins += proteinsProduced;
            newData.organicWaste -= proteinsProduced * 2;
            newData.energy -= 1;
          }

          // Oxygen production
          if (newData.oxygen < minOxygen) {
            const oxygenProduced = Math.min(10, newData.co2 * 0.5);
            newData.oxygen += oxygenProduced;
            newData.co2 -= oxygenProduced;
            newData.energy -= 3;
          }

          // Energy production
          if (newData.energy < minEnergy) {
            const solarEnergy = newData.sunlightHours * 10;
            const biofuelEnergy = (newData.methane + newData.bioethanol + newData.biodiesel) * 0.1;
            newData.energy += solarEnergy + biofuelEnergy;
            newData.methane = Math.max(0, newData.methane - 1);
            newData.bioethanol = Math.max(0, newData.bioethanol - 1);
            newData.biodiesel = Math.max(0, newData.biodiesel - 1);
          }

          // Waste recycling
          const recycledOrganicWaste = newData.organicWaste * 0.1;
          newData.organicWaste -= recycledOrganicWaste;
          newData.methane += recycledOrganicWaste * 0.3;
          newData.bioethanol += recycledOrganicWaste * 0.2;
          newData.biodiesel += recycledOrganicWaste * 0.1;

          const recycledNonOrganicWaste = newData.nonOrganicWaste * 0.1;
          newData.nonOrganicWaste -= recycledNonOrganicWaste;
          newData.rawMaterials += recycledNonOrganicWaste;

          // Ensure no negative values
          Object.keys(newData).forEach(key => {
            newData[key] = Math.max(0, newData[key]);
          });

          return newData;
        };

        updateSimulation(aiSimulation(derivedSimulationData));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAISimulating, updateSimulation, derivedSimulationData, astronauts]);

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="main-content">
        <div className="canvas-container">
          <LunarBase location={selectedLocation} />
        </div>
        <Dashboard 
          data={derivedSimulationData} 
          updateSimulation={updateSimulation}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className="side-panel">
        <LunarClock time={lunarTime} />
        <LocationSelector 
          locations={lunarLocations}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
        />
        <ControlPanel 
          updateSimulation={updateSimulation} 
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          toggleAISimulation={toggleAISimulation}
          isAISimulating={isAISimulating}
          astronauts={astronauts}
          onAstronautsChange={handleAstronautsChange}
        />
        <ReportPanel data={derivedSimulationData} />
      </div>
    </div>
  );
}

export default App;


import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function LocationSelector({ locations, selectedLocation, onLocationChange }) {
  return (
    <div className="location-selector">
      <h3>Lunar Location</h3>
      <Select onValueChange={(value) => onLocationChange(locations.find(loc => loc.name === value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.name} value={location.name}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="location-info">
        <p>Average Temperature: {selectedLocation.avgTemp}°C</p>
        <p>Max Sunlight Hours: {selectedLocation.maxSunlightHours} hours</p>
      </div>
    </div>
  );
}

export default LocationSelector;


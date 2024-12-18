import React from 'react';

function ReportPanel({ data }) {
  const bioconversionEfficiency = ((data.food + data.proteins) / data.organicWaste) * 100;
  const recyclingEfficiency = (data.rawMaterials / data.nonOrganicWaste) * 100;
  const energyBalance = data.energy - (data.heat * 10); // Assuming heat generation consumes energy

  return (
    <div className="report-panel">
      <h2>Simulation Report</h2>
      <table>
        <tbody>
          <tr>
            <td>Total Processed Waste:</td>
            <td>{(data.organicWaste + data.nonOrganicWaste).toFixed(2)} kg</td>
          </tr>
          <tr>
            <td>Food Resources Produced:</td>
            <td>{(data.food + data.proteins).toFixed(2)} kg</td>
          </tr>
          <tr>
            <td>Biofuels Generated:</td>
            <td>{(data.methane + data.bioethanol + data.biodiesel).toFixed(2)} units</td>
          </tr>
          <tr>
            <td>Bioconversion Efficiency:</td>
            <td>{bioconversionEfficiency.toFixed(2)}%</td>
          </tr>
          <tr>
            <td>Recycling Efficiency:</td>
            <td>{recyclingEfficiency.toFixed(2)}%</td>
          </tr>
          <tr>
            <td>Energy Balance:</td>
            <td>{energyBalance.toFixed(2)} kWh</td>
          </tr>
          <tr>
            <td>System Temperature:</td>
            <td>{data.heat.toFixed(2)} °C</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportPanel;


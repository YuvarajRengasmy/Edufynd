// DynamicChart.js
import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import globalChartConfig from './chartSettings';  // Adjust path if necessary

Chart.register(...registerables);

const DynamicChart = ({ chartType }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);  // Add a ref to store the Chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    if (globalChartConfig[chartType]) {
      chartInstance.current = new Chart(ctx, {
        type: globalChartConfig[chartType].type,
        data: globalChartConfig[chartType].data,
        options: globalChartConfig[chartType].options
      });
    } else {
      console.error(`Chart type ${chartType} is not configured.`);
    }

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartType]);

  return <canvas ref={chartRef} width="200" height="100"></canvas>;
};

export default DynamicChart;

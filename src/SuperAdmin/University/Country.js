import React, { useRef, useEffect } from 'react';
import { Chart, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // This imports all the chart types

const PieChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['India', 'USA', 'Canada'], // Country names
    datasets: [
      {
        data: [100, 200, 150], // Corresponding values
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || '';
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '17rem', height: '17rem' }}>
      <Pie style={{ position: 'relative', width: '8rem', height: '8rem' }}  ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default PieChart;

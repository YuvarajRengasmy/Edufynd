import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Necessary for chart.js to work properly

const App = () => {
  // Sample university data
  const universities = [
    'Harvard University', 'Stanford University', 'MIT',
    'Oxford University', 'Cambridge University',
    'Yale University', 'Princeton University',
    'Caltech', 'University of Chicago', 'Columbia University'
  ];

  // Count of universities (example: 1 each in this case)
  const universityCount = universities.map((uni) => 1);

  // Data for the chart
  const data = {
    labels: universities, // X-axis labels (university names)
    datasets: [
      {
        label: 'University Count', // Chart label
        data: universityCount, // Data for the bar heights
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '70%', margin: 'auto', paddingTop: '50px' }}>
      <h2>University Count Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default App;

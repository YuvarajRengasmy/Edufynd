import React, { useState } from 'react';
import DynamicChart from './DynamicChart';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import Sidebar from '../../../../compoents/sidebar';

const initialCharts = [
  { id: uuidv4(), type: 'bar' },
  { id: uuidv4(), type: 'line' }
];

const ChartManager = () => {
  const [charts, setCharts] = useState(initialCharts);

  const addChart = () => {
    setCharts([...charts, { id: uuidv4(), type: 'bar' }]);
  };

  const editChart = (id, newType) => {
    setCharts(charts.map(chart => (chart.id === id ? { ...chart, type: newType } : chart)));
  };

  const deleteChart = (id) => {
    setCharts(charts.filter(chart => chart.id !== id));
  };

  return (
    <div>
        <Sidebar/>
<div className='content-wrapper'>
    <div className='container'>
        <div className='row'>
            <div className='col-5'>
            <button className='btn btn-danger' onClick={addChart}>Add Chart</button>
      {charts.map(chart => (
        <div key={chart.id}>
          <DynamicChart chartType={chart.type} />
          <button  onClick={() => editChart(chart.id, 'line')} className='btn btn-danger'>Change to Line Chart</button>
          <button onClick={() => deleteChart(chart.id)} className='btn btn-danger'>Delete Chart</button>
        </div>
      ))}
            </div>
        </div>
    </div>

</div>
     
    </div>
  );
};

export default ChartManager;

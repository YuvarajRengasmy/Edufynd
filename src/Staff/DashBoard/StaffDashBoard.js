import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { FaBell } from 'react-icons/fa6';
import Sidebar from '../../compoents/StaffSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StaffDashBoard = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Number of Enquiries',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Program A', 'Program B', 'Program C', 'Program D'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [200, 300, 150, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const pieChartData = {
    labels: ['Email', 'Phone', 'Website', 'Walk-in'],
    datasets: [
      {
        label: 'Types of Enquiries',
        data: [300, 50, 100, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-xl-8">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary">University Enquiries</h5>
                  <Line data={lineChartData} options={{ responsive: true,  }} height={300} />
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary">Application Distribution</h5>
                  <Line data={barChartData} options={{ responsive: true,  }} height={300} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary">Types of Enquiries</h5>
                  <Line data={pieChartData} options={{ responsive: true,  }} height={300} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary">University Programs</h5>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Number of Enquiries</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Program A</td>
                        <td>USA</td>
                        <td>New York</td>
                        <td>150</td>
                      </tr>
                      <tr>
                        <td>Program B</td>
                        <td>Canada</td>
                        <td>Toronto</td>
                        <td>200</td>
                      </tr>
                      <tr>
                        <td>Program C</td>
                        <td>UK</td>
                        <td>London</td>
                        <td>250</td>
                      </tr>
                      <tr>
                        <td>Program D</td>
                        <td>Australia</td>
                        <td>Sydney</td>
                        <td>180</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDashBoard;

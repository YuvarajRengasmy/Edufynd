import React, { useEffect, useState, useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { Bar, Pie, Line, Radar, Doughnut, PolarArea } from 'react-chartjs-2';
import Sidebar from '../../compoents/StudentSidebar';
import { Link } from "react-router-dom";
import { clearStorage } from "../../Utils/storage";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For dropdown to work

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale);

export const StudentDashBoard = () => {

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications Submitted',
        data: [30, 45, 40, 55, 60, 70],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const pieData = {
    labels: ['USA', 'UK', 'Canada', 'Australia', 'Germany'],
    datasets: [
      {
        label: 'Students by Country',
        data: [50, 20, 15, 10, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'],
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Active Students',
        data: [15, 20, 25, 30],
        borderColor: '#742774',
        backgroundColor: 'rgba(115, 103, 240, 0.2)',
        fill: true,
      },
    ],
  };

  const radarData = {
    labels: ['Communication', 'Teamwork', 'Problem-Solving', 'Technical Skills', 'Leadership'],
    datasets: [
      {
        label: 'Skills Assessment',
        data: [4, 3, 5, 4, 3],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Full-Time', 'Part-Time', 'Online', 'Distance'],
    datasets: [
      {
        label: 'Programs Offered',
        data: [25, 15, 30, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const polarAreaData = {
    labels: ['Engineering', 'Business', 'Arts', 'Science', 'Law'],
    datasets: [
      {
        label: 'Popular Majors',
        data: [120, 90, 70, 80, 60],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#C70039'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.formattedValue}`,
        },
      },
    },
  };

  // State for current date and time
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };


  const logout = () => {
    clearStorage(); // Assuming clearStorage is defined elsewhere
    toast.success("You have been logged out successfully.");
    navigate("/");
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  const DateTimeDisplay = React.memo(({ date }) => (
    <div>
      <p>{formatDate(date)}, {formatTime(date)}</p>
    </div>
  ));

  return (
    <>
      <Sidebar />
      <div className="content-wrapper"  style={{fontSize:'12px'}}>
        <div className='content-header bg-light sticky-top shadow-sm mb-0 pb-0'>
          <div className='container-fluid mb-0 pb-0'>
          <div className="row align-items-center">
    
      <div className="col">
        <h6 className="h6">Dashboard</h6>
        <p className="text-secondary mb-0">
          <DateTimeDisplay date={currentDate} />
        </p>
      </div>

     
      <div className="col-auto">
        <div className="dropdown">
          <a
            className="nav-link d-flex align-items-center"
            href="#"
            id="profileDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            
            <img
              src="https://via.placeholder.com/30"
              alt="Profile"
              style={{
                objectFit: "cover",
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
              }}
              className="img-fluid rounded-circle me-2"
            />
          </a>

         
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
            <li>
              <Link className="dropdown-item" to="/StaffProfile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/" onClick={logout}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

          </div>
        </div>
        
        <div className='container-fluid mt-4'>
          <div className='row'>
            <div className="col-lg-12">

              <div className="row">
                {/* Applications Submitted */}
                <section className="col-md-4">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Applications Submitted</div>
                    <div className="card-body">
                      <div style={{ height: '200px' }}>
                        <Bar data={barData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Students by Country */}
                <section className="col-md-4">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Students by Country</div>
                    <div className="card-body">
                      <div style={{ height: '200px' }}>
                        <Pie data={pieData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Active Students */}
                <section className="col-md-4">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Active Students</div>
                    <div className="card-body">
                      <div style={{ height: '200px' }}>
                        <Line data={lineData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="row">
                {/* Skills Assessment */}
                <section className="col-md-4">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Skills Assessment</div>
                    <div className="card-body">
                      <div style={{ height: '200px' }}>
                        <Radar data={radarData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Programs Offered */}
                <section className="col-md-4">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Programs Offered</div>
                    <div className="card-body">
                      <div style={{ height: '200px' }}>
                        <Doughnut data={doughnutData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Popular Majors (Polar Area) */}
                <section className="col-md-4">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Popular Majors</div>
                    <div className="card-body">
                      <div style={{ height: '200px' }}>
                        <PolarArea data={polarAreaData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="row">
                {/* Enrollment Table */}
                <section className="col-md-6">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Enrollment Table</div>
                    <div className="card-body">
                      <div className="table-responsive">
                      <table className="table text-nowrap table-hover table-striped ">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Program</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>John Doe</td><td>USA</td><td>Engineering</td><td>2024</td></tr>
                          <tr><td>Jane Smith</td><td>UK</td><td>Business</td><td>2023</td></tr>
                          <tr><td>Mike Johnson</td><td>Canada</td><td>Arts</td><td>2025</td></tr>
                          <tr><td>Emily Davis</td><td>Australia</td><td>Science</td><td>2022</td></tr>
                        </tbody>
                      </table>
                      </div>
                    
                    </div>
                  </div>
                </section>

                {/* Application Status Table */}
                <section className="col-md-6">
                  <div className="card border-0 rounded shadow-sm p-3">
                    <div className="text-center fw-bolder">Application Status</div>
                    <div className="card-body">
                      <div className="table-responsive">
   <table className="table text-nowrap  table-hover table-striped">
                        <thead>
                          <tr>
                            <th>Application ID</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>AP001</td><td>Processing</td><td>2024-01-15</td></tr>
                          <tr><td>AP002</td><td>Approved</td><td>2024-02-10</td></tr>
                          <tr><td>AP003</td><td>Rejected</td><td>2024-03-05</td></tr>
                          <tr><td>AP004</td><td>Completed</td><td>2024-04-20</td></tr>
                        </tbody>
                      </table>
                      </div>
                   
                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentDashBoard
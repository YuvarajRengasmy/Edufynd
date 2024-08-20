import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line, Pie } from "react-chartjs-2"; //
import Sidebar from "../../compoents/sidebar";
import 'chart.js/auto';
import {
  FaTrash,FaListAlt, FaChartBar,FaUser, FaFileAlt, FaSuitcase, FaRegChartBar, FaCalendarAlt, FaChalkboardTeacher, FaClipboardList, FaLaptopCode, FaCommentsDollar, FaFileInvoice, FaBuilding, FaShieldAlt, FaGlobe, FaCogs, FaTrophy, FaEnvelopeOpenText, FaExclamationCircle,
  FaMoneyBillWave, FaCheckCircle, FaComments, FaEnvelope, FaPhone, FaDollarSign, FaUserAlt, FaEdit, FaCog, FaSignOutAlt, FaChartPie, FaUniversity, FaUsers, FaFileInvoiceDollar, FaProjectDiagram, FaBell, FaChartLine,FaUserCog,FaBullhorn
} from "react-icons/fa";

export const HeroContent = () => {

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        fill: false,
        backgroundColor: '#231f20',
        borderColor: '#231f20',
      },
    ],
  };

  const clientGrowthData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Clients',
        data: [20, 45, 28, 80, 99, 43],
        fill: false,
        backgroundColor: '#231f20',
        borderColor: '#231f20',
      },
    ],
  };
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Client Growth",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55]
      }
    ]
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Finance Overview",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#FF6384",
        pointBackgroundColor: "#FF6384",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FF6384",
        pointHoverBorderColor: "#FF6384",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55]
      }
    ]
  };

  return (
    <div >
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
        <div className="container  " >
          <div className="row">
            <div className="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div className="container ">
  <div className="d-flex justify-content-between align-items-center ">
    <div>
      <h1 className="fw-bold mb-1" style={{ color: '#0056b3', fontSize: '24px' }}>Dashboard</h1>
      <p className="text-secondary" style={{ fontSize: '12px' }}>Sunday, 05 August 2024</p>
    </div>
    <button
      className="btn"
      style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasProfile"
      aria-controls="offcanvasProfile"
    >
      Profile
    </button>
  </div>

  <div
    className="offcanvas offcanvas-end"
    tabIndex="-1"
    id="offcanvasProfile"
    aria-labelledby="offcanvasProfileLabel"
  >
    <div className="offcanvas-header" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '14px' }}>
      <h5 className="offcanvas-title" id="offcanvasProfileLabel">
        <FaUser /> John Doe's Profile
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div className="offcanvas-body" style={{ fontSize: '12px' }}>
      {/* Profile Information */}
      <div className="text-center ">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="rounded-circle mb-3"
        />
        <h5 style={{ color: '#0056b3', fontSize: '16px' }}>John Doe</h5>
        <p className="text-muted" style={{ fontSize: '12px' }}>Senior CRM Manager</p>
        <p className="mb-1" style={{ color: '#007bff', fontSize: '12px' }}><FaEnvelope /> john.doe@example.com</p>
        <p style={{ color: '#007bff', fontSize: '12px' }}><FaPhone /> +123 456 7890</p>
        <div className="d-flex justify-content-around mt-3">
          <button className="btn btn-outline-primary" style={{ fontSize: '12px' }}><FaEdit /> Edit</button>
          <button className="btn btn-outline-secondary" style={{ fontSize: '12px' }}><FaCog /> Settings</button>
          <button className="btn btn-outline-danger" style={{ fontSize: '12px' }}><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-pills nav-justified  fs-9 " style={{ fontSize: '10px' }}>
        <li className="nav-item">
          <a className="nav-link active" href="#dashboard" data-bs-toggle="tab" style={{ backgroundColor: '#e9ecef' }}><FaChartPie /> Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#clients" data-bs-toggle="tab"><FaUsers /> Clients</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#commissions" data-bs-toggle="tab"><FaFileInvoiceDollar /> Commissions</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#projects" data-bs-toggle="tab"><FaProjectDiagram /> Projects</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#hrms" data-bs-toggle="tab"><FaSuitcase /> HRMS</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#finance" data-bs-toggle="tab"><FaDollarSign /> Finance</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#marketing" data-bs-toggle="tab"><FaGlobe /> Marketing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#reports" data-bs-toggle="tab"><FaRegChartBar /> Reports</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#settings" data-bs-toggle="tab"><FaCogs /> Settings</a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="dashboard">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Dashboard Overview</h6>
          <div className="row g-3">
            <div className="col-6">
              <div className="card text-center" style={{ borderColor: '#007bff', fontSize: '12px' }}>
                <div className="card-body">
                  <FaChartLine size={30} className="mb-2" style={{ color: '#007bff' }} />
                  <h6>Performance</h6>
                  <p className="text-muted small">80% Achieved</p>
                  <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card text-center" style={{ borderColor: '#28a745', fontSize: '12px' }}>
                <div className="card-body">
                  <FaComments size={30} className="mb-2" style={{ color: '#28a745' }} />
                  <h6>Feedback</h6>
                  <p className="text-muted small">23 New Comments</p>
                  <span className="badge bg-primary"><FaCheckCircle /> Resolved</span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card" style={{ fontSize: '12px' }}>
                <div className="card-body">
                  <FaBell size={30} className="mb-2" style={{ color: '#dc3545' }} />
                  <h6 style={{ color: '#0056b3', fontSize: '14px' }}>Notifications</h6>
                  <p className="text-muted small">5 New Alerts</p>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                      Meeting with Client X
                      <span className="badge bg-warning rounded-pill">1 hr</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                      Payment Due: Invoice #1234
                      <span className="badge bg-danger rounded-pill">2 days</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                      Project Deadline: Y
                      <span className="badge bg-primary rounded-pill">5 days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Tab */}
        <div className="tab-pane fade" id="clients">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Clients Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaUsers /> Active Clients
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                  Client A
                  <span className="badge bg-success rounded-pill">Active</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                  Client B
                  <span className="badge bg-warning rounded-pill">Pending</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                  Client C
                  <span className="badge bg-danger rounded-pill">Inactive</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commissions Tab */}
        <div className="tab-pane fade" id="commissions">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Commissions Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaFileInvoiceDollar /> Recent Commissions
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Client</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">001</th>
                    <td>Client A</td>
                    <td>$500</td>
                    <td>01 Aug 2024</td>
                    <td><span className="badge bg-success" style={{ fontSize: '12px' }}>Completed</span></td>
                  </tr>
                  <tr>
                    <th scope="row">002</th>
                    <td>Client B</td>
                    <td>$300</td>
                    <td>02 Aug 2024</td>
                    <td><span className="badge bg-warning" style={{ fontSize: '12px' }}>Pending</span></td>
                  </tr>
                  <tr>
                    <th scope="row">003</th>
                    <td>Client C</td>
                    <td>$450</td>
                    <td>03 Aug 2024</td>
                    <td><span className="badge bg-danger" style={{ fontSize: '12px' }}>Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Projects Tab */}
        <div className="tab-pane fade" id="projects">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Projects Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaProjectDiagram /> Current Projects
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-3" style={{ borderColor: '#007bff', fontSize: '12px' }}>
                    <div className="card-body">
                      <h6 className="" style={{ color: '#0056b3', fontSize: '14px' }}>Project A</h6>
                      <p className="card-text text-muted">Details about Project A...</p>
                      <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>View Details</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3" style={{ borderColor: '#007bff', fontSize: '12px' }}>
                    <div className="card-body">
                      <h6 className="" style={{ color: '#0056b3', fontSize: '14px' }}>Project B</h6>
                      <p className="card-text text-muted">Details about Project B...</p>
                      <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HRMS Tab */}
        <div className="tab-pane fade" id="hrms">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>HRMS Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaSuitcase /> HRMS Dashboard
            </div>
            <div className="card-body">
              <p className="text-muted">Manage Staff, Attendance, Payroll, and more.</p>
              <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>Go to HRMS</a>
            </div>
          </div>
        </div>

        {/* Finance Tab */}
        <div className="tab-pane fade" id="finance">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Finance Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaDollarSign /> Finance Dashboard
            </div>
            <div className="card-body">
              <p className="text-muted">Track income, expenses, and financial reports.</p>
              <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>Go to Finance</a>
            </div>
          </div>
        </div>

        {/* Marketing Tab */}
        <div className="tab-pane fade" id="marketing">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Marketing Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaGlobe /> Marketing Dashboard
            </div>
            <div className="card-body">
              <p className="text-muted">Manage campaigns, promotions, and events.</p>
              <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>Go to Marketing</a>
            </div>
          </div>
        </div>

        {/* Reports Tab */}
        <div className="tab-pane fade" id="reports">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Reports Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaRegChartBar /> Reports Dashboard
            </div>
            <div className="card-body">
              <p className="text-muted">View and generate various reports.</p>
              <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>Go to Reports</a>
            </div>
          </div>
        </div>

        {/* Settings Tab */}
        <div className="tab-pane fade" id="settings">
          <h6 className="fw-bold" style={{ color: '#0056b3', fontSize: '14px' }}>Settings Overview</h6>
          <div className="card" style={{ fontSize: '12px' }}>
            <div className="card-header" style={{ backgroundColor: '#e9ecef' }}>
              <FaCogs /> Settings Dashboard
            </div>
            <div className="card-body">
              <p className="text-muted">Manage global and module-specific settings.</p>
              <a href="#" className="btn" style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '12px' }}>Go to Settings</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





              {/* Top Cards Row */}
              <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-primary">
            <div className="card-body">
              <h6><FaUserAlt /> Total Clients & Students</h6>
              <p className="card-text">Clients: 1,200 | Students: 500</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-secondary">
            <div className="card-body">
              <h6><FaUniversity /> Total Universities & Agents</h6>
              <p className="card-text">Universities: 150 | Agents: 75</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-success">
            <div className="card-body">
              <h6><FaChartLine /> Total Commissions & Sales</h6>
              <p className="card-text">Commissions: $50,000 | Sales: $75,000</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-warning">
            <div className="card-body">
              <h6><FaDollarSign /> Finance & Expenses</h6>
              <p className="card-text">Income: $100,000 | Expenses: $20,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-info">
            <div className="card-body">
              <h6><FaFileInvoiceDollar /> Applications & Invoices</h6>
              <p className="card-text">Applications: 120 | Invoices: $12,000</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-dark">
            <div className="card-body">
              <h6><FaUserCog /> HRMS & Payroll</h6>
              <p className="card-text">Staff: 150 | Payroll: $30,000</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-danger">
            <div className="card-body">
              <h6><FaBullhorn /> Marketing & Promotions</h6>
              <p className="card-text">Campaigns: 10 | Promotions: 25</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ">
          <div className="card text-white rounded-1 border-0 shadow-sm bg-secondary">
            <div className="card-body">
              <h6><FaCog /> Reports & Settings</h6>
              <p className="card-text">Reports: 5 | Settings: 12</p>
            </div>
          </div>
        </div>
      </div>
    </div>


              {/* Charts Row */}
              <div className="container ">
      <div className="row">
        {/* Sales Overview Card */}
        <div className="col-lg-6 ">
          <div className="card rounded-1 border-0 shadow-sm">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaChartLine className="me-2" /> Sales Overview
            </div>
            <div className="card-body">
              <Line data={salesData} />
            </div>
          </div>
        </div>

        {/* Client Growth Card */}
        <div className="col-lg-6 ">
          <div className="card rounded-1 border-0 shadow-sm">
            <div className="card-header bg-success text-white d-flex align-items-center">
              <FaUserAlt className="me-2" /> Client Growth
            </div>
            <div className="card-body">
              <Line data={clientGrowthData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Client Growth Bar Chart Card */}
        <div className="col-md-6 ">
          <div className="card rounded-1 border-0 shadow-sm">
            <div className="card-header bg-warning text-white d-flex align-items-center">
              <FaChartBar className="me-2" /> Client Growth (Bar)
            </div>
            <div className="card-body">
              <Bar data={barData} />
            </div>
          </div>
        </div>

        {/* Finance Overview Card */}
        <div className="col-md-6 ">
          <div className="card rounded-1 border-0 shadow-sm">
            <div className="card-header bg-info text-white d-flex align-items-center">
              <FaMoneyBillWave className="me-2" /> Finance Overview
            </div>
            <div className="card-body">
              <Line data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </div>

              {/* Table Row */}
              <div className="container ">
      <div className="row">
        {/* Recent Transactions Card */}
        <div className="col-lg-12 ">
          <div className="card  rounded-1 border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#4a90e2', color: '#fff' }}>
              <FaListAlt className="me-2" /> Recent Transactions
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{ backgroundColor: '#f0f2f5' }}>
                    <tr>
                      <th>
                      
                      </th>
                      <th>#</th>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>1</td>
                      <td>2024-08-15</td>
                      <td>ABC Corp</td>
                      <td>$5,000</td>
                      <td><span className="badge" style={{ backgroundColor: '#7ed321', color: '#fff' }}>Paid</span></td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm me-2">
                          <FaEdit />
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>2</td>
                      <td>2024-08-14</td>
                      <td>XYZ Ltd</td>
                      <td>$3,200</td>
                      <td><span className="badge" style={{ backgroundColor: '#f5a623', color: '#fff' }}>Pending</span></td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm me-2">
                          <FaEdit />
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>3</td>
                      <td>2024-08-13</td>
                      <td>Acme Inc</td>
                      <td>$1,500</td>
                      <td><span className="badge" style={{ backgroundColor: '#d0021b', color: '#fff' }}>Overdue</span></td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm me-2">
                          <FaEdit />
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Applications Card */}
        <div className="col-md-6 ">
          <div className="card rounded-1 border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#7ed321', color: '#fff' }}>
              <FaCalendarAlt className="me-2" /> Recent Applications
            </div>
            <div className="card-body">
              <table className="table">
                <thead style={{ backgroundColor: '#f0f2f5' }}>
                  <tr>
                    <th>#</th>
                    <th>Application ID</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>AP-01</td>
                    <td>John Doe</td>
                    <td>Pending</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-2">
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  {/* More rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Invoices Card */}
        <div className="col-md-6 ">
          <div className="card  rounded-1 border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#f5a623', color: '#fff' }}>
              <FaFileInvoice className="me-2" /> Recent Invoices
            </div>
            <div className="card-body">
              <table className="table">
                <thead style={{ backgroundColor: '#f0f2f5' }}>
                  <tr>
                    <th>#</th>
                    <th>Invoice ID</th>
                    <th>Client</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>INV-01</td>
                    <td>Jane Smith</td>
                    <td>$1,000</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-2">
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  {/* More rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Upcoming Meetings Card */}
        <div className="col-md-6 ">
          <div className="card  rounded-1 border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#4a90e2', color: '#fff' }}>
              <FaCalendarAlt className="me-2" /> Upcoming Meetings
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Meeting with Client A
                  <span className="badge rounded-pill" style={{ backgroundColor: '#4a90e2', color: '#fff' }}>Today</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Team Stand-up
                  <span className="badge rounded-pill" style={{ backgroundColor: '#4a90e2', color: '#fff' }}>Tomorrow</span>
                </li>
                {/* More list items as needed */}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Notifications Card */}
        <div className="col-md-6 ">
          <div className="card  rounded-1 border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#7ed321', color: '#fff' }}>
              <FaBell className="me-2" /> Recent Notifications
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  New application received
                  <span className="badge rounded-pill" style={{ backgroundColor: '#7ed321', color: '#fff' }}>New</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Invoice paid
                  <span className="badge rounded-pill" style={{ backgroundColor: '#7ed321', color: '#fff' }}>Updated</span>
                </li>
                {/* More list items as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  );
};
export default HeroContent;

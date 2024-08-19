import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line, Pie } from "react-chartjs-2"; //
import Sidebar from "../../compoents/sidebar";
import 'chart.js/auto';
import { FaUser, FaEnvelope, FaPhone, FaDollarSign,FaUserAlt,  FaEdit, FaCog, FaSignOutAlt, FaChartPie, FaUniversity, FaUsers, FaFileInvoiceDollar, FaProjectDiagram,  FaBell,  FaChartLine } from "react-icons/fa";

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
      <div className="content-wrapper" style={{  fontFamily: "Plus Jakarta Sans",fontSize: "12px" }}>
      <div className="container-fluid mt-4" >
      <div className="row">
      <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-md-4">
        <div className="d-flex flex-row justify-content-between align-items-start">
                <div className="d-flex flex-column">
                  <h2 className="fw-bold fs-5">Dashboard</h2>
                  <p className="text-secondary fs-6">Sunday, 05 August 2024</p>
                </div>
                <div className="d-flex align-items-center">
                <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasProfile"
        aria-controls="offcanvasProfile"
      >
        Open Profile
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasProfile"
        aria-labelledby="offcanvasProfileLabel"
      >
        <div className="offcanvas-header">
          <h6 className="offcanvas-title" id="offcanvasProfileLabel">
            <FaUser /> John Doe's Profile
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Profile Information */}
          <div className="card mb-4 text-center">
            <div className="card-body">
              <img
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                className="rounded-circle mb-3"
              />
              <h6 className="">John Doe</h6>
              <p className="text-muted">Senior CRM Manager</p>
              <p className="mb-1"><FaEnvelope /> john.doe@example.com</p>
              <p><FaPhone /> +123 456 7890</p>
              <div className="d-flex justify-content-around mt-3">
                <button className="btn btn-outline-primary"><FaEdit /> Edit Profile</button>
                <button className="btn btn-outline-secondary"><FaCog /> Settings</button>
                <button className="btn btn-outline-danger"><FaSignOutAlt /> Logout</button>
              </div>
            </div>
          </div>

          {/* CRM Sections Overview */}
          <h6 className="mb-3">CRM Modules Overview</h6>
          <div className="row g-3">
            <div className="col-6">
              <div className="card">
                <div className="card-body text-center">
                  <FaChartPie  className="mb-2" />
                  <h6>Dashboard</h6>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body text-center">
                  <FaUniversity  className="mb-2" />
                  <h6>Universities</h6>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body text-center">
                  <FaUsers  className="mb-2" />
                  <h6>Clients</h6>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body text-center">
                  <FaFileInvoiceDollar  className="mb-2" />
                  <h6>Commissions</h6>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body text-center">
                  <FaProjectDiagram  className="mb-2" />
                  <h6>Projects & Tasks</h6>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body text-center">
                  <FaBell  className="mb-2" />
                  <h6>Notifications</h6>
                </div>
              </div>
            </div>
            {/* Add more cards as needed */}
          </div>

          {/* Performance Chart Example */}
          <h6 className="mt-4 mb-3">Performance Overview</h6>
          <div className="card">
            <div className="card-body">
              {/* Dummy chart - replace with actual chart component */}
              <FaChartLine size={100} className="text-muted d-block mx-auto" />
              <p className="text-center mt-2">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
                </div>
              </div>
       

          {/* Top Cards Row */}
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-primary mb-4">
                <div className="card-body">
                  <h6 className=""><FaUserAlt /> Total Clients</h6>
                  <h2 className="card-text">1,250</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-success mb-4">
                <div className="card-body">
                  <h6 className=""><FaChartLine /> New Leads</h6>
                  <h2 className="card-text">300</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-warning mb-4">
                <div className="card-body">
                  <h6 className=""><FaDollarSign /> Sales</h6>
                  <h2 className="card-text">$75,000</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-danger mb-4">
                <div className="card-body">
                  <h6 className=""><FaFileInvoiceDollar /> Pending Invoices</h6>
                  <h2 className="card-text">$12,000</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Cards Section */}
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h6 className=""><FaUser /> Total Clients</h6>
                  <p className="card-text">1,200</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-body">
                  <h6 className=""><FaUniversity /> Total Universities</h6>
                  <p className="card-text">150</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h6 className=""><FaChartPie /> Total Commissions</h6>
                  <p className="card-text">$50,000</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h6 className=""><FaUsers /> Active Users</h6>
                  <p className="card-text">3,500</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row">
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-header">Sales Overview</div>
                <div className="card-body">
                  <Line data={salesData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-header">Client Growth</div>
                <div className="card-body">
                  <Line data={clientGrowthData} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  Client Growth
                </div>
                <div className="card-body">
                  <Bar data={barData} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  Finance Overview
                </div>
                <div className="card-body">
                  <Line data={lineData} />
                </div>
              </div>
            </div>
          </div>

          {/* Table Row */}
          <div className="row">
            <div className="col">
              <div className="card mb-4">
                <div className="card-header">Recent Transactions</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-responsive-sm">
                      <thead className="bg-light">
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Client</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>2024-08-15</td>
                          <td>ABC Corp</td>
                          <td>$5,000</td>
                          <td><span className="badge badge-success">Paid</span></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>2024-08-14</td>
                          <td>XYZ Ltd</td>
                          <td>$3,200</td>
                          <td><span className="badge badge-warning">Pending</span></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>2024-08-13</td>
                          <td>Acme Inc</td>
                          <td>$1,500</td>
                          <td><span className="badge badge-danger">Overdue</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  Recent Applications
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Application ID</th>
                        <th>Client</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AP-01</td>
                        <td>John Doe</td>
                        <td>Pending</td>
                      </tr>
                      {/* More rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  Recent Invoices
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Client</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>INV-01</td>
                        <td>Jane Smith</td>
                        <td>$1,000</td>
                      </tr>
                      {/* More rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  Upcoming Meetings
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">Meeting with Client A</li>
                    <li className="list-group-item">Team Stand-up</li>
                    {/* More list items as needed */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  Recent Notifications
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">New application received</li>
                    <li className="list-group-item">Invoice paid</li>
                    {/* More list items as needed */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
    
      
      </div>
    </div>
  );
};
export default HeroContent;

import React, { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line } from "react-chartjs-2";
import Sidebar from "../../compoents/AdminSidebar";
import "chart.js/auto";
// import BackButton from "../../compoents/backButton";
import {
  FaTrash,
  FaListAlt,
  FaChartBar,
  FaUser,
  FaFileAlt,
  FaSuitcase,
  FaRegChartBar,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaLaptopCode,
  FaCommentsDollar,
  FaFileInvoice,
  FaBuilding,
  FaShieldAlt,
  FaGlobe,
  FaCogs,
  FaTrophy,
  FaEnvelopeOpenText,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaCheckCircle,
  FaComments,
  FaEnvelope,
  FaPhone,
  FaDollarSign,
  FaUserAlt,
  FaEdit,
  FaCog,
  FaSignOutAlt,
  FaChartPie,
  FaUniversity,
  FaUsers,
  FaFileInvoiceDollar,
  FaProjectDiagram,
  FaBell,
  FaChartLine,
  FaUserCog,
  FaBullhorn,
} from "react-icons/fa";

export const HeroContent = () => {
  // Chart data
  const salesData = useMemo(
    () => ({
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales",
          data: [12000, 19000, 3000, 5000, 20000, 30000],
          fill: false,
          backgroundColor: "#231f20",
          borderColor: "#231f20",
        },
      ],
    }),
    []
  );

  const clientGrowthData = useMemo(
    () => ({
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Clients",
          data: [20, 45, 28, 80, 99, 43],
          fill: false,
          backgroundColor: "#231f20",
          borderColor: "#231f20",
        },
      ],
    }),
    []
  );

  const barData = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Client Growth",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56, 55],
        },
      ],
    }),
    []
  );

  const lineData = useMemo(
    () => ({
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
          data: [65, 59, 80, 81, 56, 55],
        },
      ],
    }),
    []
  );

  // State for current date and time
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  // Extract the date and time rendering to a separate component to avoid unnecessary re-rendering
  const DateTimeDisplay = React.memo(({ date }) => (
    <div>
      <p>
        {formatDate(date)}, {formatTime(date)}
      </p>
    </div>
  ));

  return (
    <div>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header bg-light sticky-top shadow-sm mb-2 pb-0">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="d-flex flex-column">
              {/* Main title of the dashboard */}
              <h6 className="fw-bold mb-0" style={{ color: "#0056b3" }}>
                Dashboard
              </h6>
              {/* Current date displayed in smaller text */}
              <p className="text-secondary mb-0">
                <DateTimeDisplay date={currentDate} />
              </p>
            </div>
            <button
              className="btn"
              style={{
                backgroundColor: "#0056b3",
                color: "#fff",
                fontSize: "12px",
              }}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasProfile"
              aria-controls="offcanvasProfile"
            >
              Profile {/* Button label */}
            </button>
          </div>
        </div>

        <div className="container-fluid  ">
          <div className="row">
            <div className="col-md-12 ml-sm-auto col-lg-12 px-md-4">
              {/* <BackButton/> */}

              <div className="d-flex justify-content-between align-items-center">
                {/* Container for the header and profile button */}

                {/* Button to open the off-canvas profile menu */}
              </div>

              <div
                className="offcanvas offcanvas-end" // Class for the off-canvas component positioned on the right side
                tabIndex="-1" // Makes the off-canvas element focusable
                id="offcanvasProfile" // ID to target with Bootstrap data attributes
                aria-labelledby="offcanvasProfileLabel" // Accessibility attribute for linking to the label
              >
                {/* Off-canvas header */}
                <div
                  className="offcanvas-header"
                  style={{
                    backgroundColor: "#0056b3",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  {/* Title with user icon */}
                  <h5 className="offcanvas-title" id="offcanvasProfileLabel">
                    <FaUser /> John Doe's Profile
                  </h5>
                  {/* Close button for the off-canvas menu */}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas" // Attribute to close the off-canvas
                    aria-label="Close" // Accessibility label for the button
                  ></button>
                </div>

                {/* Off-canvas body */}
                <div className="offcanvas-body">
                  {/* Profile Information */}
                  <div className="text-center">
                    {/* User avatar */}
                    <img
                      src="https://via.placeholder.com/100"
                      alt="User Avatar"
                      className="rounded-circle mb-3"
                    />
                    {/* User name and position */}
                    <h5 className="text-primary">John Doe</h5>
                    <p className="text-muted fs-6">Senior CRM Manager</p>
                    <p className="text-primary fs-6">
                      <FaEnvelope /> john.doe@example.com
                    </p>
                    <p className="text-primary fs-6">
                      <FaPhone /> +123 456 7890
                    </p>
                    {/* Action buttons */}
                    <div className="d-flex justify-content-around mt-3">
                      <button className="btn btn-sm btn-primary">
                        <FaEdit /> Edit
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaCog /> Settings
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <ul className="nav nav-pills nav-justified fs-6 mt-3">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#dashboard"
                        data-bs-toggle="tab"
                      >
                        <FaChartPie /> Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#clients"
                        data-bs-toggle="tab"
                      >
                        <FaUsers /> Clients
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#commissions"
                        data-bs-toggle="tab"
                      >
                        <FaFileInvoiceDollar /> Commissions
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#projects"
                        data-bs-toggle="tab"
                      >
                        <FaProjectDiagram /> Projects
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#hrms" data-bs-toggle="tab">
                        <FaSuitcase /> HRMS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#finance"
                        data-bs-toggle="tab"
                      >
                        <FaDollarSign /> Finance
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#marketing"
                        data-bs-toggle="tab"
                      >
                        <FaGlobe /> Marketing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#reports"
                        data-bs-toggle="tab"
                      >
                        <FaRegChartBar /> Reports
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#settings"
                        data-bs-toggle="tab"
                      >
                        <FaCogs /> Settings
                      </a>
                    </li>
                  </ul>

                  {/* Tab content */}
                  <div className="tab-content mt-3">
                    {/* Dashboard Tab */}
                    <div className="tab-pane fade show active" id="dashboard">
                      <h6 className="text-primary">Dashboard Overview</h6>
                      <div className="row g-3">
                        {/* Performance Card */}
                        <div className="col-6">
                          <div className="card text-center border-primary">
                            <div className="card-body">
                              <FaChartLine
                                size={30}
                                className="text-primary mb-2"
                              />
                              <h6>Performance</h6>
                              <p className="text-muted">80% Achieved</p>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Feedback Card */}
                        <div className="col-6">
                          <div className="card text-center border-success">
                            <div className="card-body">
                              <FaComments
                                size={30}
                                className="text-success mb-2"
                              />
                              <h6>Feedback</h6>
                              <p className="text-muted">23 New Comments</p>
                              <span className="badge bg-primary">
                                <FaCheckCircle /> Resolved
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Notifications Card */}
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body">
                              <FaBell size={30} className="text-danger mb-2" />
                              <h6 className="text-primary">Notifications</h6>
                              <p className="text-muted">5 New Alerts</p>
                              <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  Meeting with Client X
                                  <span className="badge bg-warning rounded-pill">
                                    1 hr
                                  </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  Payment Due: Invoice #1234
                                  <span className="badge bg-danger rounded-pill">
                                    2 days
                                  </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  Project Deadline: Y
                                  <span className="badge bg-primary rounded-pill">
                                    5 days
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Client Tab */}
                    <div className="tab-pane fade" id="clients">
                      <h6 className="text-primary">Clients Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaUsers /> Active Clients
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Client A
                              <span className="badge bg-success rounded-pill">
                                Active
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Client B
                              <span className="badge bg-warning rounded-pill">
                                Pending
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Client C
                              <span className="badge bg-danger rounded-pill">
                                Inactive
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Commissions Tab */}
                    <div className="tab-pane fade" id="commissions">
                      <h6 className="text-primary">Commissions Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaFileInvoiceDollar /> Commission Statements
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Statement A
                              <span className="badge bg-primary rounded-pill">
                                Paid
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Statement B
                              <span className="badge bg-warning rounded-pill">
                                Pending
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Statement C
                              <span className="badge bg-danger rounded-pill">
                                Overdue
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Projects Tab */}
                    <div className="tab-pane fade" id="projects">
                      <h6 className="text-primary">Projects Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaProjectDiagram /> Ongoing Projects
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Project X
                              <span className="badge bg-primary rounded-pill">
                                In Progress
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Project Y
                              <span className="badge bg-success rounded-pill">
                                Completed
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Project Z
                              <span className="badge bg-warning rounded-pill">
                                Delayed
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* HRMS Tab */}
                    <div className="tab-pane fade" id="hrms">
                      <h6 className="text-primary">HRMS Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaSuitcase /> Employee Records
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Employee A
                              <span className="badge bg-success rounded-pill">
                                Active
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Employee B
                              <span className="badge bg-warning rounded-pill">
                                On Leave
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Employee C
                              <span className="badge bg-danger rounded-pill">
                                Resigned
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Finance Tab */}
                    <div className="tab-pane fade" id="finance">
                      <h6 className="text-primary">Finance Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaDollarSign /> Financial Reports
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Report A
                              <span className="badge bg-primary rounded-pill">
                                Q1
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Report B
                              <span className="badge bg-secondary rounded-pill">
                                Q2
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Report C
                              <span className="badge bg-success rounded-pill">
                                Q3
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Tab */}
                    <div className="tab-pane fade" id="marketing">
                      <h6 className="text-primary">Marketing Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaGlobe /> Campaigns
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Campaign A
                              <span className="badge bg-primary rounded-pill">
                                Ongoing
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Campaign B
                              <span className="badge bg-success rounded-pill">
                                Completed
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Campaign C
                              <span className="badge bg-danger rounded-pill">
                                Cancelled
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Reports Tab */}
                    <div className="tab-pane fade" id="reports">
                      <h6 className="text-primary">Reports Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaRegChartBar /> Summary Reports
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Report X
                              <span className="badge bg-primary rounded-pill">
                                Monthly
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Report Y
                              <span className="badge bg-secondary rounded-pill">
                                Quarterly
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              Report Z
                              <span className="badge bg-success rounded-pill">
                                Yearly
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Settings Tab */}
                    <div className="tab-pane fade" id="settings">
                      <h6 className="text-primary">Settings Overview</h6>
                      <div className="card">
                        <div className="card-header bg-light">
                          <FaCogs /> System Settings
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              General Settings
                              <span className="badge bg-primary rounded-pill">
                                Configure
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              User Management
                              <span className="badge bg-success rounded-pill">
                                Manage
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              System Logs
                              <span className="badge bg-warning rounded-pill">
                                View
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Cards Row */}

              <div className="row">
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-primary">
                    <div className="card-body">
                      <h6>
                        <FaUserAlt /> Total Clients & Students
                      </h6>
                      <p className="card-text">
                        Clients: 1,200 | Students: 500
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-secondary">
                    <div className="card-body">
                      <h6>
                        <FaUniversity /> Total Universities & Agents
                      </h6>
                      <p className="card-text">
                        Universities: 150 | Agents: 75
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-success">
                    <div className="card-body">
                      <h6>
                        <FaChartLine /> Total Commissions & Sales
                      </h6>
                      <p className="card-text">
                        Commissions: $50,000 | Sales: $75,000
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-warning">
                    <div className="card-body">
                      <h6>
                        <FaDollarSign /> Finance & Expenses
                      </h6>
                      <p className="card-text">
                        Income: $100,000 | Expenses: $20,000
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-info">
                    <div className="card-body">
                      <h6>
                        <FaFileInvoiceDollar /> Applications & Invoices
                      </h6>
                      <p className="card-text">
                        Applications: 120 | Invoices: $12,000
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-dark">
                    <div className="card-body">
                      <h6>
                        <FaUserCog /> HRMS & Payroll
                      </h6>
                      <p className="card-text">Staff: 150 | Payroll: $30,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-danger">
                    <div className="card-body">
                      <h6>
                        <FaBullhorn /> Marketing & Promotions
                      </h6>
                      <p className="card-text">
                        Campaigns: 10 | Promotions: 25
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 ">
                  <div className="card text-white rounded-1 border-0 shadow-sm bg-secondary">
                    <div className="card-body">
                      <h6>
                        <FaCog /> Reports & Settings
                      </h6>
                      <p className="card-text">Reports: 5 | Settings: 12</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}

              <div className="row">
                {/* Sales Overview Card */}
                <div className="col-lg-6 ">
                  <div className="card rounded-1 border-0 shadow-sm">
                    <div className="card-header bg-primary text-white d-flex align-items-center">
                      <FaChartLine className="me-2" /> Sales Overview
                    </div>
                    <div className="card-body">
                      <Line data={salesData} options={{ responsive: true }} />
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
                      <Line
                        data={clientGrowthData}
                        options={{ responsive: true }}
                      />
                    </div>
                  </div>
                </div>

                {/* Client Growth Bar Chart Card */}
                <div className="col-md-6 ">
                  <div className="card rounded-1 border-0 shadow-sm">
                    <div className="card-header bg-warning text-white d-flex align-items-center">
                      <FaChartBar className="me-2" /> Client Growth (Bar)
                    </div>
                    <div className="card-body">
                      <Bar data={barData} options={{ responsive: true }} />
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
                      <Line data={lineData} options={{ responsive: true }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Row */}

              <div className="row">
                {/* Recent Transactions Card */}
                <div className="col-lg-12 ">
                  <div className="card  rounded-1 border-0 shadow-sm">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#4a90e2", color: "#fff" }}
                    >
                      <FaListAlt className="me-2" /> Recent Transactions
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead style={{ backgroundColor: "#f0f2f5" }}>
                            <tr>
                              <th></th>
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
                              <td>
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: "#7ed321",
                                    color: "#fff",
                                  }}
                                >
                                  Paid
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary btn-sm me-2">
                                  <FaEdit />
                                </button>
                                <button className="btn btn-sm btn-danger btn-sm">
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
                              <td>
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: "#f5a623",
                                    color: "#fff",
                                  }}
                                >
                                  Pending
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary btn-sm me-2">
                                  <FaEdit />
                                </button>
                                <button className="btn btn-sm btn-danger btn-sm">
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
                              <td>
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: "#d0021b",
                                    color: "#fff",
                                  }}
                                >
                                  Overdue
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary btn-sm me-2">
                                  <FaEdit />
                                </button>
                                <button className="btn btn-sm btn-danger btn-sm">
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

                {/* Recent Applications Card */}
                <div className="col-md-6 ">
                  <div className="card rounded-1 border-0 shadow-sm">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#7ed321", color: "#fff" }}
                    >
                      <FaCalendarAlt className="me-2" /> Recent Applications
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead style={{ backgroundColor: "#f0f2f5" }}>
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
                              <button className="btn btn-sm btn-primary btn-sm me-2">
                                <FaEdit />
                              </button>
                              <button className="btn btn-sm btn-danger btn-sm">
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
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#f5a623", color: "#fff" }}
                    >
                      <FaFileInvoice className="me-2" /> Recent Invoices
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead style={{ backgroundColor: "#f0f2f5" }}>
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
                              <button className="btn btn-sm btn-primary btn-sm me-2">
                                <FaEdit />
                              </button>
                              <button className="btn btn-sm btn-danger btn-sm">
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

                {/* Upcoming Meetings Card */}
                <div className="col-md-6 ">
                  <div className="card  rounded-1 border-0 shadow-sm">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#4a90e2", color: "#fff" }}
                    >
                      <FaCalendarAlt className="me-2" /> Upcoming Meetings
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Meeting with Client A
                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: "#4a90e2",
                              color: "#fff",
                            }}
                          >
                            Today
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Team Stand-up
                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: "#4a90e2",
                              color: "#fff",
                            }}
                          >
                            Tomorrow
                          </span>
                        </li>
                        {/* More list items as needed */}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Recent Notifications Card */}
                <div className="col-md-6 ">
                  <div className="card  rounded-1 border-0 shadow-sm">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#7ed321", color: "#fff" }}
                    >
                      <FaBell className="me-2" /> Recent Notifications
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          New application received
                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: "#7ed321",
                              color: "#fff",
                            }}
                          >
                            New
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Invoice paid
                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: "#7ed321",
                              color: "#fff",
                            }}
                          >
                            Updated
                          </span>
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
  );
};
export default HeroContent;

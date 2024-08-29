import React from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { FaUniversity, FaRegBell } from "react-icons/fa";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import Sidebar from "../../compoents/StaffSidebar";

const StaffDashBoard = () => {
  // Dummy data for charts
  const universityData = {
    labels: ["Harvard", "MIT", "Stanford", "Yale", "Princeton"],
    datasets: [
      {
        label: "Applications",
        data: [400, 300, 250, 350, 500],
        backgroundColor: "#2980b9",
      },
    ],
  };

  const programData = {
    labels: ["Engineering", "Medicine", "Business", "Law", "Arts"],
    datasets: [
      {
        label: "Enquiries",
        data: [1000, 800, 600, 900, 700],
        backgroundColor: "#7f7fd5",
      },
    ],
  };

  const enquiryTypesData = {
    labels: ["General", "Admission", "Scholarship", "Visa", "Other"],
    datasets: [
      {
        label: "Enquiry Types",
        data: [1200, 950, 400, 350, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const notificationsData = {
    labels: ["August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Notifications",
        data: [15, 30, 45, 60, 75],
        backgroundColor: "#fe5722",
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="container-fluid">
          {/* University Applications Section */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-1">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary fw-light">University Applications</h5>
                  <Bar data={universityData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-1">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary fw-light">Program Enquiries</h5>
                  <Line data={programData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Types Section */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-1">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary fw-light">Enquiry Types</h5>
                  <Doughnut data={enquiryTypesData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-1">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary fw-light">Notifications</h5>
                  <Pie data={notificationsData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>

          {/* University Overview Table */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-1">
                <div className="card-body">
                  <h5 className="text-secondary fw-light">University Overview</h5>
                  <table className="table table-responsive-sm table-hover mt-4">
                    <thead>
                      <tr>
                        <th>University</th>
                        <th>Programs</th>
                        <th>Applications</th>
                        <th>Enquiries</th>
                        <th>Notifications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Harvard</td>
                        <td>Engineering, Medicine</td>
                        <td>500</td>
                        <td>1200</td>
                        <td>15</td>
                      </tr>
                      <tr>
                        <td>MIT</td>
                        <td>Engineering, Business</td>
                        <td>400</td>
                        <td>900</td>
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>Stanford</td>
                        <td>Business, Law</td>
                        <td>300</td>
                        <td>600</td>
                        <td>45</td>
                      </tr>
                      <tr>
                        <td>Yale</td>
                        <td>Law, Arts</td>
                        <td>250</td>
                        <td>700</td>
                        <td>60</td>
                      </tr>
                      <tr>
                        <td>Princeton</td>
                        <td>Arts, Medicine</td>
                        <td>350</td>
                        <td>800</td>
                        <td>75</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Other Components Section */}
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card border-0 shadow-sm rounded-1">
                <div className="card-body">
                  <h5 className="fs-6 text-secondary fw-light">Settings & Alerts</h5>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <HiOutlineCog6Tooth className="me-2 text-primary" size={24} />
                      <span>Configure Notifications</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaRegBell className="me-2 text-warning" size={24} />
                      <span>View All Alerts</span>
                    </div>
                  </div>
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

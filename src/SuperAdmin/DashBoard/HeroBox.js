import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


import { BsThreeDots } from "react-icons/bs";


import { PieChart, Pie } from "recharts";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { FaCaretDown } from "react-icons/fa";
import Sidebar from "../../compoents/sidebar";
import { FaUserAlt, FaChartLine, FaDollarSign, FaFileInvoiceDollar } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
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
  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <Sidebar />
      <div className="content-wrapper" style={{ fontSize: "12px" }}>

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
                    class="btn border-0 rounder-2 shadow text-white"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    style={{ backgroundColor: "#fe5722" }}
                  >
                    Profile
                  </button>

                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div class="offcanvas-header">
                      <button
                        type="button"
                        class="btn-close "
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="offcanvas-body">
                      <div className="container-fluid">
                        <div className="d-flex flex-row justify-content-between align-items-start">
                          <div className="d-flex flex-column ">
                            <h2 className="fs-5 ">My Profile</h2>
                            <p className="fs-6">
                              <span className="color1">70%</span> Progress
                            </p>
                          </div>
                          <div className="dropdown mt-3">
                            <button
                              className="btn border-0"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ color: "#fe5722" }}
                            >
                              <BsThreeDots />
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <a href="#" className="dropdown-item">
                                  Profile
                                </a>
                              </li>
                              <li>
                                <a href="#" className="dropdown-item">
                                  About
                                </a>
                              </li>
                              <li>
                                <a href="#" className="dropdown-item">
                                  Contact
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="  text-center  border-0 rounded-0   p-2">
                          <div className="">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                              alt="img"
                              className="rounded-circle  border border-top-0  border-start-0  border-3 p-1  border-danger"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                          <div className="d-flex flex-column">
                            <div className="fs-5 fw-semibold">James Lee</div>
                            <div className="text-muted fs-6">
                              jameslee1@gmail.com
                            </div>
                          </div>
                        </div>
                        <div class="container mt-2">
                          <div class="row">
                            <div class="col">
                              <div class="d-flex justify-content-between align-items-start">
                                <p class="fs-6">Today</p>
                                <button class="btn btn-sm border-0">
                                  View All
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="container-fluid py-1">
                          <div class="row">
                            <div class="col">
                              <div class="d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-center py-1">
                                  <div class="text-center">
                                    <span class="bg-primary p-2 rounded-circle fs-6 text-white">
                                      <i class="bi bi-pencil"></i>
                                    </span>
                                  </div>
                                  <div class="d-flex flex-column align-items-center">
                                    <div>Eli Jang</div>
                                    <div class="fs1">Create a new project</div>
                                  </div>
                                  <div>
                                    <span class="fs-5">
                                      <i class="bi bi-arrow-right"></i>
                                    </span>
                                  </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center py-1">
                                  <div class="text-center">
                                    <span class="bg-primary p-2 rounded-circle fs-6 text-white">
                                      <i class="bi bi-pencil"></i>
                                    </span>
                                  </div>
                                  <div class="d-flex flex-column align-items-center">
                                    <div>Eli Jang</div>
                                    <div class="fs1">Create a new project</div>
                                  </div>
                                  <div>
                                    <span class="fs-5">
                                      <i class="bi bi-arrow-right"></i>
                                    </span>
                                  </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center py-1">
                                  <div class="text-center">
                                    <span class="bg-primary p-2 rounded-circle fs-6 text-white">
                                      <i class="bi bi-pencil"></i>
                                    </span>
                                  </div>
                                  <div class="d-flex flex-column align-items-center">
                                    <div>Eli Jang</div>
                                    <div class="fs1">Create a new project</div>
                                  </div>
                                  <div>
                                    <span class="fs-5">
                                      <i class="bi bi-arrow-right"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="container mt-2">
                          <div class="row">
                            <div class="col">
                              <div class="d-flex justify-content-between align-items-start">
                                <p class="fs-6">Team</p>
                                <button class="btn btn-sm border-0">
                                  View All
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="container py-1">
                          <div class="row">
                            <div class="col">
                              <div class="card border-0 bg-light py-1">
                                <div class="d-flex justify-content-around align-items-center py-1">
                                  <div class="text-center">
                                    <img
                                      src="https://pm1.aminoapps.com/7629/29d6afe7e852a049ad1700a7330a8c4c22f616adr1-2048-2048v2_hq.jpg"
                                      alt="Eli Jang"
                                      class="rounded-circle"
                                      width="50px"
                                    />
                                  </div>
                                  <div class="">Eli Jang</div>
                                  <div class="">
                                    <span class="text-success">
                                      <i class="bi bi-dot"></i>
                                    </span>
                                  </div>
                                </div>
                                <div class="d-flex justify-content-around align-items-center py-1">
                                  <div class="text-center">
                                    <img
                                      src="https://pm1.aminoapps.com/7629/29d6afe7e852a049ad1700a7330a8c4c22f616adr1-2048-2048v2_hq.jpg"
                                      alt="Eli Jang"
                                      class="rounded-circle"
                                      width="50px"
                                    />
                                  </div>
                                  <div class="">Eli Jang</div>
                                  <div class="">
                                    <span class="text-danger">
                                      <i class="bi bi-dot"></i>
                                    </span>
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
              </div>
       

          {/* Top Cards Row */}
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-primary mb-4">
                <div className="card-body">
                  <h5 className="card-title"><FaUserAlt /> Total Clients</h5>
                  <h2 className="card-text">1,250</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-success mb-4">
                <div className="card-body">
                  <h5 className="card-title"><FaChartLine /> New Leads</h5>
                  <h2 className="card-text">300</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-warning mb-4">
                <div className="card-body">
                  <h5 className="card-title"><FaDollarSign /> Sales</h5>
                  <h2 className="card-text">$75,000</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card text-white bg-danger mb-4">
                <div className="card-body">
                  <h5 className="card-title"><FaFileInvoiceDollar /> Pending Invoices</h5>
                  <h2 className="card-text">$12,000</h2>
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

        </main>
      </div>
    </div>
    
        <div className="container">
        
          <div className="row">
            <div className="my-2">
              <div className="d-flex flex-row justify-content-between px-2">
                <div className="mt-1 fw-semibold">Project</div>
                <div className="d-flex flex-row justify-content-end">
                  <a href="#" className="btn btn-sm me-1">
                    2 Design
                  </a>
                  <a href="#" className="btn btn-sm  me-1">
                    3 Mockup
                  </a>
                  <a href="#" className="btn btn-sm">
                    2 Layout
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mt-1">
              <div className="card border-0 rounded-2 shadow">
                <div className="row g-0">
                  <div className="col-lg-4 d-flex justify-content-center align-items-center">
                    <div className="px-3 pt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                        alt="image"
                        className="img-fluid rounded-3"
                        width="100px"
                      />
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="card-body py-2">
                      <div className="d-flex flex-column align-items-center justify-content-start">
                        <div className="fs-6">Baseline Project</div>
                        <div className="text-muted fs-6">of user</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body py-2">
                  <div className="t lh-sm fs1">
                    Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit
                    amet consectetur, adipisicing
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-1">
              <div className="card border-0 rounded-2 shadow">
                <div className="row g-0">
                  <div className="col-lg-4 d-flex justify-content-center align-items-center">
                    <div className="px-3 pt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                        alt="image"
                        className="img-fluid rounded-3"
                        width="100px"
                      />
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="card-body py-2">
                      <div className="d-flex flex-column align-items-center justify-content-start">
                        <div className="fs-6">Baseline Project</div>
                        <div className="text-muted fs-6">of user</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body py-2">
                  <div className="t lh-sm fs1">
                    Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit
                    amet consectetur, adipisicing
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-1">
              <div className="card border-0 rounded-2 shadow">
                <div className="row g-0">
                  <div className="col-lg-4 d-flex justify-content-center align-items-center">
                    <div className="px-3 pt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                        alt="image"
                        className="img-fluid rounded-3"
                        width="100px"
                      />
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="card-body py-2">
                      <div className="d-flex flex-column align-items-center justify-content-start">
                        <div className="fs-6">Baseline Project</div>
                        <div className="text-muted fs-6">of user</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body py-2">
                  <div className="t lh-sm fs1">
                    Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit
                    amet consectetur, adipisicing
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

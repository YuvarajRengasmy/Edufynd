import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { FaBell } from "react-icons/fa6";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { GiPencil } from "react-icons/gi";
import Sidebar from "../../compoents/StaffSidebar";



export const StaffDashBoard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 1400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 10000,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 2800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2000,
      pv: 7500,
      amt: 2290,
    },
  ];

  return (
    <>
    
        <Sidebar/>
   
   
    <div className="content-wrapper"  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="container">
        <div className="row">
        <div className="col-xl-12">
          <div className="card  ">
            <div className="card-body">
              <div className="card-title">
                <div className="d-flex flex-row justify-content-between align-items-start">
                  <div className="d-flex flex-column align-items-start justify-content-center ">
                    <h5 className="fs-6 text-secondary fw-light">
                      Total Shipments
                    </h5>
                    <h3 className="fs-4 fw-light">Performance</h3>
                  </div>

                  <div className="btn btn-group float-end  border-0 ">
                    <button
                      className="btn active border-end  border-0  btn-sm "
                      style={{ background: "#fe5722", color: "white" }}
                    >
                      Accounts
                    </button>
                    <button
                      className="btn  btn-sm border-end border-start border-0  "
                      style={{ background: "#fe5722", color: "white" }}
                    >
                      Purchases
                    </button>
                    <button
                      className="btn  btn-sm border-start border-0 "
                      style={{ background: "#fe5722", color: "white" }}
                    >
                      Session
                    </button>
                  </div>
                </div>
                <div className="charts mt-2">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={data}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="#2980b9"
                        fill="#2980b9"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-4 mt-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="card-title">
                <h5 className="fs-6 text-secondary fw-light">
                  Total Shipments
                </h5>
                <h3 className="fs-4 fw-light">
                  <span className="text-primary">
                    {" "}
                    <FaBell />
                  </span>
                  763,215
                </h3>
                <div className="charts">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={data1}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="#7f7fd5"
                        fill="#7f7fd5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="card-title">
                <h5 className="fs-6 text-secondary fw-light">Daily Sales</h5>
                <h3 className="fs-4 fw-light">
                  <span className="text-primary">
                    {" "}
                    <FaBell />
                  </span>
                  $35,000
                </h3>
                <div className="charts">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={data1}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="#7f7fd5"
                        fill="#7f7fd5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="card-title">
                <h5 className="fs-6 text-secondary fw-light">
                  Compeleted Tasks
                </h5>
                <h3 className="fs-4 fw-light">
                  <span className="text-primary">
                    {" "}
                    <FaBell />
                  </span>
                  12,000K
                </h3>
                <div className="charts">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={data1}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="#7f7fd5"
                        fill="#7f7fd5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-6 mt-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="card-title">
                <h5 className="text-secondary fw-light">Simple Table</h5>
              </div>
              <table class="table table-responsive table-hover mt-4">
                <thead>
                  <tr>
                    <th scope="col " className="py-2">
                      NAME
                    </th>
                    <th scope="col " className="py-2">
                      COUNTRY
                    </th>
                    <th scope="col " className="py-2">
                      CITY
                    </th>
                    <th scope="col " className="py-2">
                      SALARY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="py-2">
                    <td scope="row  py-1" className="py-2">
                      Dakota Rice
                    </td>
                    <td className="py-2">Niger</td>
                    <td className="py-2">Oud-Turnhout</td>
                    <td className="py-2">$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Minerva Hooper</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                    <td>$23,789</td>
                  </tr>
                  <tr>
                    <td scope="row">Sage Rodriguez</td>
                    <td>Netherlands </td>
                    <td>Baileux</td>
                    <td>$56,142</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-4 ">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="card-title">
                <h5 className="text-secondary fw-light">Simple Table</h5>
              </div>
              <table class="table table-responsive table-hover mt-4">
                <thead>
                  <tr>
                    <th scope="col " className="py-2">
                      NAME
                    </th>
                    <th scope="col " className="py-2">
                      COUNTRY
                    </th>
                    <th scope="col " className="py-2">
                      CITY
                    </th>
                    <th scope="col " className="py-2">
                      SALARY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="py-2">
                    <td scope="row  py-1" className="py-2">
                      Dakota Rice
                    </td>
                    <td className="py-2">Niger</td>
                    <td className="py-2">Oud-Turnhout</td>
                    <td className="py-2">$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Minerva Hooper</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                    <td>$23,789</td>
                  </tr>
                  <tr>
                    <td scope="row">Sage Rodriguez</td>
                    <td>Netherlands </td>
                    <td>Baileux</td>
                    <td>$56,142</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
                  </tr>
                  <tr>
                    <td scope="row">Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td>$36,738</td>
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


export default StaffDashBoard
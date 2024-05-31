
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./HeroBox.css";
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaMarker } from "react-icons/fa";
import { PieChart, Pie } from 'recharts';
import { GoDotFill } from "react-icons/go";
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


export const HeroContent = () => {
  const data = [
    { name: 'A', pv: 4000 },
    { name: ' B', pv: 3000 },
    { name: ' C', pv: 2000 },
    { name: ' D', pv: 2780 },
    { name: ' E', pv: 1890 },
  ];

  const data1 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
   
  ];
  return (
    <div>
      <div className="container">
        <div className="row ps-5 ">
     

          <div className=" col-lg-9">
            <div
              className="  border-0 rounded-2 mt-1 "
              style={{ width: "100%" }}
            >
              <div className="">
                <div className="row">
                <header className="card-title">
  <div className="d-flex flex-row justify-content-between align-items-start">
    <div className="d-flex flex-column">
      <h2 className="fw-bold fs-5">Dashboard</h2>
      <p className="text-secondary fs1">Sunday, 05 August 2024</p>
    </div>
    <div className="d-flex align-items-center">
      <button className="btn   border-0 text-white btn-sm " style={{backgroundColor:'#fe5722'}}>
        <span className="me-2">
          <FaCalendarAlt />
        </span>
        Aug 2024
      </button>
    </div>
  </div>
</header>

                </div>
                <div className="card  border-0 rounded-0 shadow" style={{ width: "100%" }}>
  <div className="row g-0">
    <div className="col-lg-4">
      <img
        src="https://t4.ftcdn.net/jpg/05/25/50/67/360_F_525506740_fmR5uWnmtIDi2MLmLFQ0X6drPS2k7gf8.jpg"
        alt="Profile"
        className="img-fluid "
        style={{ width: "100%" }}
      />
    </div>
    <div className="col-lg-8">
      <div className="card-body">
        <h2 className="card-title fs-5 mt-1 px-4 fw-semibold "  style={{color:"#fe5722"}}>
         <span className="text-dark">Hello,</span> James Lee
        </h2>
        <p className="card-text text-muted mt-1 lh-base px-3 t fs1 fw-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ducimus quo earum rem culpa corrupti soluta, possimus orporis. Lorem ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, quae?
        </p>
      </div>
    </div>
  </div>
</div>


                <div className="row ">
                <div className="col-lg-6 mt-1">
  <div className="card rounded-2 border-0 shadow">
    <div className="card-body">
      <h2 className="card-title fs-5 fw-semibold">Activity</h2>
      <div className="d-flex justify-content-end align-items-center">
  <div className="dropdown" >
    <button className="btn  rounded-2 border-0 fs1 text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style={{backgroundColor:'#fe5722'}}>
      Daily <span><FaCaretDown /></span>
    </button>
    <ul className="dropdown-menu">
      <li><a className="dropdown-item " href="#">Daily</a></li>
      <li><a className="dropdown-item " href="#">Weekly</a></li>
      <li><a className="dropdown-item " href="#">Monthly</a></li>
      <li><a className="dropdown-item " href="#">Yearly</a></li>
    </ul>
  </div>
</div>


      <div className="charts mt-3">
        <div style={{ width: '100%', height: '190px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              syncId="anyId"
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="pv" stroke="#fe5722" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
</div>

                  <div className="col-lg-3 mt-1">
                    <div className="">
                    <div className="card border-0 rounded-2 shadow">
      <div className="card-body">
        <div className="card-title fw-semibold">Progress</div>
        <div className="charts">
          <ResponsiveContainer width='100%' height={195}>
            <PieChart>
              <Pie dataKey="value" data={data1} fill="skyblue" label />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card-text text-muted text-center fs1 pt-4">This Week</div>
      </div>
    </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mt-1">
                    <div className="my-2 ">
                    <div className="card rounded-2 border-0 px-3 py-2 shadow">
  <div className="row g-0">
    <div className="col-lg-6">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="px-2 py-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
            alt="image"
            className="rounded-circle border-0 "
            width={"60px"}
            height={'60px'}
          />
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="card-body d-flex justify-content-center align-items-center h-100">
        <div className="card-title text-center mt-2">
          <div className="d-flex flex-column align-items-center">
            <div className="fs-6">Team</div>
            <div className="fs-5 color1 fw-bold">5</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

                    </div>
                    <div className="my-2">
                    <div className="card rounded-2 shadow border-0 px-3 py-2">
  <div className="row g-0">
    <div className="col-lg-6">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="px-2 py-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
            alt="image"
            className="rounded-circle"
            width={"60px"}
            height={'60px'}
          />
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="card-body d-flex justify-content-center align-items-center h-100">
        <div className="card-title text-center mt-2">
          <div className="d-flex flex-column align-items-center">
            <div className="fs-6">Team</div>
            <div className="fs-5 color1 fw-bold">5</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                    </div>
                  </div>
                </div>
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
    <div className="col-md-4 d-flex justify-content-center align-items-center">
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
      Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur, adipisicing
    </div>
  </div>
</div>

                  </div>
                  <div className="col-lg-4 mt-1">
                  <div className="card border-0 rounded-2 shadow">
  <div className="row g-0">
    <div className="col-md-4 d-flex justify-content-center align-items-center">
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
      Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur, adipisicing
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
      Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur, adipisicing
    </div>
  </div>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-lg-3  ">
            <div className="container-fluid mt-2 card border-0 shadow">
            <div className="d-flex flex-row justify-content-between">
  <div className="d-flex flex-column mt-3">
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
      style={{color:"#fe5722"}}
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
                  <div className="text-muted fs-6">jameslee1@gmail.com</div>
                </div>
              </div>
              <div class="container mt-2">
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-between align-items-start">
        <p class="fs-6">Today</p>
        <button class="btn btn-sm border-0">View All</button>
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
        <button class="btn btn-sm border-0">View All</button>
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
            <img src="https://pm1.aminoapps.com/7629/29d6afe7e852a049ad1700a7330a8c4c22f616adr1-2048-2048v2_hq.jpg" alt="Eli Jang" class="rounded-circle" width="50px" />
          </div>
          <div class="">Eli Jang</div>
          <div class=""><span class="text-success"><i class="bi bi-dot"></i></span></div>
        </div>
        <div class="d-flex justify-content-around align-items-center py-1">
          <div class="text-center">
            <img src="https://pm1.aminoapps.com/7629/29d6afe7e852a049ad1700a7330a8c4c22f616adr1-2048-2048v2_hq.jpg" alt="Eli Jang" class="rounded-circle" width="50px" />
          </div>
          <div class="">Eli Jang</div>
          <div class=""><span class="text-danger"><i class="bi bi-dot"></i></span></div>
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


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
    { name: 'Page A', pv: 4000 },
    { name: 'Page B', pv: 3000 },
    { name: 'Page C', pv: 2000 },
    { name: 'Page D', pv: 2780 },
    { name: 'Page E', pv: 1890 },
  ];

  const data1 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  return (
    <div>
      <div className="container">
        <div className="row  ">
     

          <div className="ps-5 col-lg-9">
            <div
              className="card color2 border-0 rounded-3 mt-1 "
              style={{ width: "100%" }}
            >
              <div className="card-body">
                <div className="row">
                <div className="card-title">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <div className="fw-bold fs-5 ">Dashboard</div>
                      <div className="  text-secondary fs1">
                        Sunday, 05 August 2024
                      </div>
                    </div>
                    <div className="float-end ">
                      <button className="btn btn-warning fs1 border-0  text-white btn-lg shadow">
                        <span className="">
                          <FaCalendarAlt />
                        </span>{" "}
                        Aug 2024
                      </button>
                    </div>
                </div>
             
                  </div>
                </div>
                <div class="card color3 border-0 rounded-3 shadow-lg" style={{width:"100%;"}}>
    <div class="row g-0">
        <div class="col-lg-4">
            <img src="https://t4.ftcdn.net/jpg/05/25/50/67/360_F_525506740_fmR5uWnmtIDi2MLmLFQ0X6drPS2k7gf8.jpg" alt=" " class="img-fluid rounded-3" style={{width:'100%'}}/>
        </div>
        <div class="col-lg-8">
            <div class="card-body">
                <p class="card-title fs-5 mt-1 px-3 fw-semibold color4">
                    Hello, <span class="fs-5 text-white">James Lee</span>
                </p>
                <p class="card-text text-white mt-1 lh-base px-3 t fs1 fw-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ducimus quo earum rem culpa corrupti soluta, possimus orporis. Lorem ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, quae?
                </p>
            </div>
        </div>
    </div>
</div>

                <div className="row ">
                  <div className="col-lg-6 mt-1">
                    <div className="">
                    <div className="card rounded-3 border-0 " >
      <div className="card-body">
        <div className="card-title">
          <div className="d-flex justify-content-between ">
            <div className="fs-5 fw-semibold">Activity</div>
            <div className="dropdown float-end">
              <button className="btn btn-primary rounded-3 border-0 fs1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Daily
                <span><FaCaretDown /></span>
              </button>
              <ul className="dropdown-menu bg-dark ">
                <li><a className="dropdown-item text-white" href="#">Daily</a></li>
                <li><a className="dropdown-item text-white" href="#">Weekly</a></li>
                <li><a className="dropdown-item text-white" href="#">Monthly</a></li>
                <li><a className="dropdown-item text-white" href="#">Yearly</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="charts">
          <div style={{ width: '100%', height: '190px' }}>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart
                data={data}
                syncId="anyId"
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="black" fill="blueviolet" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mt-1">
                    <div className="">
                    <div className="card border-0 rounded-3">
      <div className="card-body">
        <div className="card-title fw-semibold">Progress</div>
        <div className="charts">
          <ResponsiveContainer width='100%' height={160}>
            <PieChart>
              <Pie dataKey="value" data={data1} fill="blueviolet" label />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card-text text-muted text-center fs1 pt-3">This Week</div>
      </div>
    </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mt-1">
                    <div className="mt-1 ">
                      <div className="card rounded-3 border-0 px-3 py-1  ">
                        <div className="row g-0">
                          <div className="col-lg-6">
                            <div className="d-flex justify-content-center ">

                              <div className=" px-2 pt-3">
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                                  alt="image"
                                  className="  rounded-circle"
                                  width={"60px"} height={'60px'}
                                /></div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="card-body  ">
                              <div className="card-title ">
                                <div className="d-flex flex-column align-items-center ">
                                  <div className="fs-6">Team</div>
                                  <div className="fs-5 color1 fw-bold">5</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="card rounded-3 border-0 px-3 py-1  ">
                        <div className="row g-0">
                          <div className="col-lg-6">
                            <div className="d-flex justify-content-center ">

                              <div className=" px-2 pt-3">
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                                  alt="image"
                                  className="  rounded-circle"
                                  width={"60px"} height={'60px'}
                                /></div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="card-body  ">
                              <div className="card-title ">
                                <div className="d-flex flex-column align-items-center ">
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
                  <div className=" mt-1">
                    <div className="d-flex flex-row justify-content-between px-2">
                      <div className="mt-1 fw-semibold">Project</div>
                      <div className="d-flex flex-row justify-content-end">
                        <a href="" className="btn ">
                          2 Design
                        </a>
                        <a href="" className="btn ">
                          3 Mockup
                        </a>
                        <a href="" className="btn ">
                          2 Layout
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1">
                    <div className="card border-0 rounded-3 ">
                      <div className="row g-0  ">
                        <div className="d-flex flex-row justify-content-center align-items-center ">
                          <div className="col-md-4 px-3 pt-2 ">

                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                              alt="image"
                              className=" img-fluid rounded-3"
                              width="100px"
                            />
                          </div>

                          <div className="col-lg-8 px-1 pt-2">
                            <div className="d-flex flex-column    ">
                              <div className=" fs-6">Baseline Project</div>
                              <div className="text-muted fs-6 ">of user</div>
                            </div>
                          </div>
                        </div>




                        <div className="card-body py-2">


                          <div className="t lh-sm fs1">
                            Lorem ipsum dolor sit amet consectetur Lorem ipsum
                            dolor sit amet consectetur, adipisicing

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1">
                    <div className="card border-0 rounded-3 ">
                      <div className="row g-0  ">
                        <div className="d-flex flex-row justify-content-center align-items-center ">
                          <div className="col-md-4 px-3 pt-2">

                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                              alt="image"
                              className=" img-fluid rounded-3"
                              width="100px"
                            />
                          </div>

                          <div className="col-lg-8 px-1 pt-2">
                            <div className="d-flex flex-column    ">
                              <div className=" fs-6">Baseline Project</div>
                              <div className="text-muted fs-6 ">of user</div>
                            </div>
                          </div>
                        </div>




                        <div className="card-body py-2">


                          <div className="t lh-sm fs1">
                            Lorem ipsum dolor sit amet consectetur Lorem ipsum
                            dolor sit amet consectetur, adipisicing

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-1">
                    <div className="card border-0 rounded-3 ">
                      <div className="row g-0  ">
                        <div className="d-flex flex-row justify-content-center align-items-center ">
                          <div className="col-lg-4 px-3 pt-2">

                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                              alt="image"
                              className=" img-fluid rounded-3"
                              width="100px"
                            />
                          </div>

                          <div className="col-lg-8 px-1 pt-2">
                            <div className="d-flex flex-column    ">
                              <div className=" fs-6">Baseline Project</div>
                              <div className="text-muted fs-6 ">of user</div>
                            </div>
                          </div>
                        </div>




                        <div className="card-body py-2">


                          <div className="t lh-sm fs1">
                            Lorem ipsum dolor sit amet consectetur Lorem ipsum
                            dolor sit amet consectetur, adipisicing

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-3  ">
            <div className="container-fluid mt-2">
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <div className="fs-5">My profile</div>
                  <div className="fs-6">
                    <span className="color1">70%</span> Progress
                  </div>
                </div>
                <div className="dropdown float-end">
                  <button
                    className="btn border-0 "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    <span>
                      <BsThreeDots />
                    </span>
                  </button>
                  <div className="dropdown-menu">
                    <li>
                      <a href="" className="dropdown-item">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="" className="dropdown-item">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="" className="dropdown-item">
                        Contact
                      </a>
                    </li>
                  </div>
                </div>
              </div>

              <div className="  text-center  border-0 rounded-0   p-2">
                <div className="">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                    alt="img"
                    className="rounded-circle border border-top-0  border-start-0  border-3 p-1  border-danger"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="d-flex flex-column">
                  <div className="fs-5 fw-semibold">James Lee</div>
                  <div className="text-muted fs-6">jameslee1@gmail.com</div>
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <p className="fs-6">Today</p>
                <button className="btn border-0 float-end color1">
                  View All
                </button>
              </div>
              <div className=" border-0  py-1 ">
                <div className="d-flex justify-content-around align-items-center py-1">
                  <div className="text-center">
                    <span className="color3 p-2 rounded-circle fs-6 text-white">
                      <FaMarker />
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className=""> Eli Jang</div>
                    <div className="fs1"> Create a new project</div>
                  </div>
                  <div className="">
                    <span className="fs-5">
                      <MdKeyboardArrowRight />
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-around align-items-center py-1">
                  <div className="text-center">
                    <span className="color3 p-2 rounded-circle fs-6 text-white">
                      <FaMarker />
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className=""> Eli Jang</div>
                    <div className="fs1"> Create a new project</div>
                  </div>
                  <div className="">
                    <span className="fs-5">
                      <MdKeyboardArrowRight />
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-around align-items-center py-1">
                  <div className="text-center">
                    <span className="color3 p-2 rounded-circle fs-6 text-white">
                      <FaMarker />
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className=""> Eli Jang</div>
                    <div className="fs1"> Create a new project</div>
                  </div>
                  <div className="">
                    <span className="fs-5">
                      <MdKeyboardArrowRight />
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <p className="fs-6 mt-1">Team</p>
                <button className="btn border-0 float-end color1">
                  View All
                </button>
              </div>
              <div className="card border-0 color2 py-1">
                <div className="d-flex justify-content-around align-items-center py-1">
                  <div className="text-center">
                    <img
                      src="https://pm1.aminoapps.com/7629/29d6afe7e852a049ad1700a7330a8c4c22f616adr1-2048-2048v2_hq.jpg"
                      alt="img"
                      className="rounded-circle border-0"
                      width={"50px"}
                    />
                  </div>
                  <div className="">Eli Jang</div>
                  <div className=""><span className="text-success"><GoDotFill /></span></div>
                </div>
                <div className="d-flex justify-content-around align-items-center py-1">
                  <div className="text-center">
                    <img
                      src="https://pm1.aminoapps.com/7629/29d6afe7e852a049ad1700a7330a8c4c22f616adr1-2048-2048v2_hq.jpg"
                      alt="img "
                      width={"50px"}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="">Eli Jang</div>
                  <div className=""><span className="text-danger"><GoDotFill /></span></div>
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

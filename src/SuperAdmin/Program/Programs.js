import React, { useEffect } from "react";
import "../../styles/Superadmin/program.css"
import { Link } from "react-router-dom";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { CiSearch } from "react-icons/ci"
import { FaBell } from "react-icons/fa6"
import { RiCloseFill, RiDownload2Line } from "react-icons/ri"
import { IoMdShare } from "react-icons/io"
import { GrView } from "react-icons/gr";

export default function ListAgent() {
    return (
        <div>
            <div class="position-fixed">
                <div class="fixed-element">
                    <Sidebar />
                </div>
            </div>
            <Header />
            <div className='scroll-bar' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)' }}>
                <div className='container mb-4' style={{ background: "#fcf6f9" }} >
                    <div className="row d-flex align-items-center mt-8 ">
                        <div className='col-md-4 col-sm-6 mt-lg-8 mt-8 d-flex gap-4 justify-content-center align-items-center'>
                            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                            <h5>Welcome back, 🙋‍♂️ </h5>
                        </div>
                        <div className='col-md-6 col-sm-12 mt-lg-0 mt-2 position-relative'  >
                            <span class=" position-absolute start-25 text-center  p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
                            <input
                                type="search"
                                placeholder="Search"
                                aria-describedby="button-addon3"
                                className="form-control-lg bg-white border-0 ps-5 rounded-4 w-100 "
                                style={{ background: "white" }}
                            />
                        </div>
                        <div className='col-md-2 col-sm-12 mt-lg-0 mt-2 d-flex justify-content-center gap-4'>
                            <span><FaBell className="fs-5" /></span>
                            <span><RiDownload2Line className="fs-5" /></span>
                            <span><IoMdShare className="fs-5" /></span>
                        </div>
                    </div>
                    <div className='container-fluid px-4 d-flex flex-column   gap-4  bg-light mt-8'   >
                        <div className='row gap-lg-12 gx-5 gap-md-2 gap-8 p-0 mt-5 d-flex justify-content-center'>
                            <div className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                <div className="card  rounded-4  community" >
                                    <div className=" ">                                     
                                        <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg' className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />                                        
                                        <div className="position-absolute top-55 start-50 translate-middle">
                                            <img src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png' className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="card-body mt-5 text-center">
                                        <p className="card-text border-0 ">PES University</p>
                                        <p className="card-text border-0 ">UK</p>
                                        <div className='mt-2 connect-btn'>
                                            <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' >Python</button>
                                            <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' ><GrView />View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                <div className="card  rounded-4  community" >
                                    <div className=" ">   
                                        <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg' className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />
                                        <div className="position-absolute top-55 start-50 translate-middle">
                                            <img src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png' className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="card-body mt-5 text-center">
                                        <p className="card-text border-0 ">PES University</p>
                                        <p className="card-text border-0 ">UK</p>
                                        <div className='mt-2 connect-btn'>
                                            <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' >Python</button>
                                            <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' ><GrView />View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                <div className="card  rounded-4  community" >
                                    <div className=" "> 
                                        <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg' className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />
                                        <div className="position-absolute top-55 start-50 translate-middle">
                                            <img src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png' className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="card-body mt-5 text-center">
                                        <p className="card-text border-0 ">PES University</p>
                                        <p className="card-text border-0 ">UK</p>
                                        <div className='mt-2 connect-btn'>
                                            <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' >Python</button>
                                            <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' ><GrView />View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                <div className="card  rounded-4  community" >
                                    <div className=" ">
                                        <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg' className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />
                                        <div className="position-absolute top-55 start-50 translate-middle">
                                            <img src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png' className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="card-body mt-5 text-center">
                                        <p className="card-text border-0 ">PES University</p>
                                        <p className="card-text border-0 ">UK</p>
                                        <div className='mt-2 connect-btn'>
                                            <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' >Python</button>
                                            <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' ><GrView />View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                <div className="card  rounded-4  community" >
                                    <div className=" ">
                                        <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg' className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />
                                        {/* Profile Image */}
                                        <div className="position-absolute top-55 start-50 translate-middle">
                                            <img src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png' className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="card-body mt-5 text-center">
                                        <p className="card-text border-0 ">PES University</p>
                                        <p className="card-text border-0 ">UK</p>
                                        <div className='mt-2 connect-btn'>
                                            <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' >Python</button>
                                            <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' ><GrView />View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                <div className="card  rounded-4  community" >
                                    <div className=" ">
                                        {/* Banner Image */}
                                        <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg' className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />
                                        {/* Profile Image */}
                                        <div className="position-absolute top-55 start-50 translate-middle">
                                            <img src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png' className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="card-body mt-5 text-center">
                                        <p className="card-text border-0 ">PES University</p>
                                        <p className="card-text border-0 ">UK</p>
                                        <div className='mt-2 connect-btn'>
                                            <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' >Python</button>
                                            <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' ><GrView />View</button>
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
}

import React from 'react'
import { FaPaypal } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from 'recharts';
import { PieChart, Pie } from "recharts";
import { AreaChart, Area } from 'recharts';
import { ScatterChart, Scatter } from 'recharts';
import { FaBell } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { FaBars } from 'react-icons/fa6';
import Sidebar from '../../compoents/AgentSidebar'

export const StudentDashBoard = () => {

    const data1 = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];
    const data2 = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];
    const data3 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
        { name: "Group E", value: 278 },
        { name: "Group F", value: 189 }
    ];
    const data5 = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
    ];
    const data4 = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: -1000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 500, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: -2000, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: -250, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];
    const gradientOffset = () => {
        const dataMax = Math.max(...data4.map((i) => i.uv));
        const dataMin = Math.min(...data4.map((i) => i.uv));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };
  return (
    <div>
        <Sidebar/>
        <div className="content-wrapper"style={{  fontFamily: 'Plus Jakarta Sans',fontSize:'14px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className='container-fluid' >
            <nav className="navbar navbar-expand-lg">
                <div className="container">


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FaBars />
                    </button>

                    <div className="collapse navbar-collapse  " id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item fw-semibold d-none d-lg-inline">
                                <form className="d-flex ">
                                    <div className="input-group ">
                                        <input type="text" className="form-control  border-warning  rounded-2 " placeholder="Search" />
                                        <button type="submit" className="btn btn-light rounded-circle border-0 mx-2">
                                            <IoMdSearch />
                                        </button>
                                    </div>
                                </form>
                            </li>
                            <li className="nav-item fw-semibold d-none d-lg-inline">
                                <button type="button" className="btn position-relative">
                                    <span className="fs-5"><FaBell /></span>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">+99 <span className="visually-hidden">unread messages</span></span>
                                </button>
                            </li>
                            <li className="nav-item fw-semibold d-none d-lg-inline">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                                    alt="user profile"
                                    className=" img-fluid rounded-pill border-0 ms-4"
                                    style={{ width: '40px', height: "40px" }}
                                />
                            </li>
                            <li className="nav-item fw-semibold d-block d-lg-none">
                                <a className="nav-link active" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item fw-semibold d-block d-lg-none">
                                <a className="nav-link" href="#">
                                    About
                                </a>
                            </li>
                            <li className="nav-item fw-semibold d-block d-lg-none">
                                <a className="nav-link" href="#">
                                    Programs
                                </a>
                            </li>
                            <li className="nav-item fw-semibold d-block d-lg-none">
                                <a className="nav-link" href="#">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item fw-semibold d-block d-lg-none">
                                <a className="nav-link" href="#">
                                    Profile
                                </a>
                            </li>
                            <li className="nav-item fw-semibold d-block d-lg-none">
                                <a className="nav-link" href="#">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid  ">
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card border-0 rounded-3 one shadow " style={{ width: "100%" }}>
                            <div className="card-body px-3 pt-1">
                                <h5 className="card-title  fw-semibold pt-1 color2 m-2">Dashboard</h5>
                                <div className="card rounded-2 border-0 py-2 mt-1 px-4 two shadow-lg" style={{ width: '100%' }}>
                                    <p className="card-title text-white  pt-2 fw-light ">03/24</p>
                                    <p className="card-text text-white fw-normal pt-2 ">4354 1123 6432 7889</p>
                                    <p className="card-text text-white pt-2  fw-light">Card Holder</p>
                                    <p className="card-text  text-white ">James Lee</p>
                                </div>
                                <div className="d-flex justify-content-between mt-1 mx-2 py-2">
                                    <p className="card-title  fw-medium ">Income</p>
                                    <p className="card-title  fw-medium ">See More</p>
                                </div>
                                <div className="row mt-1">
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-2 shadow" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title fw-medium " style={{color:'#fe5722'}}>Salary</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaMoneyCheckAlt /></span>
                                                </div>
                                                <p className="card-text  fw-semibold pt-4 color2">$2,000</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-2 shadow" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title  fw-medium" style={{color:'#fe5722'}}>Paypal</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaPaypal /></span>
                                                </div>
                                                <p className="card-text  fw-semibold pt-4 color2">$12,560.75</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-2 shadow" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title   fw-medium " style={{color:'#fe5722'}}>Invoice</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaWallet /></span>
                                                </div>
                                                <p className="card-text  fw-semibold pt-4 color2">$1,500<span className='text-muted fs-6 fw-medium'>/mo</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-2 shadow" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title " style={{color:'#fe5722'}}>Subscription</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaYoutube /></span>
                                                </div>
                                                <p className="card-text  fw-semibold pt-4 color2">$2,000<span className='text-muted fs-6 fw-medium'>/mo</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row px-2 ">
                            <div className="card shadow-lg one border-0 rounded-3  py-1">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <p className="card-title text-muted fw-semibold">My Balance</p>
                                            <p className=" fw-semibold ">$17,754.00</p>
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-light rounded-4 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Monthly <FaCaretDown />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Daily</a></li>
                                                <li><a className="dropdown-item" href="#">Weekly</a></li>
                                                <li><a className="dropdown-item" href="#">Monthly</a></li>
                                                <li><a className="dropdown-item" href="#">Yearly</a></li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="charts">
                                        <div style={{ width: '100%', height: 180 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={data1}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row px-2'>
                            <div className="card shadow-lg  one border-0 rounded-2 " >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <p className="card-title text-muted fw-semibold">My Balance</p>
                                            <p className="fw-semibold three">$17,754.00</p>
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-light rounded-4 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Monthly <FaCaretDown />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Daily</a></li>
                                                <li><a className="dropdown-item" href="#">Weekly</a></li>
                                                <li><a className="dropdown-item" href="#">Monthly</a></li>
                                                <li><a className="dropdown-item" href="#">Yearly</a></li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="charts">
                                        <ResponsiveContainer width="100%" height={180}>
                                            <BarChart data={data2}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="pv" fill="#8884d8" />
                                                <Bar dataKey="uv" fill="#82ca9d" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container">
                        <div className="row ">

                            <div className=" col-lg-6">
                                <div className="card shadow-lg  one border-0 rounded-2 px-3 py-1"  >
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <p className="card-title text-muted fw-semibold">My Balance</p>
                                                <p className=" fw-semibold ">$17,754.00</p>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-light rounded-4 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Monthly <FaCaretDown />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Daily</a></li>
                                                    <li><a className="dropdown-item" href="#">Weekly</a></li>
                                                    <li><a className="dropdown-item" href="#">Monthly</a></li>
                                                    <li><a className="dropdown-item" href="#">Yearly</a></li>
                                                </ul>
                                            </div>

                                        </div>
                                        <div className="charts">
                                            <PieChart width={400} height={150}>
                                                <Pie
                                                    dataKey="value"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    data={data3}
                                                    cx={180}
                                                    cy={110}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    label
                                                />
                                            </PieChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-lg-6">
                                <div className="card shadow-lg  one border-0 rounded-2 px-3 py-1" >
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <p className="card-title text-muted fw-semibold">My Balance</p>
                                                <p className=" fw-semibold ">$17,754.00</p>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-light rounded-4 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Monthly <FaCaretDown />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Daily</a></li>
                                                    <li><a className="dropdown-item" href="#">Weekly</a></li>
                                                    <li><a className="dropdown-item" href="#">Monthly</a></li>
                                                    <li><a className="dropdown-item" href="#">Yearly</a></li>
                                                </ul>
                                            </div>

                                        </div>

                                        <div className="charts">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mb-3">
                        <div className="row">

                            <div className=" col-lg-6">
                                <div className="card shadow-lg  one border-0 rounded-2 px-3 py-1" >
                                    <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <p className="card-title text-muted fw-semibold">My Balance</p>
                                                <p className=" fw-semibold ">$17,754.00</p>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-light rounded-4 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Monthly <FaCaretDown />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Daily</a></li>
                                                    <li><a className="dropdown-item" href="#">Weekly</a></li>
                                                    <li><a className="dropdown-item" href="#">Monthly</a></li>
                                                    <li><a className="dropdown-item" href="#">Yearly</a></li>
                                                </ul>
                                            </div>

                                        </div>
                         

                                       
                                        <div className="charts">
                                            <ResponsiveContainer width="100%" height={150}>
                                                <ScatterChart
                                                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                                >
                                                    <CartesianGrid />
                                                    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                                                    <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                                    <Scatter name="A school" data={data5} fill="#8884d8" />
                                                </ScatterChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-lg-6  ">
                                <div className="d-flex  justify-content-between align-items-start">
                                    <div className=" fw-semibold  ">Transcation History</div>
                                    <div className="float-end px-4">
                                        <div class="dropdown ">
                                            <button class="btn btn-light rounded-4 border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort by <FaCaretDown />
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Date</a></li>
                                                <li><a class="dropdown-item" href="#">Alphabet</a></li>
                                                <li><a class="dropdown-item" href="#">Data Added</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>




                                <table className="table  table-hover table-responsive-sm mt-2 bg-white  "  style={{height:"200px",overflowY:"auto"}}>
                                    <tbody>
                                        <tr>
                                            <td className='px-4 py-2'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-3 fw-medium py-2'>Shopping</td>
                                            <td className='px-3 text-primary py-2'>05 June 2021</td>
                                            <td className='px-3 fw-semibold py-2'>$300</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-2'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-3 fw-medium py-2'>Bakery</td>
                                            <td className='px-3 text-primary py-2'>04 June 2021</td>
                                            <td className='px-3 fw-semibold py-2'>$35</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-2'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-3 fw-medium py-2'>Restaurant</td>
                                            <td className='px-3 text-primary py-2'>03 June 2021</td>
                                            <td className='px-3 fw-semibold py-2'>$400</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-2'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-3 fw-medium py-2'>Shopping</td>
                                            <td className='px-3 text-primary py-2'>05 June 2021</td>
                                            <td className='px-3 fw-semibold py-2'>$300</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-2'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-3 fw-medium py-2'>Bakery</td>
                                            <td className='px-3 text-primary py-2'>04 June 2021</td>
                                            <td className='px-3 fw-semibold py-2'>$35</td>
                                        </tr>
                                        <tr>
                                            <td className='px-4 py-2'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-3 fw-medium py-2'>Restaurant</td>
                                            <td className='px-3 text-primary py-2'>03 June 2021</td>
                                            <td className='px-3 fw-semibold py-2'>$400</td>
                                        </tr>


                                    </tbody>
                                </table>


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
  )
}
export default StudentDashBoard
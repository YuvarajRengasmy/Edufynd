import React from 'react'
import { FaPaypal } from "react-icons/fa";
import './HeroContent.css'
import { FaCaretDown } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import Chart from '../Charts/Chart';
import Chart2 from '../Charts/Chart2';
import Chart3 from '../Charts/Chart3';
import Charts4 from '../Charts/Charts4';
import Chart5 from '../Charts/Chart5';


const HeroContent = () => {
    return (
        <div>
            <div className="container-fluid  ">
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="card border-0 rounded-4 one shadow ">
                            <div className="card-body px-4">
                                <h5 className="card-title fs-6 fw-semibold pt-1 color2 mx-2">Dashboard</h5>
                                <div className="card rounded-5 border-0 py-2 mt-1 px-4 two shadow-lg" style={{ width: '85%' }}>
                                    <p className="card-title text-white fs-5 pt-2 fw-light ">03/24</p>
                                    <p className="card-text text-white fw-normal pt-2 fs-5">4354 1123 6432 7889</p>
                                    <p className="card-text text-white pt-2  fs-6 fw-light">Card Holder</p>
                                    <p className="card-text  text-white fs-5">James Lee</p>
                                </div>
                                <div className="d-flex justify-content-between mt-1 mx-2 py-2">
                                    <p className="card-title fs-6 fw-medium color2">Income</p>
                                    <p className="card-title color1 fs-6  fw-medium ">See More</p>
                                </div>
                                <div className="row mt-1">
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-4" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title fs-6 text-muted fw-medium ">Salary</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaMoneyCheckAlt /></span>
                                                </div>
                                                <p className="card-text fs-4 fw-semibold pt-4 color2">$2,000</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-4" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title fs-6 text-muted fw-medium">Paypal</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaPaypal /></span>
                                                </div>
                                                <p className="card-text fs-4 fw-semibold pt-4 color2">$12,560.75</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-4" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title fs-6 text-muted fw-medium">Invoice</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaWallet /></span>
                                                </div>
                                                <p className="card-text fs-4 fw-semibold pt-4 color2">$1,500<span className='text-muted fs-6 fw-medium'>/mo</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 mb-2">
                                        <div className="card border-0 rounded-4" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title fs-6">Subscription</p>
                                                    <span className='color1 bg-light rounded-circle px-2 py-1'><FaYoutube /></span>
                                                </div>
                                                <p className="card-text fs-4 fw-semibold pt-4 color2">$2,000<span className='text-muted fs-6 fw-medium'>/mo</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <Chart />
                        <Chart2 />

                    </div>
                    <div className="container">
                        <div className="row">
                            
                            <div className=" col-lg-6">
                                <Chart3 />
                            </div>
                            <div className=" col-lg-6">
                                <Charts4 />
                            </div>
                        </div>
                    </div>
                    <div className="container mb-3">
                        <div className="row">
                           
                            <div className=" col-lg-6">
                                <Chart5 />
                            </div>

                            <div className=" col-lg-6 mt-2 ">
                                <div className="d-flex mt-1 justify-content-between">
                                    <div className=" fw-semibold fs-5 color2">Transcation History</div>
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



                                      
                                        <table className="table table-borderless table-hover table-responsive-sm mt-2  " >
                                    <tbody>
                                        <tr>
                                            <td className='px-5 py-4'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-5 fw-medium py-4'>Shopping</td>
                                            <td className='px-4 text-primary py-4'>05 June 2021</td>
                                            <td className='px-4 fw-semibold py-4'>$300</td>
                                        </tr>
                                        <tr>
                                            <td className='px-5 py-4'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-5 fw-medium py-4'>Bakery</td>
                                            <td className='px-4 text-primary py-4'>04 June 2021</td>
                                            <td className='px-4 fw-semibold py-4'>$35</td>
                                        </tr>
                                        <tr>
                                            <td className='px-5 py-4'><span className='color1 bg-light rounded-5 px-2 pt-1 pb-2'><FaBagShopping /></span></td>
                                            <td className='px-4 fw-medium py-4'>Restaurant</td>
                                            <td className='px-4 text-primary py-4'>03 June 2021</td>
                                            <td className='px-4 fw-semibold py-4'>$400</td>
                                        </tr>


                                    </tbody>
                                </table>
                                        
                             
                            </div>



                        </div>
                    </div>




                </div>
            </div>
        </div>
    )
}
export default HeroContent
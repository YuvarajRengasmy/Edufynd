import React, { useState, useEffect } from "react";
import { getSingleForexEnquiry } from "../../../api/Enquiry/Forex";
import { useLocation } from "react-router-dom";
import Flags from 'react-world-flags';
import Mastersidebar from '../../../compoents/sidebar';

export const ViewForex = () => {
  
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [forex, setForex] = useState(null);

  useEffect(() => {
    getForexDetails();
  }, []);

  const getForexDetails = () => {
    getSingleForexEnquiry(id)
      .then((res) => {
        setForex(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div >
      
          <Mastersidebar />
       
        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header">

          <div class="container mt-4">
    <div class="card shadow-sm rounded">
      <div class="card-header bg-primary text-white text-center">
        <h4 class="card-title">Forex Inquiry Profile</h4>
      </div>
      <div class="card-body">
        <h5 class="mb-4">Agent Information</h5>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-user-tie fa-2x me-2 text-dark"></i>
              <div>
                <strong>Agent Name:</strong>
                <p class="mb-0">Jane Smith</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-building fa-2x me-2 text-dark"></i>
              <div>
                <strong>Business Name:</strong>
                <p class="mb-0">ABC Enterprises</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-envelope fa-2x me-2 text-dark"></i>
              <div>
                <strong>Agent Email ID:</strong>
                <p class="mb-0">jane.smith@abc.com</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-phone fa-2x me-2 text-dark"></i>
              <div>
                <strong>Agent Primary Number:</strong>
                <p class="mb-0">+1234567890</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-whatsapp fa-2x me-2 text-success"></i>
              <div>
                <strong>Agent WhatsApp Number:</strong>
                <p class="mb-0">+0987654321</p>
              </div>
            </div>
          </div>
        </div>

        <h5 class="mt-4 mb-4">Student Information</h5>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-user fa-2x me-2 text-dark"></i>
              <div>
                <strong>Name of the Student:</strong>
                <p class="mb-0">John Doe</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-passport fa-2x me-2 text-dark"></i>
              <div>
                <strong>Passport No:</strong>
                <p class="mb-0">A12345678</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-calendar-alt fa-2x me-2 text-dark"></i>
              <div>
                <strong>Expiry Date:</strong>
                <p class="mb-0">2025-12-31</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-envelope fa-2x me-2 text-dark"></i>
              <div>
                <strong>Email ID:</strong>
                <p class="mb-0">johndoe@example.com</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-phone fa-2x me-2 text-dark"></i>
              <div>
                <strong>Primary Number:</strong>
                <p class="mb-0">+1234567890</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-whatsapp fa-2x me-2 text-success"></i>
              <div>
                <strong>WhatsApp Number:</strong>
                <p class="mb-0">+0987654321</p>
              </div>
            </div>
          </div>
        </div>

        <h5 class="mt-4 mb-4">Transaction Details</h5>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-university fa-2x me-2 text-dark"></i>
              <div>
                <strong>University Name:</strong>
                <p class="mb-0">Harvard University</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-book fa-2x me-2 text-dark"></i>
              <div>
                <strong>Course:</strong>
                <p class="mb-0">Computer Science</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-credit-card fa-2x me-2 text-dark"></i>
              <div>
                <strong>Payment Type:</strong>
                <p class="mb-0">Bank Transfer</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-globe fa-2x me-2 text-dark"></i>
              <div>
                <strong>Country:</strong>
                <p class="mb-0">USA</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-dollar-sign fa-2x me-2 text-dark"></i>
              <div>
                <strong>Currency:</strong>
                <p class="mb-0">USD</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <i class="fas fa-money-bill-wave-alt fa-2x me-2 text-dark"></i>
              <div>
                <strong>Amount In Currency:</strong>
                <p class="mb-0">$10,000</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <i class="fas fa-user-tag fa-2x me-2 text-dark"></i>
              <div>
                <strong>Assigned To:</strong>
                <p class="mb-0">Alex Johnson</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <i class="fas fa-percent fa-2x me-2 text-dark"></i>
              <div>
                <strong>Mark up:</strong>
                <p class="mb-0">5%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <i class="fas fa-calculator fa-2x me-2 text-dark"></i>
              <div>
                <strong>Profit (Value*Mark up):</strong>
                <p class="mb-0">$500</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
            <div className="container-fluid">


              <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                  <h5 className='text-center text-capitalize p-1'>FOREX Details</h5>
                </div>
                <div className="card-body">
                  {forex ? (
                    <table className='table table-hover table-bordered table-striped-columns mt-5' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                      <tbody>
                        <tr>
                          <td className='fw-bold'>Forex ID</td>
                          <td>{forex.forexID}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Source</td>
                          <td>{forex.source}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Agent Name</td>
                          <td>{forex.agentName}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Business Name</td>
                          <td>{forex.businessName}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Agent Primary Number</td>
                          <td>{forex.agentPrimaryNumber}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Agent WhatsApp Number</td>
                          <td>{forex.agentWhatsAppNumber}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Agent Email</td>
                          <td>{forex.agentEmail}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Student Name</td>
                          <td>{forex.studentName}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Passport No</td>
                          <td>{forex.passportNo}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Expiry Date</td>
                          <td>Expiry Date</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Email ID</td>
                          <td>{forex.email}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Primary Number</td>
                          <td>{forex.primaryNumber}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>WhatsApp Number</td>
                          <td>{forex.whatsAppNumber}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>University Name</td>
                          <td>{forex.universityName}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Course</td>
                          <td>Course</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Payment Type</td>
                          <td>{forex.paymentType}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Country</td>
                          <td>{forex.country}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Flag</td>
                          <td><Flags code={forex.flag} className="me-2" name="flag" style={{ width: '40px', height: '30px' }} /></td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Currency</td>
                          <td>{forex.currency}</td>
                        </tr>
                      
                      
                    
                      
                      
                        <tr>
                          <td className='fw-bold'>Amount In Currency</td>
                          <td>{forex.amountInCurrency}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Assigned To</td>
                          <td>{forex.assignedTo}</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Mark up</td>
                          <td>Mark up</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Profit (Value*Mark up)</td>
                          <td>Profit (Value*Mark up)</td>
                        </tr>
                        <tr>
                          <td className='fw-bold'>Status</td>
                          <td>{forex.status ? forex.status : "-"}</td>
                        </tr>
                      
                      </tbody>
                    </table>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewForex;

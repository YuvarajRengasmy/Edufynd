import React, { useState, useEffect } from "react";
import { getSingleAgent } from "../../api/agent";
import { Link, useLocation } from "react-router-dom";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";


import { FaUser, FaPassport, FaCalendarAlt, FaFlag, FaBirthdayCake, FaMale, FaPhone, FaWhatsapp } from 'react-icons/fa';
function Profile() {
   
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [agent, setAgent] = useState();
  const pageSize = 5;
 
  
  useEffect(() => {
      getAgentDetails();
  }, []);


  const getAgentDetails = () => {
    getSingleAgent (id)
          .then((res) => {
              setAgent(res?.data?.result);
          })
          .catch((err) => {
              console.log(err);
          });
  };

    return (
        <div style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class=" navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    </nav>
                <nav className="navbar navbar-top navbar-expand">
                    <Header />
                    </nav>
          
            <div className="content-wrapper"  >
            <div className="container-fluid p-4">
  <div className="row">
    <div className="col">
      <div className="card border-0 shadow text-bg-white p-4">
        <div className="bg-transparent mb-3 ">
          <div className="row g-0">
            <div className="col-md-3 text-center">
              <img
                src={agent?.agentBusinessLogo?agent?.agentBusinessLogo:"https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"}
                style={{ width: '150px', height: '150px' }}
                className="img-fluid rounded-pill mx-auto d-block"
                alt="student_image"
              />
            </div>
            <div className="col-md-9">
                <div className="row g-4">
                <div className="col-sm-6">
                <div className="d-flex flex-row flex-wrap align-items-start justify-content-around">
                
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-bold" ><FaUser style={{color:'#fe5722'}} /> Agent Code</p>
                  <p className="card-text text-capitalize fw-bold"><FaPassport  style={{color:'#fe5722'}} /> Agent Name</p>
                  <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Source</p>
                  <p className="card-text text-capitalize fw-bold"><FaFlag   style={{color:'#fe5722'}}/>Business Name</p>
                </div>
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-light">{agent?.agentCode}</p>
                  <p className="card-text text-capitalize fw-light">{agent?.agentName}</p>
                  <p className="card-text text-capitalize fw-light">{agent?.source}</p>
                  <p className="card-text text-capitalize fw-light">{agent?.businessName}</p>
                </div>
                </div>
              
                </div>
             <div className="col-sm-6">
             <div className="d-flex flex-row flex-wrap align-items-start justify-content-around">
             <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaBirthdayCake  style={{color:'#fe5722'}} />Email</p>
                    <p className="card-text text-capitalize fw-bold"><FaMale  style={{color:'#fe5722'}} />Commission</p>
                    <p className="card-text text-capitalize fw-bold"><FaPhone  style={{color:'#fe5722'}} />MobileNumber</p>
                    <p className="card-text text-capitalize fw-bold"><FaWhatsapp  style={{color:'#fe5722'}} />whatsApp</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-light">{agent?.email}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.agentsCommission}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.mobileNumber}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.whatsAppNumber}</p>
                  </div>
             </div> 
              </div>
                </div>  
            </div>
          </div>
        </div>
        <hr className="border-4 rounded-2"/>
<div className="header bg-none ">
    <h5>Agent Bank Details</h5>
    <div className="container my-3">
        <div className="row g-3">
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaUser  style={{color:'#fe5722'}} /> Bank Name</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport   style={{color:'#fe5722'}}/>Account Name</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Account Number</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} />  IFSC</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> branch</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} /> Country Interested</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-light">{agent?.bankName}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.accountName}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.accountNumber}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.ifsc}</p>
                    <p className="card-text text-capitalize fw-light">{agent?. branch}</p>
                    <p className="card-text text-capitalize fw-light">{agent?. countryInterested}</p>
                  </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaUser  style={{color:'#fe5722'}} />PanNumber Individual</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport  style={{color:'#fe5722'}} />PanNumber Company</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} />GSTN</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} />INC</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Staff Name</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} />Staff ContactNo</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-light">{agent?.panNumberIndividual}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.panNumberCompany}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.gstn}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.inc}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.staffName}</p>
                    <p className="card-text text-capitalize fw-light">{agent?.staffContactNo}</p>
                  </div>
                  </div>
        </div>
        <div className="row mt-3">
                          <div className="col">
                            <label htmlFor="Country" className="form-label fw-semibold">Address</label>
                            <input
                              name="address"
                              type="text"
                              className="form-control"
                              id="Country"
                              value={agent ? `${agent.addressLine1 || ''} ${agent.addressLine2 || ''}`.trim() : ''}
                            />
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
        </div>
        
    );
}
export default Profile;

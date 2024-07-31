import React, { useState, useEffect } from "react";
import { getSingleAgent } from "../../api/agent";
import { Link, useLocation } from "react-router-dom";

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
    getSingleAgent(id)
      .then((res) => {
        setAgent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div >
     
          <Sidebar />
      


        <div className="content-wrapper"  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}  >
<div className="content-header">


<div class="container-fluid">
        <div class="row">
           
            <div class="col-lg-4">
                <div class="card border-0 text-center">
                    <img  src={agent?.agentBusinessLogo ? agent?.agentBusinessLogo : "https://via.placeholder.com/150"}  class="card-img-top img-fluid rounded-circle mx-auto img-thumbnail mt-3" alt="Agent Photo" style={{width:" 8rem",height:'8rem'}}/>
                    <div class="card-body">
                        <h3 class="agent-name">{agent?.agentName}</h3>
                        <p class="card-text">{agent?.source}</p>
                        <button class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i>  {agent?.email}</button>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-header bg-primary text-white">
                        <h5>Bank Details</h5>
                    </div>
                    <div class="card-body">
                        <p><i class="fas fa-user"></i> <strong>Account Name:</strong> {agent?.accountName}</p>
                        <p><i class="fas fa-university"></i> <strong>Bank Name:</strong> {agent?.bankName}</p>
                        <p><i class="fas fa-sort-numeric-up-alt"></i> <strong>Account Number:</strong>{agent?.accountNumber}</p>
                        <p><i class="fas fa-code-branch"></i> <strong>Branch:</strong> {agent?.branch}</p>
                        <p><i class="fas fa-barcode"></i> <strong>IFSC:</strong>{agent?.ifsc}</p>
                        <p><i class="fas fa-barcode"></i> <strong>Account Type</strong>{agent?.ifsc}</p>
                        <p><i class="fas fa-barcode"></i> <strong>Swift</strong>{agent?.ifsc}</p>
                        <p><i class="fas fa-percentage"></i> <strong>Commission:</strong> {agent?.agentsCommission}</p>
                    </div>
                </div>
            </div>
           
           
            <div class="col-lg-8">
                <div class="card border-0 mb-4">
                    <div class="card-header bg-primary text-white">
                        <h5>Agent Information</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><i class="fas fa-id-badge"></i> <strong>Agent Code:</strong> {agent?.agentCode}</p>
                                <p><i class="fas fa-user-tie"></i> <strong>Agent Name:</strong> {agent?.agentName}</p>
                                <p><i class="fas fa-building"></i> <strong>Business Name:</strong> {agent?.businessName}</p>
                                <p><i class="fas fa-envelope"></i> <strong>Email:</strong> {agent?.email}</p>
                                <p><i class="fas fa-phone-alt"></i> <strong>Mobile Number:</strong>{agent?.mobileNumber}</p>
                                <p><i class="fab fa-whatsapp"></i> <strong>WhatsApp Number:</strong> {agent?.whatsAppNumber}</p>
                                <p><i class="fas fa-map-marker-alt"></i> <strong>Address Line 1:</strong> {agent?.addressLine1}</p>
                                <p><i class="fas fa-map-marker-alt"></i> <strong>Address Line 2:</strong>{agent?.addressLine2}</p>
                                <p><i class="fas fa-map-marker-alt"></i> <strong>Address Line 3:</strong>{agent?.addressLine3}</p>
                            </div>
                           
                            <div class="col-md-6">
                                <p><i class="fas fa-globe"></i> <strong>Country:</strong>{agent?.country}</p>
                                <p><i class="fas fa-map"></i> <strong>State:</strong> {agent?.state}</p>
                                <p><i class="fas fa-city"></i> <strong>City:</strong> {agent?.city}</p>

                                <p><i class="fas fa-hashtag"></i> <strong>PIN:</strong> {agent?.pin}</p>
                                <p><i class="fas fa-university"></i> <strong>Business Website:</strong> {agent?.businessWebsite}</p> 
                                <p><i class="fas fa-file-alt"></i> <strong>GSTN:</strong> {agent?.gstn}</p>
                                <p><i class="fas fa-id-card"></i> <strong>PAN (Individual):</strong> {agent?.panNumberIndividual}</p>
                                <p><i class="fas fa-id-card-alt"></i> <strong>PAN (Company):</strong> {agent?.panNumberCompany}</p>
                                <p><i class="fas fa-user"></i> <strong>Staff Name:</strong> {agent?.staffName}</p>
                                <p><i class="fas fa-phone"></i> <strong>Staff Contact No:</strong> {agent?.staffContactNo}</p>
                            </div>
                        </div>
                    </div>
             
                   
                </div>

                <div class="card border-0 mb-4">
                    <div class="card-header bg-primary text-white">
                        <h5>Business Details</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><i class="fas fa-id-badge"></i> <strong>Registration No:</strong> {agent?.registrationNo}</p>
                                <p><i class="fas fa-business-time"></i> <strong>Business Type:</strong> {agent?.staffContactNo}</p>
                            </div>
                            <div class="col-md-6">
                                <p><i class="fas fa-passport"></i> <strong>Require Visa Filing Support:</strong> {agent?. requireVisaFilingSupport}</p>
                                <p><i class="fas fa-percentage"></i> <strong>Visa Commission:</strong> {agent?.visaCommission}</p>
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
    </>

  );
}
export default Profile;

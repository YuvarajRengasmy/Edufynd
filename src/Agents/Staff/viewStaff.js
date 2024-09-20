import React, { useState, useEffect } from "react";
import Mastersidebar from "../../compoents/AgentSidebar";
import { useLocation } from "react-router-dom";
import { getSingleStaff,getSingleStaffLog  } from "../../api/staff";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
export const ViewStaff = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [staff, setStaff] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getUniversityLogs();
    getStaffDetails();
  }, [id]);

  const getUniversityLogs = () => {
    getSingleStaffLog (id)
      .then((res) => {
        setLogs(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const getStaffDetails = () => {
    getSingleStaff(id)
      .then((res) => {
        console.log(res);
        setStaff(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Mastersidebar />

        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header">


          <BackButton/>
        
            <div className="container-fluid ">
            <h2 className="mb-4 text-center">Staff Details</h2>
              <div className="row">
                <div className="col-12 col-md-4 mb-3">
                  <div className="card border-0">
                    <div className="card-body text-center">
                      <img
                        src={
                          staff?.photo
                            ? staff?.photo
                            : "https://via.placeholder.com/150"
                        }
                        alt="Profile Photo"
                        className="img-fluid rounded-circle img-thumbnail  mb-3"
                        style={{ width: "150px", height: "150px" }}
                      />
                      <h5 className="staff-name">{staff?.empName}</h5>
                      <p className="card-text text-muted">{staff?.designation  || "Not Available"}</p>
                      <div className="d-flex justify-content-center">
                        <a href="#" className="btn btn-primary btn-sm me-2">
                          <i className="fas fa-envelope"></i> Email {staff?.email  || "Not Available"}
                        </a>
                        <a href="#" className="btn btn-secondary btn-sm">
                          <i className="fas fa-phone-alt"></i> Call {staff?.mobileNumber  || "Not Available"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-8 mb-3">
                  <div className="card border-0 mb-3">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">Personal Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <i className="fas fa-birthday-cake me-2"></i>
                            <strong>DOB:</strong> {staff?.dob  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-calendar-day me-2"></i>
                            <strong>DOJ:</strong> {staff?.doj  || "Not Available"}
                          </p>
                         
                          <p>
                            <i className="fas fa-clock me-2"></i>
                            <strong>Shift Timing:</strong> {staff?.shiftTiming  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-envelope me-2"></i>
                            <strong>Official Mail:</strong> {staff?.email  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-mobile-alt me-2"></i>
                            <strong>Personal Contact No:</strong>{staff?.dial1}-{staff?.mobileNumber  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-phone-alt me-2"></i>
                            <strong>Emergency Contact:</strong> {staff?.dial2}-{staff?.emergencyContactNo  || "Not Available"}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <i className="fas fa-home me-2"></i>
                            <strong>Address Line1 :</strong> {staff?.address  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-home me-2"></i>
                            <strong>Address Line2:</strong> {staff?.address2  || "Not Available"} 
                          </p>
                         
                          <p>
                            <i className="fas fa-id-card me-2"></i>
                            <strong>ID Card:</strong> {staff?.idCard  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-user-check me-2"></i>
                            <strong>Status:</strong>  {staff?.activeInactive  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-briefcase me-2"></i>
                            <strong>Pin Code:</strong> {staff?.pin  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-calendar-check me-2"></i>
                            <strong>Eligibility for Casual Leave:</strong> {staff?.areTheyEligibleForCasualLeave  || "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="row mb-4">
                  <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-building me-2"></i> Team Management
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Role :</strong> {staff?.role || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Team :</strong>  {staff?.designation || "No Visa Rejections"} 
                    </li>
                    <li className="list-group-item">
                      <strong>probation : </strong> {staff?.probationDuration || "No Visa Rejections"}
                    </li>
                    <li className="list-group-item">
                    <strong>Reporting Manager:</strong> {staff?.reportingManager  || "Not Available"}
                    </li>
                    
                  </ul>

                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                    <i className="fas fa-location-arrow me-2"></i> Location
                     
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>CountryName:</strong> {staff?.country || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>State:</strong>  {staff?.state|| "No Travel History"} 
                    </li>
                    <li className="list-group-item">
                      <strong>City:</strong> {staff?.city || "No Travel History"}
                    </li>
                   
                    
                  </ul>

                </div>
              </div>
              </div>


              <div className="card border-0">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">Professional Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <i className="fas fa-laptop me-2"></i>
                            <strong>Company Assets:</strong> {staff?.companyAssests  || "Not Available"}
                          </p>
                         
                          <p>
                            <i className="fas fa-mobile-alt me-2"></i>
                            <strong>Mobile Brand Name:</strong> {staff?.brandName  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-barcode me-2"></i>
                            <strong>IMEI:</strong> {staff?.imei  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-phone me-2"></i>
                            <strong>Phone Number:</strong>{staff?.dial3}- {staff?.phoneNumber  || "Not Available"}
                          </p>
                          
                        </div>
                        <div className="col-md-6">
                          <p>
                            <i className="fas fa-laptop me-2"></i>
                            <strong>Laptop Brand Name:</strong> {staff?.brand  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-cogs me-2"></i>
                            <strong>Model:</strong> {staff?.modelName  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-network-wired me-2"></i>
                            <strong>IP Address:</strong> 192.168.1.1
                          </p>
                          <p>
                            <i className="fas fa-user me-2"></i>
                            <strong>Username:</strong> {staff?.userName  || "Not Available"}
                          </p>
                          <p>
                            <i className="fas fa-key me-2"></i>
                            <strong>Password:</strong> {staff?.loginPassword  || "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid my-2">
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        {logs.map((log, index) => (
           <li className="mb-4 position-relative" key={index}>
           <div className="row align-items-start g-0">

             <div className="col-1 d-flex justify-content-center align-items-center">
               <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                 <i className="fas fa-check" />
               </div>
             </div>
             <div className="col-4 text-center">
               <p className="mb-1 fw-semibold text-muted">{new Date(log.createdOn).toLocaleString()}</p>
               <p className="mb-0 text-muted">Changed by:<strong>{log.userType || "Unknown User"}</strong></p>
             </div>

             <div className="col-12">
               {log.changes.map((change, changeIndex) => (
                 <div key={changeIndex} className="mb-3">
                   <div className="bg-success text-white rounded-3 p-2">
                     <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i> {change.field}</h6>
                     <p className="mb-0"> <i className="fa fa-database "> New Data --</i>  {change.newValue}</p>
                   </div>
                   <div className="bg-danger text-white rounded-3 p-2 mt-2">
                     <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i>{change.field}</h6>
                     <p className="mb-0"><i className="fa fa-database "> Old Data --</i>{change.oldValue}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
         </li>
        ))}
      </ul>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStaff;

import React, { useState,useEffect } from "react";
import Mastersidebar from '../../compoents/sidebar';
import {  useLocation } from "react-router-dom";
import {  getSingleStaff } from "../../api/staff";
export const ViewStaff = () => {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");




  const [staff, setStaff] = useState([]);



  useEffect(() => {
    getStaffDetails();
  }, []);
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
      <div >
       
          <Mastersidebar />
      
        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                  style={{ background: '#fe5722', color: '#fff' }}
                >
                  <h5 className="text-center text-capitalize p-1">View Staff Details</h5>
                </div>

                <div className="card-body mt-5">
                  <div className="row g-3">
                    <div className="col-md-3 text-center">
                      <img
                        src={staff?.photo?staff?.photo:"https://via.placeholder.com/150"}
                        alt="Profile Photo"
                        className="profile-img mb-3"
                        style={{ width: '12rem', height: '12rem' }}
                      />
                      <h5>Name: {staff?.empName}</h5>
                      <p>Role/Designation: {staff?.designation}</p>
                    </div>

                    <div className="col-md-9">
                    <div className="row">
                      <h5 className="card-info">Personal Information</h5>
                    
                        <div className="col-md-6">
                          <p><strong>Date of Birth (DOB):</strong> {staff?.dob}</p>
                          <p><strong>Date of Joining (DOJ):</strong> {staff?.doj}</p>
                          <p><strong>Reporting Manager:</strong> {staff?.reportingManager}</p>
                          <p><strong>Shift Timing:</strong> {staff?.shiftTiming}</p>
                          <p><strong>Probation Duration:</strong> {staff?.probationDuration}</p>
                          <p><strong>Official Mail:</strong> {staff?.email}</p>
                          <p><strong>Team:</strong>{staff?.team}</p>
                          <p><strong>Personal Mail ID:</strong> {staff?.personalMail}</p>
                          <p><strong>Personal Contact No:</strong> {staff?.mobileNumber}</p>
                          <p><strong>Address:</strong>{staff?.address}</p>
                          <p><strong>Emergency Contact:</strong> {staff?.emergencyContact}</p>
                          <p><strong>ID Card:</strong> {staff?.idCard}</p>
                          <p><strong>Status:</strong>{staff?.status}</p>
                          <p><strong>Job Description:</strong> {staff?.jobDescription}.</p>
                          <p><strong>Eligibility for Casual Leave:</strong> {staff?.areTheyEligibleForCasualLeave}</p>
                        </div>
                        <div className="col-md-6">
                          <h5 className="card-info">Professional Information</h5>
                          <p><strong>Company Assets:</strong> {staff?.companyAssets}</p>
                          <p><strong>Mobile Brand Name:</strong> {staff?.mobileName}</p>
                          <p><strong>IMEI:</strong> {staff?.imei}</p>
                          <p><strong>Phone Number:</strong> {staff?.phoneNumber}</p>
                          <p><strong>Laptop Brand Name:</strong> {staff?.laptopName}</p>
                          <p><strong>Model:</strong>{staff?.model}</p>
                          <p><strong>IP Address:</strong> {staff?.ipAddress}</p>
                          <p><strong>Username:</strong>{staff?.username}</p>
                          <p><strong>Password:</strong>{staff?.password}</p>
                          
                    
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
};

export default ViewStaff;

import React from 'react'
import Mastersidebar from "../../compoents/sidebar";
export const viewStaff = () => {
  return (
    <div>
      <div  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
  <div className='content-header'>
  <div className="container-fluid ">
  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'>View StaffDetails</h5>
                </div>
  
    <div className="card-body mt-5">
      <div className="row g-3">
        <div className="col-md-3 text-center">
          <img src="https://via.placeholder.com/150" alt="Profile Photo" className="profile-img  mb-3"/>
          <h5>Name: JayJo</h5>
          <p>Role/Designation: Full Stack Developer</p>
        </div>
        
        <div className="col-md-9">
        <h5 className="card-info ">Personal Information</h5>
          <div className="row g-4">
            <div className="col-md-6">
              <p><strong>Job Description:</strong> Developing and maintaining web applications.</p>
              <p><strong>Reporting Manager:</strong> Amirtha</p>
              <p><strong>Shift Timing:</strong> 10:00 AM - 7:00 PM</p>
              <p><strong>Eligibility for Casual Leave:</strong> Yes</p>
              <p><strong>Date of Joining (DOJ):</strong> 01/05/2024</p>
              <p><strong>Date of Birth (DOB):</strong> 17/01/2002</p>
            </div>
            <div className="col-md-6">
              <p><strong>Address:</strong> 123 XXX,XX City,XX Country</p>
              <p><strong>Personal Mail ID:</strong> JayJo@example.com</p>
              <p><strong>Personal Contact No:</strong> +1234567890</p>
              <p><strong>Emergency Contact:</strong> +0987654321</p>
              <p><strong>Probation Duration:</strong> 6 months</p>
              <p><strong>Salary:</strong> $60,000/year</p>
            </div>
          </div>
          <h5 className="mt-4">Professional Information</h5>
          <div className="row g-4">
            <div className="col-md-6">
              <p><strong>ID Card:</strong> Issued</p>
              <p><strong>Manage Applications:</strong> Yes</p>
              <p><strong>Status:</strong> Active</p>
            </div>
            <div className="col-md-6">
              <p><strong>Team Lead:</strong> Yuvaj</p>
              <p><strong>Password:</strong> ********</p>
              <p><strong>Confirm Password:</strong> ********</p>
            </div>
          </div>
          <h5 className="mt-4">Contact Information</h5>
          <div className="row">
            <div className="col-md-12 contact-info">
              <p><i className="fas fa-envelope"></i> jayjo@example.com</p>
              <p><i className="fas fa-phone"></i> +1234567890</p>
             
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
  )
}
export default viewStaff
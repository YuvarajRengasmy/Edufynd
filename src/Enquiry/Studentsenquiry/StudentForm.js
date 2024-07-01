import React from 'react';
import Mastersidebar from "../../compoents/sidebar";


export const StudentForm = () => {
  return (
    <div className="student-form" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Mastersidebar />
        </nav>
        <div className="content-wrapper" style={{ backgroundColor: '#fff', fontSize: '14px' }}>
          <div className="content-header">
            <div className="container">
              <div className="card  border-0 shadow p-2 ">
               
                 
                
                    <div className="card-body" style={{textAlign:'justify'}}>
                     
                      <div className='d-flex flex-column align-items-start justify-content-center'>
                      <h5 className="card-title">Student Name</h5>
                      <h5 className="card-title">DOB</h5>
                      <h5 className="card-title">Passport No</h5>
                      <h5 className="card-title">Contact Number</h5>
                      </div>
                      <div className='d-flex flex-column align-items-start justify-content-center'>
                      <h5 className="card-title">Email ID</h5>
                      <h5 className="card-title">CGPA / Year passed</h5>
                      <h5 className="card-title">Desired Country</h5>
                      <h5 className="card-title">Desired Course</h5>
                      <h5 className="card-title">Do you need support for loan?</h5>
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
export default StudentForm;

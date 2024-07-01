import React from 'react'
import Mastersidebar from "../../compoents/sidebar";
export const ViewForex = () => {
  return (
    <div><div className="student-form" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
      <nav className="navbar navbar-vertical navbar-expand-lg">
        <Mastersidebar />
      </nav>
      <div className="content-wrapper" style={{ backgroundColor: '#fff', fontSize: '14px' }}>
        <div className="content-header">
          <div className="container">
            <div className="card  border-0 shadow p-3">
              <div className="row g-0">
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                  <img 
                    src="https://i.pinimg.com/736x/67/b4/96/67b49639339ccdadf672c78cc77a58b9.jpg" 
                    className="img-fluid rounded-circle" 
                    style={{width:'150px', height:'150px'}} 
                    alt="Student" 
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className='d-flex flex-row align-items-center justify-content-between'>
                    <div className='d-flex flex-column align-items-start justify-content-center'>
                    <h5 className="card-title">Student Name:  JayJo</h5>
                    <h5 className="card-title">DOB: 17-01-2000</h5>
                    <h5 className="card-title">Passport No: 1234567abc</h5>
                    <h5 className="card-title">Contact Number: 782972542</h5>
                    </div>
                    <div className='d-flex flex-column align-items-start justify-content-center'>
                    <h5 className="card-title">Email ID: student@1234</h5>
                    <h5 className="card-title">CGPA / Year passed: 9.8</h5>
                    <h5 className="card-title">Desired Country: America</h5>
                    <h5 className="card-title">Desired Course: AI</h5>
                    <h5 className="card-title">Do you need support for loan?: yes</h5>
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
  </div></div>
  )
}
export default ViewForex
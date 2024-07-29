import React from 'react'
import Sidebar from "../../compoents/sidebar";
export const ViewTraining = () => {
  return (
    <> 
    <div >
       
            <Sidebar />
            
          
       
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Training Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Request Training</th>
                      <td>Team Building</td>
                    </tr>
                    <tr>
                      <th>Training Topic</th>
                      <td>Effective Communication</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>2024-08-15</td>
                    </tr>
                    <tr>
                      <th>Time</th>
                      <td>10:00 AM</td>
                    </tr>
                    <tr>
                      <th>Type of Users</th>
                      <td>All Employees</td>
                    </tr>
                    <tr>
                      <th>Attendees</th>
                      <td>50</td>
                    </tr>
                    <tr>
                      <th>Material</th>
                      <td>
                        <a href="path/to/material.pdf" download="TrainingMaterial.pdf" className="btn btn-sm btn-custom">
                          <i className="fa fa-download" aria-hidden="true"></i> Download
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>John Doe</td>
                    </tr>
                    <tr>
                      <th>Upload Document</th>
                      <td>
                        <a href="path/to/document.pdf" download="Document.pdf" className="btn btn-sm btn-custom">
                          <i className="fa fa-download" aria-hidden="true"></i> Download
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>Subject</th>
                      <td>Improving Team Collaboration</td>
                    </tr>
                    <tr>
                      <th>Content</th>
                      <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                    </tr>
                  </tbody>
</table>
                    </div>
                    </div>
                  
                    
               
            </div>
        </div>
    </div>
    </div>
</>
  )
}
export default ViewTraining
import React from 'react'
import Sidebar from "../../compoents/sidebar";
export const ViewMeetings = () => {
  return (
    <> 
    <div >
        
            <Sidebar />
            
          
       
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Meetings Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Host</th>
                      <td>John Doe</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>Project Kickoff</td>
                    </tr>
                    <tr>
                      <th>Attendees</th>
                      <td>Jane Smith, Bob Johnson</td>
                    </tr>
                    <tr>
                      <th>Subject</th>
                      <td>Project Planning</td>
                    </tr>
                    <tr>
                      <th>Content</th>
                      <td>Discussion about project planning and milestones.</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>2024-07-28</td>
                    </tr>
                    <tr>
                      <th>Time</th>
                      <td>10:00 AM</td>
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
export default ViewMeetings
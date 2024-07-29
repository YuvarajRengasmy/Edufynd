import React from 'react'
import Sidebar from "../../compoents/sidebar";
export const ViewEvents = () => {
  return (
    <>  
    <div >
      
            <Sidebar />
            
          
       
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Events Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Type of User</th>
                      <td>Student</td>
                    </tr>
                    <tr>
                      <th>Username</th>
                      <td>John Doe</td>
                    </tr>
                    <tr>
                      <th>Event Topic</th>
                      <td>Advanced React Techniques</td>
                    </tr>
                    <tr>
                      <th>University</th>
                      <td>MIT</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>2024-08-01</td>
                    </tr>
                    <tr>
                      <th>Time</th>
                      <td>10:00 AM</td>
                    </tr>
                    <tr>
                      <th>Venue</th>
                      <td>Room 101, Main Building</td>
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
export default ViewEvents
import React from 'react'
import Sidebar from "../../../compoents/sidebar";

export const ViewCampaign = () => {
  return (
    <>  
    <div >
      
            <Sidebar />
            
          
        
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Campaign Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Platform</th>
                      <td>Facebook</td>
                    </tr>
                    <tr>
                      <th>Campaign Name</th>
                      <td>Summer Sale 2024</td>
                    </tr>
                    <tr>
                      <th>Budget Requested</th>
                      <td>$10,000</td>
                    </tr>
                    <tr>
                      <th>Budget Allotted</th>
                      <td>$8,000</td>
                    </tr>
                    <tr>
                      <th>Time</th>
                      <td>June 1 - June 30, 2024</td>
                    </tr>
                    <tr>
                      <th>Leads Generated</th>
                      <td>1,500</td>
                    </tr>
                    <tr>
                      <th>Leads Converted</th>
                      <td>300</td>
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
export default ViewCampaign
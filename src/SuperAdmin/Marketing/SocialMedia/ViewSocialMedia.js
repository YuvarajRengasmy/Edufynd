import React from 'react'
import Sidebar from "../../../compoents/sidebar";

export const ViewSocialMedia = () => {
  return (
    <>  
    <div >
        
            <Sidebar />
            
          
      
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View SocialMedia Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Social Media</th>
                      <td>Facebook</td>
                    </tr>
                    <tr>
                      <th>Number of Followers</th>
                      <td>25,000</td>
                    </tr>
                    <tr>
                      <th>Number of Campaigns</th>
                      <td>12</td>
                    </tr>
                    <tr>
                      <th>Number of Leads</th>
                      <td>1,200</td>
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
export default ViewSocialMedia
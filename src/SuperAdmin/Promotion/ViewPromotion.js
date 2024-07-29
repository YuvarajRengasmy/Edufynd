import React from 'react'
import Sidebar from "../../compoents/sidebar";
export const ViewPromotion = () => {
  return (
    <>  <div  style={{fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
    <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
            
          
        </nav>
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Promotion Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Type of User</th>
                      <td>Client</td>
                    </tr>
                    <tr>
                      <th>Username</th>
                      <td>John Doe</td>
                    </tr>
                    <tr>
                      <th>Content</th>
                      <td>This is the content of the notification.</td>
                    </tr>
                    <tr>
                      <th>Subject</th>
                      <td>Important Update</td>
                    </tr>
                    <tr>
                      <th>Image</th>
                      <td><img src="path/to/image.jpg" alt="Notification" className="img-fluid" /></td>
                    </tr>
                  </tbody>
</table>
                    </div>
                    </div>
                  
                    
               
            </div>
        </div>
    </div>
    </div>
</div></>
  )
}
export default ViewPromotion
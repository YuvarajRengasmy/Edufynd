import React from 'react'
import Sidebar from "../../../compoents/sidebar";
export const ViewDailyTask = () => {
  return (
    <>  
    <div >
      
            <Sidebar />
            
          
     
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View DailyTask Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>SEO Type</th>
                      <td>On-Page</td>
                    </tr>
                    <tr>
                      <th>Link</th>
                      <td><a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a></td>
                    </tr>
                    <tr>
                      <th>Platform Type</th>
                      <td>Blog</td>
                    </tr>
                    <tr>
                      <th>Poster Name</th>
                      <td>
                        <img src="path/to/photo.jpg" alt="Poster" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <span className="ms-2">John Doe</span>
                      </td>
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
export default ViewDailyTask
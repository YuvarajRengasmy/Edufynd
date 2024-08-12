import React from 'react'
import Sidebar from "../../compoents/sidebar";
import { Link } from 'react-router-dom';
export const ViewTestimonials = () => {
  return (
    <>  
    <div >
        
            <Sidebar />
            
          
       
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
        <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListTestimonials' className="text-decoration-none">ListTestimonials</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditTestimonials",
          
        }} className="text-decoration-none">EditTestimonials</Link>
      </li>
  
  </ol>
</nav>
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Testimonials Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
              <tbody>
                    <tr>
                      <th>Name</th>
                      <td>John Doe</td>
                    </tr>
                    <tr>
                      <th>Course/University</th>
                      <td>Computer Science / MIT</td>
                    </tr>
                    <tr>
                      <th>Location</th>
                      <td>Room 101, Main Building</td>
                    </tr>
                    <tr>
                      <th>Content</th>
                      <td>This training session will cover advanced React techniques, including hooks, context API, and performance optimization.</td>
                    </tr>
                    <tr>
                      <th>Image</th>
                      <td>
                        <img src="path/to/image.jpg" alt="Training" style={{ width: '100px', height: 'auto' }} />
                      </td>
                    </tr>
                    <tr>
                      <th>Counsellor Name</th>
                      <td>Jane Smith</td>
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
export default ViewTestimonials
import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const ViewAccommodation = () => {
  return (
    <div className="student-form" style={{ fontFamily: 'Plus Jakarta Sans' }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Mastersidebar />
        </nav>
        <div className="content-wrapper" style={{ fontSize: '14px' }}>
          <div className="content-header">
            <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'>Accommodation Enquiry Details</h5>
                </div>
               


    
  
      <div class="card-body">
      <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
        <tbody >
          <tr >
            <td className='fw-bold'>Student Name  </td>
            <td>JayJo</td>
           
          </tr>
       
          <tr >
            <td className='fw-bold'>Passport No  </td>
            <td>KIRA1234LIG</td>
          </tr>
          <tr >
            <td className='fw-bold'>Source  </td>
            <td>17/01/2000</td>
          </tr>
          <tr >
            <td className='fw-bold'>University Name </td>
            <td>123456789</td>
          </tr>
          <tr >
            <td className='fw-bold'>Location where accommodation is required </td>
            <td>JayJo@gmail.com</td>
          </tr> <tr >
            <td className='fw-bold'>Assigned To (List Staff) Multiple Assign  </td>
            <td>9.8 CGPA</td>
          </tr>
        
        </tbody>
       </table>
      </div>
   


               
                 
                
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>     
    </div>
  )
}
export default ViewAccommodation
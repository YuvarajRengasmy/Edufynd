import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const ViewFlightTicket = () => {
  return (
    <div className="student-form" style={{ fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
      <nav className="navbar navbar-vertical navbar-expand-lg">
        <Mastersidebar />
      </nav>
      <div className="content-wrapper" style={{ fontSize: '14px' }}>
        <div className="content-header">
          <div className="container">
            <div className="card card-body  border-0 rounded-0 shadow-sm p-4 ">
              <h5 className='text-center text-uppercase'>flight tickets details</h5>
              <hr className='text-dark border-4 border-dark rounded-3'/>
              <div class=" border-0 text-bg-transparent mb-3 p-1" >
<div class="row g-0">
  <div class="col-md-4 align-self-center">
    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" class="img-fluid  w-100  mx-auto d-block " alt="profile-image"/>
  </div>
  <div class="col-md-8">
    <div class="card-body">
     <table className='table table-hover table-striped w-100'>
      <tbody >
        <tr >
          <td className='fw-bold'>Student Name  </td>
          <td>JayJo</td>
         
        </tr>
        <tr >
          <td className='fw-bold'>Date Of Birth  </td>
          <td>17/01/2000</td>
        </tr>
        <tr >
          <td className='fw-bold'>Passport No  </td>
          <td>KIRA1234LIG</td>
        </tr>
        <tr >
          <td className='fw-bold'>Source  </td>
          <td>123456789</td>
        </tr>
        <tr >
          <td className='fw-bold'>Agent Name</td>
          <td>JayJo@gmail.com</td>
        </tr> <tr >
          <td className='fw-bold'>CGPA / Year passed  </td>
          <td>9.8 CGPA</td>
        </tr>
        <tr >
          <td className='fw-bold'>Business Name </td>
          <td>New York</td>
        </tr>
        <tr >
          <td className='fw-bold'>Primary Number  </td>
          <td>Game Devlepor</td>
        </tr>
        <tr >
          <td className='fw-bold'>WhatsApp Number  </td>
          <td>No</td>
        </tr>
        <tr >
          <td className='fw-bold'>Email ID  </td>
          <td>Game Devlepor</td>
        </tr>
        <tr >
          <td className='fw-bold'>Location: From  </td>
          <td>No</td>
        </tr>
        <tr >
          <td className='fw-bold'>Location: To  </td>
          <td>Game Devlepor</td>
        </tr>
        <tr >
          <td className='fw-bold'>Date of Travel  </td>
          <td>No</td>
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
      </div>
    </div>     
  </div>
  )
}
export default ViewFlightTicket
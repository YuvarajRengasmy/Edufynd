import React from 'react'
import Sidebar from "../../compoents/sidebar";
export const ViewComission = () => {
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
        <h5 className='text-center text-capitalize p-1'>View Commission Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
<tbody >
  <tr>
    <td>Country</td>
    <td></td>
  </tr>
  <tr>
    <td>University </td>
    <td></td>
  </tr>
  <tr>
    <td>Payment Method</td>
    <td></td>
  </tr>
  <tr>
    <td>Fixed Amount</td>
    <td></td>
  </tr>
  <tr>
    <td>Commission Paid On</td>
    <td></td>
  </tr>
  <tr>
    <td>Course Fees Percentage</td>
    <td></td>
  </tr>
  <tr>
    <td>Eligibility</td>
    <td></td>
  </tr>
  <tr>
    <td>Tax</td>
    <td></td>
  </tr>
  <tr>
    <td>Payment Type</td>
    <td></td>
  </tr>

</tbody>
</table>
<div className='card border-0 rounded-0 my-3'>
  <h6 className='card-header text-center fw-semibold text-uppercase my-2 rounded-0 bg-white'>Year</h6>
  <div className='card-body'>
  <div class="row justify-content-center align-items-center">
  <div class="col-sm-4 mb-3 mb-sm-0">
    <div class="card  border-0">
      <div class="card-body">
        <h5 class=" text-center">UG</h5>
        <p class="card-text">Intake - </p>
        <p class="card-text">Value - </p>
       
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card border-0">
      <div class="card-body">
        <h5 class=" text-center">PG</h5>
        <p class="card-text">Intake - </p>
        <p class="card-text">Value - </p>
      
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card  border-0">
      <div class="card-body">
        <h5 class=" text-center">PG</h5>
        <p class="card-text">Intake - </p>
        <p class="card-text">Value - </p>
      
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
    </div>
    </div>
</div></>
  )
}
export default ViewComission
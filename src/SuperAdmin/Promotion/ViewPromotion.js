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
<tbody >
  <tr>
    <td>Client ID </td>
    <td>John Doe</td>
  </tr>
  <tr>
    <td>Type of client </td>
    <td>+1234567890</td>
  </tr>
  <tr>
    <td>Business Name</td>
    <td>+0987654321</td>
  </tr>
  <tr>
    <td>Business Mail ID</td>
    <td>john.doe@example.com</td>
  </tr>
  <tr>
    <td>Business Contact No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Website</td>
    <td>$50,000</td>
  </tr>
  <tr>
    <td>Staff Name</td>
    <td>$3,000</td>
  </tr>
  <tr>
    <td>Staff Contact No</td>
    <td>A12345678</td>
  </tr>
  <tr>
    <td>Staff Email ID</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Address</td>
    <td>Jane Doe</td>
  </tr>
  <tr>
    <td>GSTN</td>
    <td>45</td>
  </tr>
  <tr>
    <td>Status</td>
    <td>Employed</td>
  </tr>

  <tr>
    <td>Passport Document</td>
    <td>
      <a href="path/to/passport.pdf" download="PassportDocument.pdf" class="btn btn-sm btn-custom">
        <i class="fa fa-download" aria-hidden="true"></i> Download
      </a>
    </td>
  </tr>
  <tr>
    <td>Offer Letter</td>
    <td>
      <a href="path/to/offerletter.pdf" download="OfferLetter.pdf" class="btn btn-sm btn-custom">
        <i class="fa fa-download" aria-hidden="true"></i> Download
      </a>
    </td>
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
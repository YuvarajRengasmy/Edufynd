import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const AddBusiness = () => {
  return (
    <div> 
      <div  style={{ fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'14px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Add Business Enquiry</h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Student Name</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Enter Name' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">DOB</label>
                          <input className="form-control" id="inputPassword4" type="text" placeholder='DOB' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Passport No</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Passport No" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Contact Number</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Contact Number' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Email ID</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Email ID'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">CGPA / Year passed</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="CGPA / Year passed" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Desired Country</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Desired Country' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Desired Course</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Desired Course' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Do you need support for loan? </label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Do you need support for loan? " style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
                    <div className='row mb-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save</button>
                        
                       
                          <button className="btn btn-secondary" type="submit">Cancel</button>
                        
                      </div>
                    
                    </div>
                        
                      </form>
  </div>
</div>
        
        </div>
                    
               </div>     
    </div></div>
  )
}
export default AddBusiness
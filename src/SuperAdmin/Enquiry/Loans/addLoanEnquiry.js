import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const addLoanEnquiry = () => {
  return (
    <div> 
      <div  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ backgroundColor: '#fff',fontSize:'13px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Loan Enquiry </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Student Name</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Enter Name'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Primary Number</label>
                          <input className="form-control" id="inputPassword4" type="text" placeholder='Primary Number' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">WhatsApp Number</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="WhatsApp Number"/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Email ID</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Email ID'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Do you have a valid offer from any university? </label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Do you have a valid offer from any university?' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Loan Amount Required</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Loan Amount Required"/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">What is your monthly income?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='What is your monthly income?'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Passport Number</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Passport Number' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Did you apply for loan elsewhere? </label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Did you apply for loan elsewhere? "/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Who is your co-applicant?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Who is your co-applicant?'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Will you submit your collateral if required?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Will you submit your collateral if required?'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Will you submit your collateral if required?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Will you submit your collateral if required?'/>
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
    </div>
    </div>
  )
}
export default addLoanEnquiry
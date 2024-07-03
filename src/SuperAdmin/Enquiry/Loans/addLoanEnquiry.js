import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const addLoanEnquiry = () => {
  return (
    <div> 
      <div  style={{ fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'13px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Loan Enquiry </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Student Name</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Enter Student Name'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword5">Primary Number</label>
                          <input className="form-control" id="inputPassword5" type="text" placeholder='EnterPrimary Number'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">WhatsApp Number</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Enter WhatsApp Number"   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Email ID</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Enter Email ID'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword5">Do you have a valid offer from any university? </label>
                          <input className="form-control" id="inputPassword5" type="Password" placeholder='Enter Do you have a valid offer from any university?'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Loan Amount Required</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Enter Loan Amount Required"   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">What is your monthly income?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Enter What is your monthly income?'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword5">Passport Number</label>
                          <input className="form-control" id="inputPassword5" type="Password" placeholder='Enter Passport Number'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Did you apply for loan elsewhere? </label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Enter Did you apply for loan elsewhere? "   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Who is your co-applicant?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Enter Who is your co-applicant?'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Will you submit your collateral if required?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Enter Will you submit your collateral if required?'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Will you submit your collateral if required?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder=' Enter Will you submit your collateral if required?'   style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
    </div>
                    <div className='row mb-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save</button>
                        
                       
                          <button className="btn" style={{backgroundColor:'#0f2239',color:'#fff'}} type="submit">Cancel</button>
                        
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
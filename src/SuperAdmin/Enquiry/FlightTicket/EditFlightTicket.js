import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const EditFlightTicket = () => {
  return (
    <div> 
       <div  style={{  fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'14px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Flight Ticket Booking </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Name of Student</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Enter Name'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Passport No</label>
                          <input className="form-control" id="inputPassword4" type="text" placeholder='Passport No' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">DOB</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="DOB"/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Source</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Source'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Agent Name</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Agent Name' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Business Name</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Business Name"/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Primary Number</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Primary Number'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">WhatsApp Number</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='WhatsApp Number' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Email ID</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Email ID "/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Primary Number</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Primary Number'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">WhatsApp Number</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='WhatsApp Number' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Email ID</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Email ID "/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Location: From </label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Location: From'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Location: To</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Location: To' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">	Date of Travel</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Date of Travel "/>
                        </div>
    </div>
                    <div className='row mb-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save Changes</button>
                        
                       
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
export default EditFlightTicket
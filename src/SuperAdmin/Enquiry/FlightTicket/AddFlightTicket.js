import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
import Select from 'react-select';
export const AddFlightTicket = () => {
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
    <h4 className='card-title text-center fw-bold'>Add Flight Ticket Booking </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputstudentname">Name of Student</label>
                          <input className="form-control" id="inputstudentname" name='studentname'   type="text" placeholder=' Enter Name'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassportno">Passport No</label>
                          <input className="form-control" id="inputPassportno" name='passportno' type="text" placeholder='Enter Passport No'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputdob">DOB</label>
                          <input className="form-control" id="inputdob" type="text" name='DOB' placeholder="Enter DOB"  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>

    <div className="col">
                          <label className="form-label" for="inputsource">Source</label>
                          <Select
                        isMulti


                        placeholder="Select  Student/Agent"
                        name=" Student/Agent"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                     
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputfromlocation">From Location </label>
                          <input className="form-control" id="inputfromlocation" name='fromlocation' type="text" placeholder='Enter From Location: '  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputtolocation">To Location </label>
                          <input className="form-control" id="inputtolocation" name='tolocation' type="text" placeholder='Enter   To Location:'   style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>

                     
                       
    </div>
    <div className='row mb-3'>
                         <div className='col'>
                      <label className="form-label" for="inputAgentName">Agent Name</label>
                      <input className="form-control" id="inputAgentName" type="text" name='agentname' placeholder='Enter Agent Name'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputbusinessname">Business Name</label>
                      <input className="form-control" id="inputbusinessname" type="text" name='businessname' placeholder='Enter Business Name'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputprimaryno">Primary Number</label>
                      <input className="form-control" id="inputprimaryno" type="text" name='primaryno' placeholder='Enter Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                 
                          </div> 
                          <div className='row mb-3'>
                      <div className='col'>
                      <label className="form-label" for="inputwhatsappno">WhatsApp Number</label>
                      <input className="form-control" id="inputwhatsappno" type="text" name='whatsappno' placeholder='Enter WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputemailid">Email ID</label>
                      <input className="form-control" id="inputemailid" type="email" name='whatsappno' placeholder='Enter Email ID'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      </div>
                      <div className='row mb-3'>
                      <div className='col'>
                      <label className="form-label" for="inputstudentprimaryno"> Student Primary Number</label>
                      <input className="form-control" id="inputstudentprimaryno" name='studentprimaryno' type="text" placeholder='Enter Student Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputstudentwhatsappno">Student WhatsApp Number</label>
                      <input className="form-control" id="inputstudentwhatsappno" type="text" name='studentwhatsappno' placeholder='Enter Student WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                      </div>
    
    <div className='row mb-3'>

                        <div className="col">
                          <label className="form-label" for="inputtraveldate">	Date of Travel</label>
                          <input className="form-control" id="inputtraveldate" name='traveldate' type="text" placeholder="Enter Date of Travel "  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
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
export default AddFlightTicket
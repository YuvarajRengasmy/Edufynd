import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
import Select from 'react-select';
export const AddAccommodation = () => {
  return (
    <div> 
      <div  style={{  fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'13px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Add Accommodation Enquiry </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputstudentname">Name of the Student</label>
                          <input className="form-control" id="inputstudentname" name='studentname'  type="text" placeholder='Name of the Student' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassportno">Passport Number</label>
                          <input className="form-control" id="inputPassportno" type="text" placeholder='Passport Number' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputsource">Source</label>
                          <Select
                        isMulti


                        placeholder="Select  Student/Agent"
                        name=" Student/Agent"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                     
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
                          <label className="form-label" for="inputuniversityname">University Name</label>
                          <input className="form-control" id="inputuniversityname"  name='universityname'  type="text" placeholder='University Name' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputoffer">Holding Offer from the University </label>
                         
                          <Select
                        isMulti


                        placeholder="Select  offer"
                        name="offer"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputlocation" >Location where accommodation is required</label>
                          <input className="form-control" id="inputlocation" name='location' type="Password" placeholder='Location where accommodation is required' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                     
    </div>
    <div className='row mb-3'>   <div className="col">
                          <label className="form-label" for="inputAssignedto">Assigned To (List Staff) Multiple Assign</label>
                          
                          <Select
                        isMulti


                        placeholder="Select  Assigned to"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                        </div></div>
    
                    <div className='row mb-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save</button>
                        
                       
                          <button className="btn " style={{backgroundColor:'#0f2239',color:'#fff'}} type="submit">Cancel</button>
                        
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
export default AddAccommodation
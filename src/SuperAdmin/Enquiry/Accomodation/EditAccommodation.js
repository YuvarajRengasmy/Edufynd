import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
import Select from 'react-select';
export const EditAccommodation = () => {
  return (
    <div> 
      <div  style={{  fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'13px' }}>
<div className='content-header'>
  <div className='container-fluid'>
  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                                            <div
                                                className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                                                style={{ background: "#fe5722", color: "#fff" }}
                                            >
                                                <h6 className="text-center text-capitalize p-1">
                                                    {" "}
                                                   Edit Accommodation Details
                                                </h6>
                                            </div>
  <form className="p-1">
   <div className='card-body mt-5'>
   <div className='row g-3'>
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputstudentname">Name of the Student <span className="text-danger">*</span></label>
                          <input className="form-control" id="inputstudentname" name='studentname'  type="text" placeholder='Name of the Student' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputPassportno">Passport Number <span className="text-danger">*</span></label>
                          <input className="form-control" id="inputPassportno" type="text" placeholder='Passport Number' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputsource">Source <span className="text-danger">*</span></label>
                          <Select
                        isMulti


                        placeholder="Select  Student/Agent"
                        name=" Student/Agent"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                     
                        </div>
    
  
                         <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputAgentName">Agent Name <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputAgentName" type="text" name='agentname' placeholder='Enter Agent Name'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputbusinessname">Business Name <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputbusinessname" type="text" name='businessname' placeholder='Enter Business Name'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputprimaryno">Primary Number <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputprimaryno" type="text" name='primaryno' placeholder='Enter Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                 
                        
                         
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputwhatsappno">WhatsApp Number <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputwhatsappno" type="text" name='whatsappno' placeholder='Enter WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputemailid">Email ID <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputemailid" type="email" name='whatsappno' placeholder='Enter Email ID'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                      
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputstudentprimaryno"> Student Primary Number <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputstudentprimaryno" name='studentprimaryno' type="text" placeholder='Enter Student Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                      <label className="form-label" for="inputstudentwhatsappno">Student WhatsApp Number <span className="text-danger">*</span></label>
                      <input className="form-control" id="inputstudentwhatsappno" type="text" name='studentwhatsappno' placeholder='Enter Student WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                      

    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversityname">University Name <span className="text-danger">*</span></label>
                          <input className="form-control" id="inputuniversityname"  name='universityname'  type="text" placeholder='University Name' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputoffer">Holding Offer from the University <span className="text-danger">*</span> </label>
                         
                          <Select
                        isMulti


                        placeholder="Select  offer"
                        name="offer"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputlocation" > Accommodation  Required Location <span className="text-danger">*</span></label>
                          <input className="form-control" id="inputlocation" name='location' type="Password" placeholder='Accommodation  Required Location' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                     
  
     <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputAssignedto">Assigned To (List Staff) Multiple Assign <span className="text-danger">*</span></label>
                          
                          <Select
                        isMulti


                        placeholder="Select  Assigned to"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                        </div>
                        </div>
   </div>
    
                     
    
                    <div className='row g-2'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      <button className="btn border-0 px-4 py-2 fw-semibold text-uppercase " style={{backgroundColor:'#0f2239',color:'#fff',fontSize:'12px'}} type="submit">Cancel</button>
                          <button className="btn border-0 px-4 py-2 fw-semibold text-uppercase  " type="submit" style={{backgroundColor:'#fe5722',color:'#fff',fontSize:'12px'}}>Submit</button>
                        
                       
                      
                        
                      </div>
                    
                    </div>
                        
                      </form>
                      </div>
  </div>
</div>
        
        </div>
                    
               </div>     
    </div>
      </div>
  )
}
export default EditAccommodation
import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
import Select from 'react-select'
export const EditForex = () => {
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
    <h4 className='card-title text-center fw-bold'>Edit Forex Enquiry </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
  
                        <div className="col">
                          <label className="form-label" for="inputstudentname">Name of the Student</label>
                          <input className="form-control" id="inputstudentname" type="text" name='studentname' placeholder='Enter Name of the Student'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputcountry">Country</label>
                          <input className="form-control" id="inputcountry" type="text" name='country' placeholder="Enter Country" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputcurrency">Currency  </label>
                          <input className="form-control" id="inputEmail4" type="text" name='currency' placeholder='Enter Currency' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
   
                        <div className="col">
                          <label className="form-label" for="inputuniversity">University Name </label>
                          <Select
                        isMulti


                        placeholder="Select   University Name"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputstudentid">Student ID</label>
                          <input className="form-control" id="inputstudentid" name='studentid' type="text" placeholder="Enter Student ID" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputpassportno">Passport No</label>
                          <input className="form-control" id="inputpassportno" name='passportno' type="text" placeholder='Enter Passport No' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>

                        <div className="col">
                          <label className="form-label" for="inputprimarynumber">Primary Number</label>
                          <input className="form-control" id="inputPrimarynumber" name='primarynumber' type="text" placeholder='Enter Primary Number' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputwhatsappnumber">Whatsapp Number</label>
                          <input className="form-control" id="inputwhatsappnumber" name='whatsappnumber' type="text" placeholder="Enter Whatsapp Number " style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputsource">Source</label>
                          <Select
                        isMulti


                        placeholder="Select   University Name"
                        name="University Name"
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
                          <label className="form-label" for="inputemail">Email ID</label>
                          <input className="form-control" id="inputemail" type="email" name='email' placeholder='Enter Email ID' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputpayment">Payment Type </label>
                          <Select
                        isMulti


                        placeholder="Select  Payment Type"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                         
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputamount">Amount In Currency</label>
                          <input className="form-control" id="inputamount" name='amountincurrency' type="text" placeholder='Enter Amount In Currency' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
 
                        <div className="col">
                          <label className="form-label" for="inputassignedto">Assigned To </label>
                          <Select
                        isMulti


                        placeholder="Select   Assigned To"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                        </div>
                     
    </div>
                    <div className='row my-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save Changes</button>
                        
                       
                          <button className="btn " style={{backgroundColor:'#0f2239',color:'#fff'}} type="submit">Cancel</button>
                        
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
export default EditForex
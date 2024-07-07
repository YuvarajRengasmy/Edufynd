import React from 'react'
import Mastersidebar from '../../compoents/sidebar';
import Select from 'react-select';
import { Link} from "react-router-dom";
export const AddApplication = () => {
  return (
    <div> <div  style={{  fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'14px' }}>
<div className='content-header'>
  <div className='container'>
  
  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'> Add Application Details</h5>
                </div>
                      <div className="card-body mt-5">
  <form className="p-1">
   
    <div className='row g-3'>
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputapplicationcode">Application Code </label>
                          <input className="form-control" id="inputapplicationcode" name='studentname'   type="text" placeholder=' Application Code '  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputstudentname">Name of Student</label>
                          <input className="form-control" id="inputstudentname" name='studentname'   type="text" placeholder=' Enter Name'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputdob">DOB</label>
                          <input className="form-control" id="inputdob" type="text" name='DOB' placeholder="Enter DOB"  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputPassportno">Passport No</label>
                          <input className="form-control" id="inputPassportno" name='passportno' type="text" placeholder='Enter Passport No'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputemailid">Email ID</label>
                      <input className="form-control" id="inputemailid" type="email" name='whatsappno' placeholder='Enter Email ID'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputprimaryno">Primary Number</label>
                      <input className="form-control" id="inputprimaryno" type="text" name='primaryno' placeholder='Enter Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                 
                         
                          
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputwhatsappno">WhatsApp Number</label>
                      <input className="form-control" id="inputwhatsappno" type="text" name='whatsappno' placeholder='Enter WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     

  

                     
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputAgentName">Intake</label>
                      <select class="form-select" aria-label="Default select example" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>
  <option selected>Select Intake</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
                      </div>
    
   
                         <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputAgentName">Intake</label>
                      <input className="form-control" id="inputAgentName" type="text" name='agentname' placeholder='Enter Intake'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputbusinessname">University </label>
                      <select class="form-select" aria-label="Default select example" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>
  <option selected>Select University</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
                      </div>
                    
                     
                     
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputstudentprimaryno"> Course</label>
                      <input className="form-control" id="inputstudentprimaryno" name='studentprimaryno' type="text" placeholder='Enter Course'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 '>
                      <label className="form-label" for="inputstudentwhatsappno">Course Fees </label>
                      <input className="form-control" id="inputstudentwhatsappno" type="text" name='studentwhatsappno' placeholder='Enter Course Fees 'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                      
    
   

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputtraveldate">Any visa rejections</label>
                          <input className="form-control" id="inputtraveldate" name='traveldate' type="text" placeholder="Enter Any visa rejections "  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputtraveldate">Fees Paid</label>
                          <input className="form-control" id="inputtraveldate" name='traveldate' type="text" placeholder="Enter Fees Paid "  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <label className="form-label" for="inputtraveldate">Assign To </label>
                          <input className="form-control" id="inputtraveldate" name='traveldate' type="text" placeholder="Enter Assign To "  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
                    <div className='row g-3'>
                    <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                    <Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} to="#" className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} type="submit" className="btn btn-save border-0 text-uppercase fw-semibold px-4 py-2 text-white m-2">
                                        Submit
                                    </button>
                                </div>
                    
                    </div>
                        
                      </form>
                      </div>
                      </div>
  </div>
</div>
        
        </div>
                    
               </div>     
    </div></div>
  )
}
export default AddApplication
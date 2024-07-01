import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const EditAccommodation = () => {
  return (
    <div> 
       <div  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ backgroundColor: '#fff',fontSize:'14px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Accommodation Enquiry </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Name of the Student</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Name of the Student'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Passport Number</label>
                          <input className="form-control" id="inputPassword4" type="text" placeholder='Passport Number' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Source</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Source"/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">University Name</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='University Name'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Location where accommodation is required</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Location where accommodation is required' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Assigned To (List Staff) Multiple Assign</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Assigned To"/>
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
export default EditAccommodation
import React from 'react'
import Mastersidebar from '../../../compoents/sidebar';
export const EditStudentForm = () => {
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
    <h4 className='card-title text-center fw-bold'>Student Form</h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Student Code </label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Student Code'/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Source</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Source'/>
                        </div>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Student Name</label>
                          <input className="form-control" id="inputEmail4"  type="text" placeholder='Enter Name'/>
                        </div>
                        
                      
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputPassword4">DOB</label>
                          <input className="form-control" id="inputPassword4" type="text" placeholder='DOB' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Passport No</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Passport No"/>
                        </div>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Contact Number</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Contact Number'/>
                        </div>
                       
                       
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputPassword4">Email ID</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Email ID' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">CGPA / Year passed</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="CGPA / Year passed"/>
                        </div>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Desired Country</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Desired Country'/>
                        </div>
                      
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputPassword4">Desired Course</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Desired Course' />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Do you need support for loan? </label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Do you need support for loan? "/>
                        </div>
    </div>
                    <div className='row mb-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save changes</button>
                        
                       
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
export default EditStudentForm
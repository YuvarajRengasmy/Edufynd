import React from 'react'
import Sidebar from '../../../compoents/StaffSidebar'
import { Link } from 'react-router-dom'
export const EditTask = () => {
  return (
    <div  >
    <div >
            <Sidebar />
          
        
    
    <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
        <div className="content-header ">
            <div className="container-fluid ">
                <form >
                    <div className="row">            
          <div className="col-xl-12 ">
          <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'> Add Task Details</h5>
        </div>
              <div className="card-body mt-5">
                <div className="row g-3">
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            
                            <label style={{ color: "#231F20" }}>
                                {" "}
                               Name<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name="name"
                                
                                className="form-control "
                                placeholder="Example James Lee"

                            />
                           
                               
                           
                        
                    </div>
               
                   
                       
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                           
                                <label style={{ color: "#231F20" }}>
                              Budget Required<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                    placeholder="Example 50000"
                                    name="budgetrequired"
                                    
                                />
                              
                              
                           
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                           
                                <label style={{ color: "#231F20" }}>
                                    {" "}
                                    Budget Approved<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Example 3000"
                                    style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                    name="budgetapproved"
                                    
                                />
                                
                                   
                               
                            
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            
                                <label style={{ color: "#231F20" }}>
                              Budget Spent<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Example 2000 "
                                    style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                    name="budgetspent"
                                    
                                />
                              

                        </div>

                       

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            
                                <label style={{ color: "#231F20" }}>
                               Outcome <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Example 10000"
                                    style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                    name="outcome"
                                    
                                />
                                
                            
                        </div>


                      
                      
                       
                       
                        <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} to="#" className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2">
                                Cancel
                            </Link>
                            <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="submit" className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2">
                              Update
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</div>
  )
}
export default EditTask
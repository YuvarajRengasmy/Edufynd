import React from 'react'
import Sidebar from '../../../compoents/sidebar'
import { Link } from 'react-router-dom'
export const AddIncome = () => {
  return (
    <div >
            
    <Sidebar />
  


<div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
<div className="content-header ">
    <div className="content container-fluid ">
        <form >
            <div className="row">            
  <div className="col-xl-12 ">
  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
<div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
<h5 className='text-center text-capitalize p-1'> Add Income Details</h5>
</div>
<div className="card-body mt-5">
              <div className="row g-3">
               

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label style={{ color: "#231F20" }}>
                Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="Date"
                    className="form-control text-uppercase "
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    placeholder="Enter UserName"
                    name="date"
                  />
                  
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label style={{ color: "#231F20" }}>
                  	Name Of Income <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    placeholder="Example Office Rent "
                    name="nameofincome"
                  />
                  
                </div>
              
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label style={{ color: "#231F20" }}>
               Recieved from <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    placeholder="Example Monthly Rent Payment  "
                    name="recievedfrom"
                  />
                  
                </div>
                

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label style={{ color: "#231F20" }}>
                Amount<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    placeholder="Example 5000"
                    name="amount"
                  />
                  
                </div>
                
              
              
              
              
                
             
                
               
                

                <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                <Link to='/ListIncome'
                    style={{
                      backgroundColor: "#231F20",
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    type='reset'
                    className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{
                      backgroundColor: "#FE5722",
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    type="submit"
                    className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                  >
                    Submit
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
  )
}
export default AddIncome
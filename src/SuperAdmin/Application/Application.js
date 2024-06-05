import React from 'react'
import Sidebar from '../../compoents/sidebar'

export const Application = () => {
  return (
    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div class="">
        <div class="">
          <Sidebar />

        </div>
      </div>
      <div className="content-wrapper" style={{ backgroundColor: '#fff' }}>
        <div className="content-header ">
          <div className="container-fluid">
            <div className='row align-items-start'>
              <div className='col'>
                <div className='card border-0 shadow '>

                  <div className='card-body' >

                    <div class="position-relative my-4 mx-1 px-5">
                      <div class="progress " style={{ height: "8px" }}>
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Progress" style={{ width: " 70%", backgroundColor: '#fe5722' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <button type="button" class="position-absolute top-0 translate-middle btn btn-sm  btn-primary rounded-pill" style={{ width: "2rem", height: "2rem",left:'5%' }}><i className="fa fa-book  " aria-hidden="true" /></button>

                      <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-success rounded-pill" style={{ width: "2rem", height: "2rem", left: '25%' }}> <i className="fa fa-check" aria-hidden="true" /></button>
                      <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-danger rounded-pill" style={{ width: "2rem", height: "2rem", left: "42%" }}> <i className="fa fa-times" aria-hidden="true" /></button>
                      <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-info rounded-pill" style={{ width: "2rem", height: "2rem", left: "59%" }}> <i className="fa fa-certificate" aria-hidden="true" /></button>
                      <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-success rounded-pill" style={{ width: "2rem", height: "2rem", left: "76%" }}> <i className="fa fa-check" aria-hidden="true" /></button>
                      <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem", left: "95%" }}> <i className="fa fa-registered" aria-hidden="true" /></button>
                    </div>
                    <div className='row'>
                      <div className='col-sm-2 text-center fw-bold ' style={{fontSize:'12px'}}>Application Submitted</div>
                      <div className='col-sm-2 text-center  fw-bold' style={{fontSize:'12px'}}>Processed</div>
                      <div className='col-sm-2 text-center  fw-bold' style={{fontSize:'12px'}}>Rejected</div>
                      <div className='col-sm-2 text-center  fw-bold' style={{fontSize:'12px'}}>Offered</div>
                      <div className='col-sm-2 text-center  fw-bold' style={{fontSize:'12px'}}>Fees Paid</div>
                      <div className='col-sm-2 text-center  fw-bold' style={{fontSize:'12px'}}>Enrolled</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>



  )
}
export default Application
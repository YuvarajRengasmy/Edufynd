import React from 'react';
import './trackapply.css';

import Sidebar from '../../compoents/StudentSidebar';

const TrackApplication = () => {
  return (
    <>
      <Sidebar />
      <section className="vh-100 content-wrapper" style={{ backgroundColor: '#8c9eff', fontSize: '14px', fontFamily: 'Plus Jakarta' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-stepper" style={{ borderRadius: 16 }}>
                <div className="card-body p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <h5 className="mb-0">ApplicationId <span className="text-primary font-weight-bold">#Y34XDHR</span></h5>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">Expected Arrival <span>01/12/19</span></p>
                      <p className="mb-0">ApplicationName: <span className="font-weight-bold">Python</span></p>
                    </div>
                  </div>
                  <ul id="progressbar-2" className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
                    <li className="step0 active text-center" id="step1" />
                    <li className="step0 active text-center" id="step2" />
                    <li className="step0 active text-center" id="step3" />
                    <li className="step0 text-muted text-end" id="step4" />
                  </ul>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <i className="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Application</p>
                        <p className="fw-bold mb-0">Submitted</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <i className="fas fa-eye fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Application</p>
                        <p className="fw-bold mb-0">View</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <i className="fas fa-check fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Application</p>
                        <p className="fw-bold mb-0">Approved</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <i className="fas fa-plane fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Visa</p>
                        <p className="fw-bold mb-0">Approved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrackApplication;

import React from 'react';
import Sidebar from '../../../compoents/StaffSidebar';

export const ViewTask = () => {
  return (
    <div>
      <Sidebar />
      <div className='content-wrapper' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
        <div className='content-header'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='container mt-4'>
                  <h2 className='mb-4' style={{ fontSize: '2rem', fontWeight: '600' }}>Tasks Overview</h2>

                  <div className='row mb-4'>
                    <div className='col-md-4'>
                      <div className='card text-white bg-success mb-3'>
                        <div className='card-body text-center'>
                          <h5 className='card-title' style={{ fontSize: '1.25rem', fontWeight: '500' }}>Completed Tasks</h5>
                          <h1 className='display-3' style={{ fontWeight: '700' }}>150</h1>
                          <i className='fas fa-check-circle fa-2x'></i>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='card text-dark bg-warning mb-3'>
                        <div className='card-body text-center'>
                          <h5 className='card-title' style={{ fontSize: '1.25rem', fontWeight: '500' }}>In Progress</h5>
                          <h1 className='display-3' style={{ fontWeight: '700' }}>30</h1>
                          <i className='fas fa-spinner fa-spin fa-2x'></i>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='card text-white bg-danger mb-3'>
                        <div className='card-body text-center'>
                          <h5 className='card-title' style={{ fontSize: '1.25rem', fontWeight: '500' }}>Pending Tasks</h5>
                          <h1 className='display-3' style={{ fontWeight: '700' }}>10</h1>
                          <i className='fas fa-exclamation-triangle fa-2x'></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className='mb-3' style={{ fontSize: '1.5rem', fontWeight: '600' }}>Task List</h3>
                  <div className='list-group'>
                    <a href='#' className='list-group-item list-group-item-action'>
                      <div className='d-flex justify-content-between'>
                        <h5 className='mb-1' style={{ fontSize: '1.1rem', fontWeight: '500' }}>Task 1: Complete Documentation</h5>
                        <small className='text-success' style={{ fontWeight: '400' }}>Completed</small>
                      </div>
                      <p className='mb-1' style={{ fontSize: '0.9rem', fontWeight: '400' }}>Detailed description of Task 1.</p>
                      <small style={{ fontSize: '0.8rem' }}>Due: 2024-07-30</small>
                    </a>
                    <a href='#' className='list-group-item list-group-item-action'>
                      <div className='d-flex justify-content-between'>
                        <h5 className='mb-1' style={{ fontSize: '1.1rem', fontWeight: '500' }}>Task 2: Review Code</h5>
                        <small className='text-warning' style={{ fontWeight: '400' }}>In Progress</small>
                      </div>
                      <p className='mb-1' style={{ fontSize: '0.9rem', fontWeight: '400' }}>Detailed description of Task 2.</p>
                      <small style={{ fontSize: '0.8rem' }}>Due: 2024-08-05</small>
                    </a>
                    <a href='#' className='list-group-item list-group-item-action'>
                      <div className='d-flex justify-content-between'>
                        <h5 className='mb-1' style={{ fontSize: '1.1rem', fontWeight: '500' }}>Task 3: Design UI</h5>
                        <small className='text-danger' style={{ fontWeight: '400' }}>Pending</small>
                      </div>
                      <p className='mb-1' style={{ fontSize: '0.9rem', fontWeight: '400' }}>Detailed description of Task 3.</p>
                      <small style={{ fontSize: '0.8rem' }}>Due: 2024-08-10</small>
                    </a>
                  </div>

                  <h3 className='mt-4 mb-3' style={{ fontSize: '1.5rem', fontWeight: '600' }}>Task Details</h3>
                  <div className='accordion' id='tasksAccordion'>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='headingOne'>
                        <button
                          className='accordion-button'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#collapseOne'
                          aria-expanded='true'
                          aria-controls='collapseOne'
                          style={{ fontSize: '1rem', fontWeight: '500' }}
                        >
                          Task 1: Complete Documentation
                        </button>
                      </h2>
                      <div
                        id='collapseOne'
                        className='accordion-collapse collapse show'
                        aria-labelledby='headingOne'
                        data-bs-parent='#tasksAccordion'
                      >
                        <div className='accordion-body' style={{ fontSize: '0.9rem', fontWeight: '400' }}>
                          <strong>Status:</strong> Completed<br />
                          <strong>Description:</strong> Detailed description of Task 1.<br />
                          <strong>Due Date:</strong> 2024-07-30<br />
                          <strong>Assigned To:</strong> John Doe
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='headingTwo'>
                        <button
                          className='accordion-button collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#collapseTwo'
                          aria-expanded='false'
                          aria-controls='collapseTwo'
                          style={{ fontSize: '1rem', fontWeight: '500' }}
                        >
                          Task 2: Review Code
                        </button>
                      </h2>
                      <div
                        id='collapseTwo'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingTwo'
                        data-bs-parent='#tasksAccordion'
                      >
                        <div className='accordion-body' style={{ fontSize: '0.9rem', fontWeight: '400' }}>
                          <strong>Status:</strong> In Progress<br />
                          <strong>Description:</strong> Detailed description of Task 2.<br />
                          <strong>Due Date:</strong> 2024-08-05<br />
                          <strong>Assigned To:</strong> Jane Smith
                        </div>
                      </div>
                    </div>
                    {/* Add more accordion items as needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;

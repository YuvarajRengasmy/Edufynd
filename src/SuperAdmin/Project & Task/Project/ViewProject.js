import React from 'react';
import Sidebar from '../../../compoents/sidebar';

export const ViewProject = () => {
  return (
    <div>
      <Sidebar />
      <div className='content-wrapper' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
        <div className='content-header'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='container mt-4'>
                  <h2 className='mb-4' style={{ fontSize: '2rem', fontWeight: '600' }}>Projects Overview</h2>

                  <div className='card-deck mb-4'>
                    <div className='card text-white bg-primary'>
                      <div className='card-body text-center'>
                        <h5 className='card-title' style={{ fontSize: '1.25rem', fontWeight: '500' }}>Total Projects</h5>
                        <h1 className='display-3' style={{ fontWeight: '700' }}>120</h1>
                        <i className='fas fa-briefcase fa-2x'></i>
                      </div>
                    </div>
                    <div className='card text-dark bg-warning'>
                      <div className='card-body text-center'>
                        <h5 className='card-title' style={{ fontSize: '1.25rem', fontWeight: '500' }}>Active Projects</h5>
                        <h1 className='display-3' style={{ fontWeight: '700' }}>45</h1>
                        <i className='fas fa-cogs fa-2x'></i>
                      </div>
                    </div>
                    <div className='card text-white bg-danger'>
                      <div className='card-body text-center'>
                        <h5 className='card-title' style={{ fontSize: '1.25rem', fontWeight: '500' }}>Projects Overdue</h5>
                        <h1 className='display-3' style={{ fontWeight: '700' }}>15</h1>
                        <i className='fas fa-exclamation-triangle fa-2x'></i>
                      </div>
                    </div>
                  </div>

                  <h3 className='mb-3' style={{ fontSize: '1.5rem', fontWeight: '600' }}>Project Progress</h3>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='list-group'>
                        <a href='#' className='list-group-item list-group-item-action active' style={{ fontSize: '1rem', fontWeight: '500' }}>
                          Project A
                          <span className='badge badge-primary badge-pill float-right'>70% Complete</span>
                        </a>
                        <a href='#' className='list-group-item list-group-item-action' style={{ fontSize: '1rem', fontWeight: '500' }}>
                          Project B
                          <span className='badge badge-success badge-pill float-right'>85% Complete</span>
                        </a>
                        <a href='#' className='list-group-item list-group-item-action' style={{ fontSize: '1rem', fontWeight: '500' }}>
                          Project C
                          <span className='badge badge-warning badge-pill float-right'>50% Complete</span>
                        </a>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Progress Overview</h4>
                      <div className='progress mb-2'>
                        <div className='progress-bar bg-primary' role='progressbar' style={{ width: '70%' }} aria-valuenow='70' aria-valuemin='0' aria-valuemax='100'>Project A</div>
                      </div>
                      <div className='progress mb-2'>
                        <div className='progress-bar bg-success' role='progressbar' style={{ width: '85%' }} aria-valuenow='85' aria-valuemin='0' aria-valuemax='100'>Project B</div>
                      </div>
                      <div className='progress mb-2'>
                        <div className='progress-bar bg-warning' role='progressbar' style={{ width: '50%' }} aria-valuenow='50' aria-valuemin='0' aria-valuemax='100'>Project C</div>
                      </div>
                    </div>
                  </div>

                  <h3 className='mt-4 mb-3' style={{ fontSize: '1.5rem', fontWeight: '600' }}>Project Details</h3>
                  <div className='accordion' id='projectsAccordion'>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='headingOne'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                          Project A
                        </button>
                      </h2>
                      <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#projectsAccordion'>
                        <div className='accordion-body' style={{ fontSize: '0.9rem', fontWeight: '400' }}>
                          <strong>Client:</strong> ABC Corp<br />
                          <strong>Start Date:</strong> 2024-01-01<br />
                          <strong>Due Date:</strong> 2024-08-15<br />
                          <strong>Description:</strong> Development of a new CRM system.
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='headingTwo'>
                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>
                          Project B
                        </button>
                      </h2>
                      <div id='collapseTwo' className='accordion-collapse collapse' aria-labelledby='headingTwo' data-bs-parent='#projectsAccordion'>
                        <div className='accordion-body' style={{ fontSize: '0.9rem', fontWeight: '400' }}>
                          <strong>Client:</strong> XYZ Ltd.<br />
                          <strong>Start Date:</strong> 2024-03-15<br />
                          <strong>Due Date:</strong> 2024-09-01<br />
                          <strong>Description:</strong> Website redesign and development.
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

export default ViewProject;

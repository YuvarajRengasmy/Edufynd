import React from 'react'
import Sidebar from '../../../compoents/AdminSidebar'
export const ViewIncomeReport = () => {
  return (
    <div>
    <Sidebar/>
    <div className='content-wrapper'style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
  <div className='content-header'>
  <div class="container-fluid mt-4">
        <h2 class="mb-4">Income Report</h2>
        
       
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="alert alert-success d-flex justify-content-between align-items-center" role="alert">
                    <div>
                        <h5>Total Income</h5>
                        <p>$10,000</p>
                    </div>
                    <i class="fas fa-dollar-sign fa-2x"></i>
                </div>
            </div>
            <div class="col-md-4">
                <div class="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
                    <div>
                        <h5>Income This Month</h5>
                        <p>$2,000</p>
                    </div>
                    <i class="fas fa-calendar-alt fa-2x"></i>
                </div>
            </div>
            <div class="col-md-4">
                <div class="alert alert-info d-flex justify-content-between align-items-center" role="alert">
                    <div>
                        <h5>Pending Invoices</h5>
                        <p>$500</p>
                    </div>
                    <i class="fas fa-file-invoice-dollar fa-2x"></i>
                </div>
            </div>
        </div>

       
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="bg-light border rounded p-3">
                    <h5 class="mb-2">Client Payment</h5>
                    <p><strong>Date:</strong> 2024-07-29</p>
                    <p><strong>Client:</strong> ABC Corp</p>
                    <p><strong>Amount:</strong> $1,000</p>
                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#viewIncomeModal">View Details</button>
                </div>
            </div>
           
        </div>
    </div>

   
    <div class="modal fade" id="viewIncomeModal" tabindex="-1" role="dialog" aria-labelledby="viewIncomeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="viewIncomeModalLabel">Income Details</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <dl class="row">
                        <dt class="col-sm-4">Date</dt>
                        <dd class="col-sm-8">2024-07-29</dd>
                        <dt class="col-sm-4">Client</dt>
                        <dd class="col-sm-8">ABC Corp</dd>
                        <dt class="col-sm-4">Amount</dt>
                        <dd class="col-sm-8">$1,000</dd>
                        <dt class="col-sm-4">Payment Method</dt>
                        <dd class="col-sm-8">Bank Transfer</dd>
                    </dl>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    </div>

 
  <div class="modal fade" id="viewExpenseModal" tabindex="-1" role="dialog" aria-labelledby="viewExpenseModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="viewExpenseModalLabel">Income Details</h5>
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <dl class="row">
                      <dt class="col-sm-4">Date</dt>
                      <dd class="col-sm-8">2024-07-29</dd>
                      <dt class="col-sm-4">Name of Expense</dt>
                      <dd class="col-sm-8">Office Supplies</dd>
                      <dt class="col-sm-4">Paid Against</dt>
                      <dd class="col-sm-8">Stationery</dd>
                      <dt class="col-sm-4">Amount</dt>
                      <dd class="col-sm-8">$150</dd>
                  </dl>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Edit</button>
              </div>
          </div>
      </div>
  </div>
  </div>
    </div>
  </div>
  )
}
export default ViewIncomeReport
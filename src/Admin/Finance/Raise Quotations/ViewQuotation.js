import React from 'react'
import Sidebar from '../../../compoents/AdminSidebar'
export const ViewQuotation = () => {
  return (
    <div>
    <Sidebar/>
    <div className='content-wrapper'style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
  <div className='content-header'>
  <div class="container-fluid mt-4">
        <h2 class="mb-4">Raise Quotations</h2>
        
        
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="alert alert-primary d-flex justify-content-between align-items-center" role="alert">
                    <div>
                        <h5>Total Quotations</h5>
                        <p>35</p>
                    </div>
                    <i class="fas fa-file-alt fa-2x"></i>
                </div>
            </div>
            <div class="col-md-4">
                <div class="alert alert-info d-flex justify-content-between align-items-center" role="alert">
                    <div>
                        <h5>Pending Quotations</h5>
                        <p>10</p>
                    </div>
                    <i class="fas fa-hourglass-half fa-2x"></i>
                </div>
            </div>
            <div class="col-md-4">
                <div class="alert alert-success d-flex justify-content-between align-items-center" role="alert">
                    <div>
                        <h5>Approved Quotations</h5>
                        <p>25</p>
                    </div>
                    <i class="fas fa-check-circle fa-2x"></i>
                </div>
            </div>
        </div>

       
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="mb-0">Create New Quotation</h5>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="clientName">Client Name</label>
                            <input type="text" class="form-control" id="clientName" placeholder="Client Name"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="quotationDate">Quotation Date</label>
                            <input type="date" class="form-control" id="quotationDate"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" rows="3" placeholder="Description of the quotation"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="amount">Amount</label>
                            <input type="number" class="form-control" id="amount" placeholder="Amount"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="currency">Currency</label>
                            <select id="currency" class="form-control">
                                <option selected>Choose...</option>
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

       
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Recent Quotations</h5>
            </div>
            <div class="card-body">
                <div class="list-group">
                    
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" data-bs-toggle="modal" data-bs-target="#quotationDetailModal">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Quotation #001</h5>
                            <small>2024-07-29</small>
                        </div>
                        <p class="mb-1">Client: XYZ Ltd.</p>
                        <small>Amount: $1,200</small>
                    </a>
                   
                </div>
            </div>
        </div>
    </div>

    
    <div class="modal fade" id="quotationDetailModal" tabindex="-1" role="dialog" aria-labelledby="quotationDetailModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="quotationDetailModalLabel">Quotation Details</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <dl class="row">
                        <dt class="col-sm-4">Client Name</dt>
                        <dd class="col-sm-8">XYZ Ltd.</dd>
                        <dt class="col-sm-4">Quotation Date</dt>
                        <dd class="col-sm-8">2024-07-29</dd>
                        <dt class="col-sm-4">Description</dt>
                        <dd class="col-sm-8">Quotation for office supplies</dd>
                        <dt class="col-sm-4">Amount</dt>
                        <dd class="col-sm-8">$1,200</dd>
                        <dt class="col-sm-4">Currency</dt>
                        <dd class="col-sm-8">USD</dd>
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
export default ViewQuotation
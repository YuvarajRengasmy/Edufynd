import React from "react";
import Sidebar from "../../../compoents/AgentSidebar";
export const ViewExpenses = () => {
  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header">
          <div class="container-fluid mt-4">
            <h2 class="mb-4">Expense Report</h2>

            <div class="row mb-4">
              <div class="col-md-4">
                <div
                  class="alert alert-primary d-flex justify-content-between align-items-center"
                  role="alert"
                >
                  <div>
                    <h5>Total Expenses</h5>
                    <p>$2,000</p>
                  </div>
                  <i class="fas fa-money-bill-wave fa-2x"></i>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="alert alert-secondary d-flex justify-content-between align-items-center"
                  role="alert"
                >
                  <div>
                    <h5>Expenses This Month</h5>
                    <p>$500</p>
                  </div>
                  <i class="fas fa-calendar fa-2x"></i>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="alert alert-success d-flex justify-content-between align-items-center"
                  role="alert"
                >
                  <div>
                    <h5>Expenses Approved</h5>
                    <p>$1,500</p>
                  </div>
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="p-3 mb-3 bg-light border rounded">
                  <h5 class="mb-2">Office Supplies</h5>
                  <p className="mb-1">
                    <strong>Date:</strong> 2024-07-29
                  </p>
                  <p className="mb-1">
                    <strong>Paid Against:</strong> Stationery
                  </p>
                  <p className="mb-3">
                    <strong>Amount:</strong> $150
                  </p>
                  <button
                    class="btn  btn-sm px-3 py-2 fw-semibold text-uppercase text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#viewExpenseModal"
                    style={{ backgroundColor: "#231f20", fontSize: "12px" }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="viewExpenseModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="viewExpenseModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-scrollable" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="viewExpenseModalLabel">
                    Expense Details
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
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
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewExpenses;

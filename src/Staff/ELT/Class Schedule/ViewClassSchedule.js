import React from "react";
import Sidebar from "../../../compoents/StaffSidebar";
export const ViewClassSchedule = () => {
  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div class="container-fluid mt-4">
                  <h2 class="mb-4">ClassSchedule</h2>
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <div class="card border-0 border-start border-5 border-primary">
                        <div class="card-body p-4">
                          <h5 class="text-center fw-bold mb-3">Jane Smith</h5>
                          <p class="card-text mb-1">
                            <strong>ELT Test:</strong> IELTS
                          </p>
                          <p class="card-text mb-1">
                            <strong>Class Time:</strong> 2024-08-16 2:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewClassSchedule;

import React, { useState, useEffect } from "react";
import { getSingleCommission } from "../../api/commission";
import { useLocation } from "react-router-dom";
import Sidebar from "../../compoents/AdminSidebar";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
export const ViewComission = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [commission, setCommission] = useState();

  useEffect(() => {
    if (id) {
      getCommissionDetails();
    }
  }, [id]);

  const getCommissionDetails = () => {
    getSingleCommission(id)
      .then((res) => {
        setCommission(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header text-end">
          <BackButton />
        </div>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-12 text-center my-4">
              <h2 className="fw-semibold">Commission Details</h2>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="card border-0 h-100">
                <div className="card-header bg-primary text-white">
                  Country and University
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Country:</strong>{" "}
                      {commission?.country || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>University:</strong>{" "}
                      {commission?.universityName || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 h-100">
                <div className="card-header bg-primary text-white">
                  Payment Information
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Payment Method:</strong>{" "}
                      {commission?.paymentMethod || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Eligibility:</strong>{" "}
                      {commission?.eligibility || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Tax:</strong> {commission?.tax || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Payment Type:</strong>{" "}
                      {commission?.paymentType || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {commission?.years?.map((year, yearIndex) => (
  <div className="col-md-6" key={yearIndex}>
    <div className="card border-0">
      <div className="card-header bg-primary text-white">
        Year {year.year || "Not Available"}
      </div>
      {year.courseTypes?.map((courseType, courseIndex) => (
        <div key={courseIndex} className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Course Type:</strong> {courseType.courseType || "Not Available"}
            </li>
            {/* Map through the inTake array */}
            {courseType.inTake?.map((intakeItem, intakeIndex) => (
              <React.Fragment key={intakeIndex}>
                <li className="list-group-item">
                  <strong>Intake:</strong> {intakeItem.inTake || "Not Available"}
                </li>
                <li className="list-group-item">
                  <strong>Value:</strong> {intakeItem.value || "Not Available"}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
))}
          </div>
        </div>
        <div className="container-fluid my-2">
          <div className="row ">
            <div className="col-12 col-lg-7 col-auto">
              <ul className="list-unstyled">
                <li className="mb-4 position-relative">
                  <div className="row align-items-start g-0">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                      <div
                        className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "2rem", height: "2rem" }}
                      >
                        <i className="fas fa-check" />
                      </div>
                    </div>
                    <div className="col-4 text-center">
                      <p className="mb-1 fw-semibold text-muted">
                        23 August, 2023 10:30 AM
                      </p>
                      <p className="mb-0 text-muted">
                        Changed by:<strong>John Doe</strong>
                      </p>
                    </div>

                    <div className="col-7">
                      <div className="mb-3">
                        <div className="bg-success text-white rounded-3 p-2">
                          <h6 className="mb-1">New University Name</h6>
                          <p className="mb-0">University Y</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="bg-danger text-white rounded-3 p-2">
                          <h6 className="mb-1">Old University Name</h6>
                          <p className="mb-0">University X</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="position-absolute top-0 start-0 translate-middle-x"
                    style={{
                      width: 2,
                      height: "100%",
                      backgroundColor: "#007bff",
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewComission;

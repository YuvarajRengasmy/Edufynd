import React, { useState, useEffect } from "react";
import { getSingleCommission } from "../../api/commission";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";
export const ViewComission = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [commission, setCommission] = useState();
  const pageSize = 5;

  useEffect(() => {
    getCommissionDetails();
  }, []);

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
      {" "}
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </nav>

          <div
            className="content-wrapper "
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
          >
            <div className="content-header ">
              <div className="container-fluid">
                <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                  <div
                    className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                    style={{ background: "#fe5722", color: "#fff" }}
                  >
                    <h5 className="text-center text-capitalize p-1">
                      View Commission Details
                    </h5>
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-hover table-bordered table-striped-columns mt-5"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td>Country</td>
                          <td>{commission?.country}</td>
                        </tr>
                        <tr>
                          <td>University </td>
                          <td>{commission?.universityName}</td>
                        </tr>
                        <tr>
                          <td>Payment Method</td>
                          <td>{commission?.paymentMethod}</td>
                        </tr>

                        <tr>
                          <td>Commission Paid On</td>
                          <td>{commission?.commissionPaidOn}</td>
                        </tr>

                        <tr>
                          <td>Eligibility</td>
                          <td>{commission?.eligibility}</td>
                        </tr>
                        <tr>
                          <td>Tax</td>
                          <td>{commission?.tax}</td>
                        </tr>
                        <tr>
                          <td>Payment Type</td>
                          <td>{commission?.paymentType}</td>
                        </tr>
                      </tbody>
                    </table>
                    {commission?.years?.map((year, yearIndex) => (
                      <div className="card border-0 rounded-0 my-3">
                        <h6 className="card-header text-center fw-semibold text-uppercase my-2 rounded-0 bg-white">
                          <div key={yearIndex}> Year :- {year.year}</div>
                        </h6>
                        {year.courseTypes?.map((courseType, courseIndex) => (
                          <div key={courseIndex} className="card-body">
                            <div class="row justify-content-center align-items-center">
                              <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card  border-0">
                                  <div class="card-body">
                                    <p class="card-text text-capitalize ">
                                      courseType :- {courseType.courseType}
                                    </p>
                                    <p class="card-text text-capitalize">
                                      {" "}
                                      InTake :- {courseType.inTake}{" "}
                                    </p>
                                    <p class="card-text text-capitalize">
                                      {" "}
                                      Commission :- {courseType.value}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
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
export default ViewComission;

import React, { useState, useEffect } from "react";
import { getSingleCommission } from "../../api/commission";
import { useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
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
        <div className="content-header">
          <div className="container ">
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
                        <strong>Country:</strong> {commission?.country}
                      </li>
                      <li className="list-group-item">
                        <strong>University:</strong>{" "}
                        {commission?.universityName}
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
                        {commission?.paymentMethod}
                      </li>
                      <li className="list-group-item">
                        <strong>Eligibility:</strong> {commission?.eligibility}
                      </li>
                      <li className="list-group-item">
                        <strong>Tax:</strong> {commission?.tax}
                      </li>
                      <li className="list-group-item">
                        <strong>Payment Type:</strong> {commission?.paymentType}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {commission?.years?.map((year, yearIndex) => (
                <div className="col-md-6" key={yearIndex}>
                  <div className="card border-0">
                    <div className="card-header bg-primary text-white">
                      Year {year.year}
                    </div>
                    {year.courseTypes?.map((courseType, courseIndex) => (
                      <div key={courseIndex} className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <strong>Course Type:</strong>{" "}
                            {courseType.courseType}
                          </li>
                          <li className="list-group-item">
                            <strong>Intake:</strong> {courseType.inTake}
                          </li>
                          <li className="list-group-item">
                            <strong>Commission:</strong> {courseType.value}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb float-end">
                  <li className="breadcrumb-item">
                    <Link to="/DashBoard" className="text-decoration-none" target="_self">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/ListCommission" className="text-decoration-none">ListCommission</Link>
                  </li>

                  <li className="breadcrumb-item">
                    <Link
                      to={{
                        pathname: "/EditCommission",
                        search: `?id=${id}`,
                      }}
                      className="text-decoration-none"
                    >
                      EditCommission
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewComission;

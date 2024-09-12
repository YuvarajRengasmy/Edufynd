import React, { useEffect, useState } from "react";
import { updatedEvent, getSingleEvent } from "../../api/Notification/event";
import { Link, useLocation } from "react-router-dom";

import Sidebar from "../../compoents/AdminSidebar";
export const ViewEvents = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [notification, setnotification] = useState([]);

  useEffect(() => {
    getEventList();
  }, []);

  const getEventList = () => {
    getSingleEvent(id)
      .then((res) => {
        setnotification(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Sidebar />

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
                  View Events Details
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
                      <th>Host Name</th>
                      <td>Staff Name</td>
                    </tr>
                    <tr>
                      <th>Type of User</th>
                      <td>{notification?.typeOfUser || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Username</th>
                      {Array.isArray(notification?.userName) &&
                      notification.userName.length > 0
                        ? notification.userName.map((username, index) => (
                            <li key={index}>{username}</li>
                          ))
                        : "N/A" || "Not Available"}
                    </tr>
                    <tr>
                      <th>Event Topic</th>
                      <td>{notification?.eventTopic || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>University</th>
                      <td>{notification?.universityName || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{notification?.date || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Time</th>
                      <td>{notification?.time || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Venue</th>
                      <td>{notification?.venue || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Content</th>
                      <td>Helo</td>
                    </tr>
                    <tr>
                      <th>File</th>
                      <td>New File</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      </div>
    </>
  );
};
export default ViewEvents;

import React, { useEffect, useState } from "react";
import { updatedEvent, getSingleEvent } from "../../api/event";
import { Link, useLocation } from "react-router-dom";

import Sidebar from "../../compoents/sidebar";
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
      <div>
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
                        <th>Type of User</th>
                        <td>{notification?.typeOfUser}</td>
                      </tr>
                      <tr>
                        <th>Username</th>
                        {Array.isArray(notification?.userName) &&
                        notification.userName.length > 0
                          ? notification.userName.map((username, index) => (
                              <li key={index}>{username}</li>
                            ))
                          : "N/A"}
                      </tr>
                      <tr>
                        <th>Event Topic</th>
                        <td>{notification?.eventTopic}</td>
                      </tr>
                      <tr>
                        <th>University</th>
                        <td>{notification?.universityName}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{notification?.date}</td>
                      </tr>
                      <tr>
                        <th>Time</th>
                        <td>{notification?.time}</td>
                      </tr>
                      <tr>
                        <th>Venue</th>
                        <td>{notification?.venue}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewEvents;

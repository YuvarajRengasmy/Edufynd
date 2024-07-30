import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleMeeting } from "../../api/meeting";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/sidebar";
export const ViewMeetings = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [notification, setnotification] = useState([]);

  useEffect(() => {
    getMeetingList();
  }, []);

  const getMeetingList = () => {
    getSingleMeeting(id)
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
                    View Meetings Details
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
                        <th>Host</th>
                        <td>{notification?.hostName}</td>
                      </tr>

                      <tr>
                        <th>Attendees</th>
                        {Array.isArray(notification?.attendees) &&
                        notification.attendees.length > 0
                          ? notification.attendees.map((attendees, index) => (
                              <li key={index}>{attendees}</li>
                            ))
                          : "N/A"}
                      </tr>
                      <tr>
                        <th>Subject</th>
                        <td>{notification?.subject}</td>
                      </tr>
                      <tr>
                        <th>Content</th>
                        <td>
                          {" "}
                          <RichTextEditor
                            value={notification?.content}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{notification?.date}</td>
                      </tr>
                      <tr>
                        <th>Time</th>
                        <td>{notification?.time}</td>
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
export default ViewMeetings;

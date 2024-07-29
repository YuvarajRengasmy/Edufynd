import React, { useEffect, useState } from "react";
import { getSingleTraining } from "../../api/Notification/traning";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/sidebar";
import { useLocation } from "react-router-dom";

export const ViewTraining = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [training, setTraining] = useState({});

  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = () => {
    getSingleTraining(id)
      .then((res) => {
        setTraining(res?.data?.result || {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Sidebar />

        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                  <h5 className='text-center text-capitalize p-1'>View Training Details</h5>
                </div>
                <div className="card-body">
                  <table className='table table-hover table-bordered table-striped-columns mt-5' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                    <tbody>
                      <tr>
                        <th>Request Training</th>
                        <td>{training?.requestTraining || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Training Topic</th>
                        <td>{training?.trainingTopic || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{training?.date || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Time</th>
                        <td>{training?.time || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Type of Users</th>
                        <td>{training?.typeOfUser || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Attendees</th>
                        <td>
       {Array.isArray(training?.usersName) && training.usersName.length > 0
                            ? training.usersName.map((attendee, index) => (
                              <li key={index}>{attendee}</li>
                            ))
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th>Material</th>
                        <td>{training?.material || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{training?.name || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Document</th>
                        <td>
                          {training?.uploadDocument ? (
                            <a href={training.uploadDocument} download="Document.pdf" className="btn btn-sm btn-custom">
                              <i className="fa fa-download" aria-hidden="true"></i> Download
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Subject</th>
                        <td>{training?.subject || "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Content</th>
                        <td><RichTextEditor value={training?.content} readOnly /></td>
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

export default ViewTraining;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleNotifications } from "../../api/notifications";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/sidebar";

export const ViewNotifications = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [notification, setNotification] = useState({});

  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = () => {
    getSingleNotifications(id)
      .then((res) => {
        setNotification(res?.data?.result || {});
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
                  <h5 className='text-center text-capitalize p-1'>View Notifications Details</h5>
                </div>
                <div className="card-body">
                  <table className='table table-hover table-bordered table-striped-columns mt-5' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                    <tbody>
                      <tr>
                        <th>Type of User</th>
                        <td>{notification?.typeOfUser}</td>
                      </tr>
                      <tr>
                        <th>Username</th>
                        <td>
                          {Array.isArray(notification?.userName) && notification.userName.length > 0
                            ? notification.userName.map((username, index) => (
                              <li key={index}>{username}</li>
                            ))
                            : "N/A"
                          }
                        </td>
                      </tr>
                      <tr>
                        <th>Content</th>
                        <td>
                          <RichTextEditor value={notification?.content} readOnly />
                        </td>
                      </tr>
                      <tr>
                        <th>Subject</th>
                        <td>{notification?.subject}</td>
                      </tr>
                      <tr>
                        <th>Image</th>
                        <td>
                          <img 
                            src={notification?.uploadImage || "path/to/image.jpg"} 
                            width="150" 
                            height="150" 
                            alt="Notification" 
                            className="img-fluid" 
                          />
                        </td>
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

export default ViewNotifications;

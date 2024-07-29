import React, { useEffect, useState } from "react";
import { getSinglePromotion } from "../../api/promotions";
import { RichTextEditor } from "@mantine/rte";
import { Link, useLocation } from "react-router-dom";

import Sidebar from "../../compoents/sidebar";
export const ViewPromotion = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [notification, setnotification] = useState([]);
  useEffect(() => {
    getPromotionList();
  }, []);

  const getPromotionList = () => {
    getSinglePromotion(id)
      .then((res) => {
        setnotification(res?.data?.result || []);
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
                      View Promotion Details
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
                          <td>{notification.typeOfUser}</td>
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
                          <th>Subject</th>
                          <td>{notification?.subject}</td>
                        </tr>
                        <tr>
                          <th>Image</th>
                          <td>
                            <img
                              src={
                                notification?.uploadImage || "path/to/image.jpg"
                              }
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
      </div>
    </>
  );
};
export default ViewPromotion;

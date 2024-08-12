import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleNotifications } from "../../api/Notification/Notification";
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

          <main class="container my-5">
        
       

       
        <div class="card  rounded-1 mb-3">
            <div class="card-body d-flex align-items-center">
                <div class="mr-3">
                    <img src={notification?.uploadImage || "path/to/image.jpg"}  class="rounded-circle img-thumbnail" alt="User Image" style={{width:'6rem',height:'6rem'}}/>
                </div>
                <div>
                    <h6 class="mb-1"><i class="fas fa-user"></i> {Array.isArray(notification?.userName) && notification.userName.length > 0
                          ? notification.userName.map((username, index) => (
                            <span key={index}>{username}</span>
                          ))
                          : "N/A"
                        }</h6>
                    <p class="text-muted mb-1"><i class="fas fa-users"></i> Type of Users:  {notification?.typeOfUser}</p>
                    <p class="text-muted mb-1"><i class="fas fa-book"></i> Subject: {notification?.subject}</p>
                    <p class="mb-0"><RichTextEditor value={notification?.content} readOnly /></p>
                </div>
            </div>
        </div>
    </main>

        


        

          
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNotifications;

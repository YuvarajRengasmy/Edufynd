import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleNotifications } from "../../api/Notification/Notification";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
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

        <BackButton/>
      
          <div className="content-header">
            
          <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/dashboard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/list_notifications' className="text-decoration-none">ListNotifications</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/edit_notifications",
          search: `?id=${notification?._id}`,
        }} className="text-decoration-none">EditNotifications</Link>
      </li>
  
  </ol>
</nav>

        

        


        

          
          </div>
          <main class="container-fluid my-3">
        
       

       
        <div class="card  rounded-1 mb-5">
            <div class="card-body d-flex align-items-center">
                <div class="mr-3">
                    <img src={notification?.uploadImage || "path/to/image.jpg"}  class="rounded-circle img-thumbnail" alt="User Image" style={{width:'6rem',height:'6rem'}}/>
                </div>
                <div>
                    <h6 class="mb-1"><i class="fas fa-user"></i> {Array.isArray(notification?.userName) && notification.userName.length > 0
                          ? notification.userName.map((username, index) => (
                            <span key={index}>{username }</span>
                          ))
                          : "N/A"
                        }</h6>
                    <p class="text-muted mb-1"><i class="fas fa-users"></i> Type of Users:  {notification?.typeOfUser  || "Not Available"} </p>
                    <p class="text-muted mb-1"><i class="fas fa-book"></i> Subject: {notification?.subject  || "Not Available"}</p>
                    <p class="mb-0"><RichTextEditor value={notification?.content  || "Not Available"} readOnly /></p>
                </div>
            </div>
        </div>
    </main>

    <div className="container-fluid my-2">
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        
        <li className="mb-4 position-relative">
          <div className="row align-items-start g-0">

          <div className="col-1 d-flex justify-content-center align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                <i className="fas fa-check" />
              </div>
            </div>
            <div className="col-4 text-center">
              <p className="mb-1 fw-semibold text-muted">23 August, 2023 10:30 AM</p>
              <p className="mb-0 text-muted">Changed by:<strong>John Doe</strong></p>
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
          <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
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

export default ViewNotifications;

import Sidebar from "../../compoents/sidebar";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updatedTestimonial,getSingleTestimonial,getSingleLog } from "../../api/Notification/Testimonial";
import BackButton from "../../compoents/backButton";
import { RichTextEditor } from "@mantine/rte";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const ViewTestimonials = () => {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [notification, setnotification] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getSingleDetails();
    getUniversityLogs();
  }, []);

  const getSingleDetails = () => {
    getSingleTestimonial(id)
      .then((res) => {
        setnotification(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUniversityLogs = () => {
    getSingleLog(id)
      .then((res) => {
        
        console.log("yuvi",res);
        setLogs(res?.data?.result);
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
            <BackButton />
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-end">
                <li className="breadcrumb-item">
                  <Link
                    to="/DashBoard"
                    target="_self"
                    className="text-decoration-none"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    to="/list_testimonials"
                    className="text-decoration-none"
                  >
                    ListTestimonials
                  </Link>
                </li>
                {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
                <li className="breadcrumb-item">
                  <Link
                    to={{
                      pathname: "/edit_Testimonials",
                      search: `?id=${id}`,
                    }}
                    className="text-decoration-none"
                  >
                    EditTestimonials
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="container-fluid">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h5 className="text-center text-capitalize p-1">
                    View Testimonials Details
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
                        <td>{notification?.hostName}</td>
                      </tr>
                      <tr>
                        <th>Type Of User</th>
                        <td>{notification?.typeOfUser}</td>
                      </tr>
                      <tr>
                        <th>Course/University</th>
                        <td>{notification?.courseOrUniversityName}</td>
                      </tr>
                      <tr>
                        <th>Location</th>
                        <td>{notification?.location}</td>
                      </tr>
                      <tr>
                        <th>Counsellor Name</th>
                        <td>{notification?.counselorName}</td>
                      </tr>
                      <tr>
                        <th>Content</th>
                        <td>
      <CKEditor
        editor={ClassicEditor}
        data={notification?.content || ''} 
        disabled={true}                    
        config={{
          toolbar: [],                   
        }}
      />
    </td>
                      </tr>
                      <tr>
                        <th>Image</th>
                        {Array.isArray(notification?.uploadFile) && notification.uploadFile.length > 0 && (
                          
                            <td >
                               {notification.uploadFile.map((data, index) => (
                              <img
                                className="img-fluid img-thumbnail mx-auto d-block"
                                src={data.uploadImage ? data.uploadImage : "https://via.placeholder.com/128"}
                                alt="uploaded-file"
                                style={{ width: "10rem", height: "5rem" }}
                              />
                            ))}
                            </td>
                        )}
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
        {logs.map((log, index) => (
           <li className="mb-4 position-relative" key={index}>
           <div className="row align-items-start g-0">

             <div className="col-1 d-flex justify-content-center align-items-center">
               <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                 <i className="fas fa-check" />
               </div>
             </div>
             <div className="col-4 text-center">
               <p className="mb-1 fw-semibold text-muted">{new Date(log.createdOn).toLocaleString()}</p>
               <p className="mb-0 text-muted">Changed by:<strong>{log.userType || "Unknown User"}</strong></p>
             </div>

             <div className="col-12">
               {log.changes.map((change, changeIndex) => (
                 <div key={changeIndex} className="mb-3">
                   <div className="bg-success text-white rounded-3 p-2">
                     <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i> {change.field}</h6>
                     <p className="mb-0"> <i className="fa fa-database "> New Data --</i>  {change.newValue}</p>
                   </div>
                   <div className="bg-danger text-white rounded-3 p-2 mt-2">
                     <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i>{change.field}</h6>
                     <p className="mb-0"><i className="fa fa-database "> Old Data --</i>{change.oldValue}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
         </li>
        ))}
      </ul>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTestimonials;

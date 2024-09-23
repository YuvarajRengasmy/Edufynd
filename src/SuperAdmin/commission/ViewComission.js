import React, { useState, useEffect } from "react";
import { getSingleCommission,getSingleCommissionLog } from "../../api/commission";
import { useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
export const ViewComission = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [commission, setCommission] = useState();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (id) {
      getCommissionDetails();
      getUniversityLogs();
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
  const getUniversityLogs = () => {
    getSingleCommissionLog(id)
      .then((res) => {
        setLogs(res?.data?.result);
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
        <div className="content-header text-end">

<BackButton/>

</div>
        <div className="container-fluid ">
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
                        <strong>Country:</strong> {commission?.country || "Not Available"}
                      </li>
                      <li className="list-group-item">
                        <strong>University:</strong>{" "}
                        {commission?.universityName || "Not Available"}
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
                        {commission?.paymentMethod || "Not Available"}
                      </li>
                      <li className="list-group-item">
                        <strong>Eligibility:</strong> {commission?.eligibility || "Not Available"}
                      </li>
                      <li className="list-group-item">
                        <strong>Tax:</strong> {commission?.tax || "Not Available"}
                      </li>
                      <li className="list-group-item">
                        <strong>Payment Type:</strong> {commission?.paymentType || "Not Available"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


             
              <div className="container my-3">
  {commission?.years?.map((year, yearIndex) => (
    <div className="row mb-4" key={yearIndex}>
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white">
            <h4>Year: {year.year || "Not Available"}</h4>
          </div>
          <div className="card-body">
            <div className="accordion" id={`accordion${yearIndex}`}>
              {year.courseTypes?.map((courseType, courseIndex) => (
                <div className="accordion-item mb-3" key={courseIndex}>
                  <h2 className="accordion-header" id={`heading${yearIndex}-${courseIndex}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${yearIndex}-${courseIndex}`}
                      aria-expanded="false"
                      aria-controls={`collapse${yearIndex}-${courseIndex}`}
                    >
                      Course Type: {courseType.courseType || "Not Available"}
                    </button>
                  </h2>
                  <div
                    id={`collapse${yearIndex}-${courseIndex}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${yearIndex}-${courseIndex}`}
                    data-bs-parent={`#accordion${yearIndex}`}
                  >
                    <div className="accordion-body">
                    
                        <div className="row">
                        {courseType.inTake?.map((intakeItem, intakeIndex) => (
                            <div className="col-sm-4">
<div className="list-group mb-2" key={intakeIndex}>
                          <div className="list-group-item">
                            <strong>Intake:</strong> {intakeItem.inTake || "Not Available"}
                          </div>
                          <div className="list-group-item">
                            <strong>Value:</strong> {intakeItem.value || "Not Available"}%
                          </div>
                        </div>
                        </div>
                      ))}
                        </div>
                      
                        
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>














              <nav aria-label="breadcrumb">
                <ol className="breadcrumb float-end">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard" className="text-decoration-none" target="_self">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/list_commission" className="text-decoration-none">ListCommission</Link>
                  </li>

                  <li className="breadcrumb-item">
                    <Link
                      to={{
                        pathname: "/edit_commission",
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
    </>
  );
};

export default ViewComission;

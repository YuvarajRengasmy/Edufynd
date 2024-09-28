import React, { useState, useEffect } from "react";
import { getSingleCommission } from "../../api/commission";
import { useLocation } from "react-router-dom";
import Sidebar from "../../compoents/AgentSidebar";
import { Link } from "react-router-dom";
import { getSingleAgentCommission } from "../../api/agent";
import { getAgentId } from "../../Utils/storage";

import BackButton from "../../compoents/backButton";
export const ViewComission = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [commission, setCommission] = useState();
  const [agent, setAgent] = useState([]);


  useEffect(() => {
    if (id) {
      getCommissionDetails();
      getAgentDetails();

    }
  }, [id]);


  const getAgentDetails = () => {

    const id = getAgentId();
    getSingleAgentCommission(id)
      .then((res) => {
        setAgent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCommissionDetails = () => {
    getSingleCommission(id)
      .then((res) => {
        setCommission(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  function customRound(value) {
    if (value < 0.25) {
      return 0.00;
    } else if (value >= 0.25 && value <= 0.75) {
      return 0.50;
    } else {
      return 0.00;
    }
  }
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
                            <strong>Value:</strong> {((intakeItem.value  * agent?.agentsCommission) / 100).toFixed(customRound())}%
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














             
            </div>
          </div>
         
      </div>
    </>
  );
};

export default ViewComission;

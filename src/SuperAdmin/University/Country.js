import React, { useState } from "react";
import Sidebar from "../../compoents/sidebar";

const statuses = [
  { name: "Submitted", className: "btn-primary" },
  { name: "Processed", className: "btn-success" },
  { name: "Rejected", className: "btn-danger" },
  { name: "Offered", className: "btn-info" },
  { name: "Fees Paid", className: "btn-success" },
  { name: "Enrolled", className: "btn-secondary" },
];

const statusIcons = {
  Success: "fa-check",
  Pending: "fa-hourglass-half",
  Rejected: "fa-times",
  Process: "fa-cogs",
};

const getStatusClassName = (status) => {
  switch (status) {
    case "Success":
      return "btn-success";
    case "Pending":
      return "btn-warning";
    case "Rejected":
      return "btn-danger";
    case "Process":
      return "btn-info";
    default:
      return "";
  }
};

export const Application = () => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState(new Set());

  const handleStatusClick = (index) => {
    if (index === currentStatusIndex && !submittedStatus.has(index)) {
      setIsInputVisible(true);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a value.");
      return;
    }
    if (!selectedStatus) {
      alert("Please select a status.");
      return;
    }
    setSubmittedStatus((prev) => new Set(prev).add(currentStatusIndex));
    setInputValue("");
    setSelectedStatus("");
    setIsInputVisible(false);
    if (currentStatusIndex < statuses.length - 1) {
      setCurrentStatusIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card border-0 shadow-sm p-2">
                  <div className="card-body">
                    <div
                      style={{
                        overflowX: "auto",
                        width: "100%",
                        scrollbarWidth: "none",
                      }}
                    >
                      <div className="position-relative my-4 mx-3">
                        <div className="progress" style={{ height: "8px" }}>
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            aria-label="Progress"
                            style={{
                              width: `${
                                ((currentStatusIndex + 1) / statuses.length) *
                                100
                              }%`,
                              backgroundColor: "#fe5722",
                            }}
                            aria-valuenow={currentStatusIndex + 1}
                            aria-valuemin="0"
                            aria-valuemax={statuses.length}
                          ></div>
                        </div>
                        {statuses.map((status, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`position-absolute top-0 translate-middle btn btn-sm ${getStatusClassName(
                              submittedStatus.has(index)
                                ? selectedStatus
                                : status.name
                            )} rounded-pill`}
                            style={{
                              width: "2rem",
                              height: "2rem",
                              left: `${(index / (statuses.length - 1)) * 100}%`,
                            }}
                            disabled={
                              index > currentStatusIndex ||
                              submittedStatus.has(index)
                            }
                            onClick={() => handleStatusClick(index)}
                          >
                            <i
                              className={`fa ${
                                statusIcons[selectedStatus] ||
                                "fa-" + statusIcons[status.name] ||
                                "fa-circle"
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        ))}
                        <div className="d-flex flex-row align-items-center justify-content-around">
                          {statuses.map((status, index) => (
                            <div
                              key={index}
                              className="col-sm-2 fw-bold"
                              style={{ fontSize: "12px" }}
                            >
                              {status.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {isInputVisible && (
                      <div className="mt-3">
                        <select
                          value={selectedStatus}
                          onChange={handleSelectChange}
                          className="form-select"
                          aria-label="Select status"
                        >
                          <option value="">Select Status</option>
                          {Object.keys(statusIcons).map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          className="form-control mt-2"
                          placeholder="Enter details"
                        />
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary mt-2"
                        >
                          Submit
                        </button>
                      </div>
                    )}
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

export default Application;

import React, { useEffect, useState } from 'react';
import Mastersidebar from '../../compoents/sidebar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveReceiver } from "../../api/invoice/reciver";
import { getallAgent } from '../../api/agent';
import { getallSenderInvoice } from "../../api/invoice/sender";

export const AddRecieverInvoice = () => {

  const initialState = {
    agentName: "",
    UniversityName: "",
    totalCourseFees: "",
    paymentType: "",
    application: [{ courseName: "", applicationCode: "", courseFees: "", commission: "" }],
    totalCommission: "",
    tax: "",
    gst: "",
    tds: "",
  };

  const initialStateErrors = {
    agentName: { required: false },
    UniversityName: { required: false },
    totalCourseFees: { required: false },
    paymentType: { required: false },
    application: { required: false },
    totalCommission: { required: false },
    tax: { required: false },
    gst: { required: false },
    tds: { required: false },
  };

  const [invoice, setInvoice] = useState(initialState);
  const [commission, setCommission] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [senderList, setSenderList] = useState([]);  // Updated sender list state to fetch correct data
  const [submitted, setSubmitted] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState([]); // Filtered applications for selected agent
  const navigate = useNavigate();

  useEffect(() => {
    getAllApplicationList();  // Fetch the application list on component mount
    getAllCommissionList();   // Fetch the commission list
  }, []);

  const getAllCommissionList = () => {
    getallAgent()
      .then(res => {
        setCommission(res?.data?.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllApplicationList = () => {
    getallSenderInvoice()
      .then(res => {
        setSenderList(res?.data?.result);  // Make sure to access the correct field from the response
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let errors = initialStateErrors;
    let isValid = true;
    if (!data.agentName) {
      errors.agentName.required = "Agent Name is required";
      isValid = false;
    }
    if (!data.UniversityName) {
      errors.UniversityName.required = "University Name is required";
      isValid = false;
    }
    if (!data.totalCourseFees) {
      errors.totalCourseFees.required = "Total Course Fees is required";
      isValid = false;
    }
    if (!data.paymentType) {
      errors.paymentType.required = "Payment Type is required";
      isValid = false;
    }
    return errors;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice, [name]: value };
      return updatedInvoice;
    });

    if (submitted) {
      const newError = handleValidation({ ...invoice, [name]: value });
      setErrors(newError);
    }

    if (name === "agentName") {
      const filtered = senderList.filter(sender =>
        sender.application.some(application => application.agentName === value)
      );
      setFilteredApplications(filtered);
    }
  };

  const handleSubmited = (event) => {
    event.preventDefault();
    const newError = handleValidation(invoice);
    setErrors(newError);
    setSubmitted(true);

    const finalInvoiceData = { ...invoice };
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);

    if (valid) {
      saveReceiver(finalInvoiceData)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_invoice");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div>
        <Mastersidebar />
        <div className='content-wrapper' style={{ fontSize: '14px' }}>
          <div className='content-header'>
            <div className='container-fluid card card-body p-4 border-0'>
              <h4 className='card-title fw-bold'>Add Receiver Invoice Details</h4>
              <hr />
              <form className="p-1" onSubmit={handleSubmited}>
                <div className='row g-3'>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputAgentName">Agent Name</label>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      name="agentName"
                      onChange={handleInputs}
                      value={invoice.agentName}
                    >
                      <option>Select Agent Name</option>
                      {senderList.map((sender, senderIndex) => (
                        sender.application.map((application, appIndex) => (
                          application.agentName ? ( // Check if agentName is not empty or undefined
                            <option
                              key={`${senderIndex}-${appIndex}`}
                              value={application.agentName}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                            >
                              {application.agentName}
                            </option>
                          ) : null // Skip the option if agentName is empty
                        ))
                      ))}
                    </select>
                  </div>

                  {/* Application Details based on selected Agent */}
                  {filteredApplications.map((app, index) => (
                    app.application.map((application, appIndex) => (
                      application.agentName === invoice.agentName && (
                        <div key={`${index}-${appIndex}`} className="row mt-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label">Application Code</label>
                            <input
                              className="form-control"
                              type="text"
                              name="applicationCode"
                              placeholder="Enter applicationCode"
                              value={application.applicationCode}
                              onChange={handleInputs}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              readOnly
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label">Course Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="course"
                              placeholder="Enter Course Name"
                              value={application.course}
                              onChange={handleInputs}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              readOnly
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label">Course Fees Amount</label>
                            <input
                              className="form-control"
                              onChange={handleInputs}
                              type="number"
                              name="courseFeesAmount"
                              placeholder="Enter Course Fees Amount"
                              value={application.courseFeesAmount}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              readOnly
                            />
                          </div>
                        </div>
                      )
                    ))
                  ))}

                  <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                    <button className="btn w-25" type="submit" style={{ backgroundColor: '#fe5722', color: '#fff' }}>Save</button>
                    <button className="btn w-25" style={{ backgroundColor: '#0f2239', color: '#fff' }} type="reset">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecieverInvoice;

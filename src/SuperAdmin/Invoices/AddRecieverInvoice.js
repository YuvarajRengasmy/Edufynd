import React, { useEffect, useState } from 'react';
import Mastersidebar from '../../compoents/sidebar'; // Ensure correct path
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { saveReceiver } from "../../api/invoice/reciver"; // Ensure correct API path
import { getallAgent } from '../../api/agent'; // Ensure correct API path
import { getallSenderInvoice } from "../../api/invoice/sender"; // Ensure correct API path

export const AddRecieverInvoice = () => {

  const initialState = {
    agentName: "",
    agentCommissionValue: "",
    application: [], // Initially empty, will hold application details
  
  };

  const initialStateErrors = {
    agentName: { required: false },
    agentCommissionValue: { required: false },
    application: { required: false },

  };

  const [invoice, setInvoice] = useState(initialState);
  const [commission, setCommission] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [senderList, setSenderList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllApplicationList();
    getAllCommissionList();
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
        setSenderList(res?.data?.result);
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

    if (!data.agentCommissionValue) {
      errors.agentCommissionValue.required = "Agent Commission Value is required";
      isValid = false;
    }
    return errors;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;

    // Update the invoice state
    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice, [name]: value };
      return updatedInvoice;
    });

    // Validate inputs if the form has been submitted
    if (submitted) {
      const newError = handleValidation({ ...invoice, [name]: value });
      setErrors(newError);
    }

    // Handle agent name selection
    if (name === "agentName") {
      const selectedSender = senderList.find(sender =>
        sender.application.some(application => application.agentName === value)
      );

      if (selectedSender) {
        const selectedApplication = selectedSender.application.find(application => application.agentName === value);
        if (selectedApplication) {
          setInvoice(prev => ({
            ...prev,
            agentCommissionValue: selectedApplication.agentsCommission || 0
          }));
        }
      }

      // Filter applications for the selected agent
      const filtered = senderList.filter(sender =>
        sender.application.some(application => application.agentName === value)
      );
      setFilteredApplications(filtered);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(invoice);
    setErrors(newError);
    setSubmitted(true);

    // Collect application details
    const applications = [];
    filteredApplications.forEach(sender => {
      sender.application.forEach(application => {
        if (application.agentName === invoice.agentName) {
          applications.push({
            applicationCode: application.applicationCode,
            universityName: application.universityName,
            course: application.course,
            courseFeesAmount: application.courseFeesAmount,
            amountReceived: application.amountReceived,
            dayInInr: application.dayInInr,
            totalAmount: (application.amountReceivedInINR && application.agentsCommission)
              ? (application.amountReceivedInINR * application.agentsCommission) / 100
              : 0
          });
        }
      });
    });

    // Prepare final data
    const finalInvoiceData = {
      ...invoice,
      application: applications, // Attach the collected application details
    };

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
              <form className="p-1" onSubmit={handleSubmit}>
                <div className='row g-3'>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" htmlFor="inputAgentName">Agent Name</label>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      name="agentName"
                      onChange={handleInputs}
                      value={invoice.agentName}
                    >
                      <option>Select Agent Name</option>
                      {
                        Array.from(new Set(
                          senderList
                            .flatMap(sender => sender.application)
                            .map(application => application.agentName)
                            .filter(agentName => agentName)
                        )).map((uniqueAgentName, index) => (
                          <option
                            key={index}
                            value={uniqueAgentName}
                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          >
                            {uniqueAgentName}
                          </option>
                        ))
                      }
                    </select>
                    {errors.agentName?.required && (
                      <div className='text-danger'>{errors.agentName.required}</div>
                    )}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label">Agent Commission</label>
                    <input
                      className="form-control"
                      type="number"
                      name="agentCommissionValue"
                      placeholder="Agent Commission Value"
                      value={invoice.agentCommissionValue || 0}
                      readOnly
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                    />
                    {errors.agentCommissionValue?.required && (
                      <div className='text-danger'>{errors.agentCommissionValue.required}</div>
                    )}
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
                            <label className="form-label">University Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="universityName"
                              placeholder="Enter university Name"
                              value={application.universityName}
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
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label">Receive Amount</label>
                            <input
                              className="form-control"
                              onChange={handleInputs}
                              type="number"
                              name="amountReceived"
                              placeholder="Enter Amount Received"
                              value={application.amountReceived || 0}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              readOnly
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label">Day In INR</label>
                            <input
                              className="form-control"
                              onChange={handleInputs}
                              type="number"
                              name="dayInInr"
                              placeholder="Enter Day In INR Amount"
                              value={application.dayInInr}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              readOnly
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label">Agent Commission Value</label>
                            <input
                              className="form-control"
                              type="number"
                              name="totalAmount"
                              placeholder="Enter Total Amount"
                              value={application.amountReceivedInINR && application.agentsCommission
                                ? (application.amountReceivedInINR * application.agentsCommission) / 100
                                : 0
                              }
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              readOnly
                            />
                          </div>
                        </div>
                      )
                    ))
                  ))}

                  <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                    <Link className="btn w-25 text-white" style={{ backgroundColor: '#0f2239', color: '#fff' }} to="/list_invoice">Cancel</Link>
                    <button className="btn w-25" type="submit" style={{ backgroundColor: '#fe5722', color: '#fff' }}>Save</button>
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

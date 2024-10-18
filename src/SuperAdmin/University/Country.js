import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveFSenderInvoice } from "../../api/invoice/sender";
import { getallCommission } from '../../api/commission';
import { getallApplication } from "../../api/applicatin";
import Mastersidebar from '../../compoents/sidebar';
import Select from "react-select";

const AddSenderInvoice = () => {
  const initialState = {
    tax: "",
    gst: "",
    tds: "",
    clientName: "",
    universityName: "",
    applicationID: "",
    application: [],  // Array of applications
    totalCourseFees: 0,
    finalAmmount: 0,
  };

  const initialStateErrors = {
    tax: { required: false },
    gst: { required: false },
    tds: { required: false },
    clientName: { required: false },
    universityName: { required: false },
    applicationID: { required: false },
    totalCourseFees: { required: false },
    finalAmmount: { required: false },
  };

  const [invoice, setInvoice] = useState(initialState);
  const [commission, setCommission] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllApplicationList();
    getAllCommissionList();
  }, []);

  const getAllCommissionList = () => {
    getallCommission()
      .then(res => setCommission(res?.data?.result))
      .catch(err => console.log(err));
  };

  const getAllApplicationList = () => {
    getallApplication()
      .then(res => setApplicationList(res?.data?.result))
      .catch(err => console.log(err));
  };

  const handleValidation = () => {
    let error = { ...initialStateErrors };
    let isValid = true;

    if (!invoice.clientName) {
      error.clientName.required = true;
      isValid = false;
    }
    if (!invoice.universityName) {
      error.universityName.required = true;
      isValid = false;
    }
    if (!selectedApplications.length) {
      error.applicationID.required = true;
      isValid = false;
    }
    if (!invoice.finalAmmount || invoice.finalAmmount <= 0) {
      error.finalAmmount.required = true;
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));

    if (submitted) {
      handleValidation();
    }
  };

  const handleChange = (selectedOptions) => {
    const newApplications = selectedOptions.map(option => {
      const selectedApplication = applicationList.find(app => app.applicationCode === option.value);
      return {
        applicationCode: selectedApplication.applicationCode,
        course: selectedApplication.course,
        courseFeesAmount: selectedApplication.courseFees,
      };
    });

    setSelectedApplications(newApplications);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (handleValidation()) {
      const finalInvoiceData = {
        ...invoice,
        application: selectedApplications,
        totalCourseFees: selectedApplications.reduce((total, app) => total + (app.courseFeesAmount || 0), 0),
        finalAmmount: selectedApplications.reduce((total, app) => total + (app.courseFeesAmount || 0), 0) * (invoice.inTakeValue || 0) / 100
      };

      saveFSenderInvoice(finalInvoiceData)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_invoice");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const options = applicationList
    .filter(application =>
      application.clientName === invoice.clientName &&
      application.universityName === invoice.universityName
    )
    .map(application => ({
      value: application.applicationCode,
      label: application.applicationCode,
    }));

  const uniqueUniversities = Array.from(
    new Set(
      applicationList
        .filter(uni => uni.clientName === invoice.clientName)
        .map(uni => uni.universityName)
    )
  ).map(universityName => ({
    value: universityName,
    label: universityName,
  }));

  return (
    <>
      <div>
        <Mastersidebar />
        <div className='content-wrapper' style={{ fontSize: '13px' }}>
          <form className="p-1" onSubmit={handleSubmit}>
            <div className='content-header'>
              <div className='container-fluid card card-body p-4 border-0'>
                <h4 className='card-title fw-bold'>Add Sender Invoice Details</h4>
                <hr />
                <div className='row g-3'>
                  <h4 className='card-title fw-bold mt-5'>Sender Name</h4>
                  <hr />
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" htmlFor="inputClientName">Client Name</label>
                    <select
                      onChange={handleInputs}
                      value={invoice.clientName}
                      name="clientName"
                      className="form-select form-select-lg rounded-2"
                      aria-label="Select Client Name"
                    >
                      <option value="">Select Client Name</option>
                      {[...new Set(applicationList.map(uni => uni.clientName))].map((clientName, index) => (
                        <option key={index} value={clientName}>
                          {clientName}
                        </option>
                      ))}
                    </select>
                    {errors?.clientName?.required && <div className="text-danger form-text">This field is required.</div>}
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" htmlFor="inputUniversity">University Name</label>
                    <select
                      onChange={handleInputs}
                      value={invoice.universityName}
                      name="universityName"
                      className="form-select form-select-lg rounded-2"
                      aria-label="Select University"
                      disabled={!invoice.clientName}
                    >
                      <option value="">Select University</option>
                      {uniqueUniversities.map((university, index) => (
                        <option key={index} value={university.value}>
                          {university.label}
                        </option>
                      ))}
                    </select>
                    {errors?.universityName?.required && <div className="text-danger form-text">This field is required.</div>}
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" htmlFor="inputApplicationID">Application ID</label>
                    <Select
                      isMulti
                      options={options}
                      onChange={handleChange}
                      value={selectedApplications.map(app => ({ value: app.applicationCode, label: app.applicationCode }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      name="applicationID"
                      isDisabled={!invoice.universityName}
                    />
                    {errors?.applicationID?.required && <div className="text-danger form-text">This field is required.</div>}
                  </div>

                  {selectedApplications.map((app, index) => (
                    <div key={index} className="row mt-3">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Application Code</label>
                        <input
                          className="form-control"
                          type="text"
                          value={app.applicationCode}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Course Name</label>
                        <input
                          className="form-control"
                          type="text"
                          value={app.course}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Course Fees</label>
                        <input
                          className="form-control"
                          type="text"
                          value={app.courseFeesAmount || 0}
                          readOnly
                        />
                      </div>
                    </div>
                  ))}

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-4">
                    <label className="form-label" htmlFor="finalAmount">Final Amount</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="finalAmmount"
                      value={invoice.finalAmmount}
                      onChange={handleInputs}
                     
                    />
                    {errors?.finalAmmount?.required && <div className="text-danger form-text">This field is required.</div>}
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-4">
                    <label className="form-label" htmlFor="inputGST">GST</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="gst"
                      value={invoice.gst}
                      onChange={handleInputs}
                    />
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-4">
                    <label className="form-label" htmlFor="inputTDS">TDS</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="tds"
                      value={invoice.tds}
                      onChange={handleInputs}
                    />
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">Save Invoice</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSenderInvoice;

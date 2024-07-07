import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveFSenderInvoice } from "../../api/invoice/sender";
import { getallUniversity } from '../../api/university';
import { getallApplication } from "../../api/applicatin";
import Mastersidebar from '../../compoents/sidebar';

const AddSenderInvoice = () => {
  const initialState = {
    tax: "",
    gst: "",
    tds: "",
    clientName: "",
    universityName: "",
    applicationID: "",
    currency: "",
    commission: "",
    amountToBeReceivedCurrency: "",
    amountReceivedInINRAndCurrency: "",
    INRValue: "",
    fixedAmount: "",
    courseFeesAmount: 0,
    scholarshipAmount: 0,
    paidFeesAmount: 0
  };

  const initialStateErrors = {
    tax: { required: false },
    gst: { required: false },
    tds: { required: false },
    clientName: { required: false },
    universityName: { required: false },
    applicationID: { required: false },
    currency: { required: false },
    commission: { required: false },
    amountToBeReceivedCurrency: { required: false },
    amountReceivedInINRAndCurrency: { required: false },
    INRValue: { required: false },
    fixedAmount: { required: false },
    courseFeesAmount: { required: false },
    scholarshipAmount: { required: false },
    paidFeesAmount: { required: false }
  };

  const [invoice, setInvoice] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [universityList, setUniversityList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
    getAllApplicationList();
  }, []);

  const getAllUniversityList = () => {
    getallUniversity().then(res => {
      setUniversityList(res?.data?.result);
    }).catch(err => {
      console.log(err);
    });
  };

  const getAllApplicationList = () => {
    getallApplication().then(res => {
      setApplicationList(res?.data?.result);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.tax === "") {
      error.tax.required = true;
    }
    if (data.clientName === "") {
      error.clientName.required = true;
    }
    if (data.universityName === "") {
      error.universityName.required = true;
    }
    if (data.applicationID === "") {
      error.applicationID.required = true;
    }
    if (data.currency === "") {
      error.currency.required = true;
    }
    if (data.courseFeesAmount === "") {
      error.courseFeesAmount.required = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice, [name]: value };

      if (name === "universityName") {
        const selectedUniversity = universityList.find(u => u.universityName === value);
        if (selectedUniversity) {
          return {
            ...updatedInvoice,
            universityName: selectedUniversity.universityName,
            clientName: selectedUniversity.businessName,
            currency: selectedUniversity.currency,
            paymentMethod: selectedUniversity.paymentMethod,
            fixedAmount: selectedUniversity.amount,
            courseFeesAmount: selectedUniversity.percentage,
            paidFeesAmount: selectedUniversity.percentage,
          };
        }
      }

      if (name === "applicationID") {
        const selectedApplication = applicationList.find(a => a.applicationCode === value);
        if (selectedApplication) {
          return {
            ...updatedInvoice,
            applicationID: selectedApplication.applicationCode,
            courseFeesAmount: selectedApplication.courseFees,
          };
        }
      }

      return updatedInvoice;
    });

    if (submitted) {
      const newError = handleValidation({ ...invoice, [name]: value });
      setErrors(newError);
    }
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmited = (event) => {
    event.preventDefault();
    const newError = handleValidation(invoice);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveFSenderInvoice(invoice)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListLoanEnquiry");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <div style={{ fontFamily: 'Plus Jakarta Sans' }}>
        <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
          <div className='content-wrapper' style={{ fontSize: '14px' }}>
            <form className="p-1" onSubmit={handleSubmited}>
              <div className='content-header'>
                <div className='container card card-body p-4 border-0'>
                  <h4 className='card-title  fw-bold'>Add Invoice Details</h4>
                  <hr />
                  <div className='row g-3'>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputTax">Tax</label>
                      <select className="form-select" aria-label="Default select example1" onChange={handleInputs} name='tax'>
                        <option>Select Tax</option>
                        <option value="Yes" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                        <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                      </select>
                      {errors.tax.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                      <br />
                      {invoice.tax === 'Yes' && (
                        <div className='row g-4'>
                          <div className="col">
                            <label className="form-label" htmlFor="inputGST">GST</label>
                            <select className="form-select" aria-label="Default select example2" onChange={handleInputs} name={'gst'}>
                              <option>Select GST</option>
                              <option value="Yes" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                              <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                            </select>
                            {invoice.gst === 'Yes' && (
                              <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                                <label className="form-label" htmlFor="inputGSTValue">GST Value</label>
                                <input className="form-control" id="inputGSTValue" type="text" name='gst' onChange={handleInputs} placeholder='Enter GST' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                              </div>
                            )}
                          </div>
                          <div className="col">
                            <label className="form-label" htmlFor="inputTDS">TDS</label>
                            <select className="form-select" aria-label="Default select example3" onChange={handleInputs} name='tds'>
                              <option>Select TDS</option>
                              <option value="Yes" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                              <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                            </select>
                            {errors.tds.required && (
                              <div className="text-danger form-text">This field is required.</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className='card-title fw-bold mt-5'>Sender Name</h4>
                    <hr />
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputUniversity">University Name</label>
                      <select onChange={handleInputs} value={invoice.universityName} name='universityName' className="form-select" aria-label="Default select example4">
                        <option>Select University</option>
                        {universityList.map((university) => (
                          <option key={university.universityName} value={university.universityName} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                            {university.universityName}
                          </option>
                        ))}
                      </select>
                      {errors.universityName.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputClientName">Client Name</label>
                      <input className="form-control" id="inputClientName" type="text" name='clientName' value={invoice.clientName} placeholder='Enter Client Name' onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.clientName.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputApplicationID">Application ID</label>
                      <select onChange={handleInputs} value={invoice.applicationID} name='applicationID' className="form-select" aria-label="Default select example4">
                        <option>Select Application ID</option>
                        {applicationList.map((application) => (
                          <option key={application.applicationCode} value={application.applicationCode} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                            {application.applicationCode}
                          </option>
                        ))}
                      </select>
                      {errors.applicationID.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <h4 className='card-title fw-bold mt-5'>Currency Details</h4>
                    <hr />
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputCurrency">Currency</label>
                      <input className="form-control" id="inputCurrency" type="text" name='currency' value={invoice.currency} placeholder='Enter Currency' onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.currency.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    
                   
                   
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputFixedAmount">Fixed Amount</label>
                      <input className="form-control" id="inputFixedAmount" type="text" name='fixedAmount' placeholder='Enter Fixed Amount' value={invoice.fixedAmount} onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.fixedAmount.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputCourseFeesAmount">Course Fees Amount</label>
                      <input className="form-control" id="inputCourseFeesAmount" type="text" name='courseFeesAmount' placeholder='Enter Course Fees Amount' value={invoice.courseFeesAmount} onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.courseFeesAmount.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputScholarshipAmount">Scholarship Amount</label>
                      <input className="form-control" id="inputScholarshipAmount" type="text" name='scholarshipAmount' placeholder='Enter Scholarship Amount' onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.scholarshipAmount.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSenderInvoice;

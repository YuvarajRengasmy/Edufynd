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
    businessName: "",
    universityName: "",
    applicationID: "",
    currency: "",
     paidFeesAmount:null,
    fixedAmount: null,
    courseFeesAmount: null,
    scholarshipAmount: null,
    paidFeesPercentage: null,
    courseFeesPercentage: null,
  };

  const initialStateErrors = {
    tax: { required: false },
    gst: { required: false },
    tds: { required: false },
    businessName: { required: false },
    universityName: { required: false },
    applicationID: { required: false },
    currency: { required: false },
  paidFeesAmount: { required: false },
    
    fixedAmount: { required: false },
    courseFeesAmount: { required: false },
    scholarshipAmount: { required: false },
    paidFeesPercentage: { required: false },
     courseFeesPercentage: { required: false }
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
    if (data.businessName === "") {
      error.businessName.required = true;
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
            businessName: selectedUniversity.businessName,
            currency: selectedUniversity.currency,
            paymentMethod: selectedUniversity.paymentMethod,
            fixedAmount: selectedUniversity.amount,
            courseFeesPercentage: selectedUniversity.courseFeesPercentage,
            paidFeesPercentage: selectedUniversity.paidFeesPercentage,
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
          navigate("/ListInvoice");
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
                              <option value="18" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                              <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                            </select>
                            
                          </div>
                          <div className="col">
                            <label className="form-label" htmlFor="inputTDS">TDS</label>
                            <select className="form-select" aria-label="Default select example3" onChange={handleInputs} name='tds'>
                              <option>Select TDS</option>
                              <option value="5" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
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
                      <input className="form-control" id="inputClientName" type="text" name='businessName' value={invoice.businessName} placeholder='Enter Client Name' onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.businessName.required && (
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

                            <label style={{ color: '#231F20' }} className="class-danger">
                              Payment Method
                            </label>
                            <select value={invoice?.paymentMethod} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select" name="paymentMethod" onChange={handleInputs}>
                              <option value="">Select Payment Type</option>
                              <option value="Fixed">Fixed Ammount</option>
                              <option value="CourseFees">courseFeesPercentage</option>
                              <option value="PaidFees">paidFeesPercentage</option>
                            </select>
                            <br />
                            {invoice.paymentMethod === 'Fixed' ? (
                              <div className="form-group">
                                <label style={{ color: '#231F20' }} className="class-danger">Fixed Amount</label>

                                <input
                                  name="fixedAmount"
                                  className="form-control"
                                  type="text"
                                  placeholder='Enter Amount'
                                  value={invoice?.fixedAmount}
                                  style={{ height: 50 }}
                                  onChange={handleInputs}
                                />

                              </div>
                            ) : invoice.paymentMethod === 'CourseFees' ? (
                              <div className="form-group">
                                <label style={{ color: '#231F20' }} className="class-danger"> Course Fees Percentage</label>

                                <input
                                  name="courseFeesPercentage"
                                  className="form-control"
                                  value={invoice?.courseFeesPercentage}
                                  type="number"
                                  placeholder='Enter Percentage'
                                  style={{ height: 50 }}
                                  onChange={handleInputs}
                                />

                              </div>
                            ) : invoice.paymentMethod === 'PaidFees' ? (
                              <div className="form-group">
                                <label style={{ color: '#231F20' }} className="class-danger"> PaidFees Percentage</label>

                                <input
                                  name="paidFeesPercentage"
                                  className="form-control"
                                  value={invoice?.paidFeesPercentage}
                                  type="number"
                                  placeholder='Enter Percentage'
                                  style={{ height: 50 }}
                                  onChange={handleInputs}
                                />
                                <input
                                  name="paidFeesAmount"
                                  className="form-control"
                                 
                                  type="number"
                                  placeholder='Enter Ammount'
                                  style={{ height: 50 }}
                                  onChange={handleInputs}
                                />

                              </div>
                            ) :null}
                          </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputCourseFeesAmount">Course Fees Amount</label>
                      <input className="form-control" id="inputCourseFeesAmount" type="number" name='courseFeesAmount' placeholder='Enter Course Fees Amount' value={invoice.courseFeesAmount} onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.courseFeesAmount.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputScholarshipAmount">Scholarship Amount</label>
                      <input className="form-control" id="inputScholarshipAmount" type="number" name='scholarshipAmount' placeholder='Enter Scholarship Amount' onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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

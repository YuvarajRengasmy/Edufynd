import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveFSenderInvoice } from "../../api/invoice/sender";
import { getallUniversity } from '../../api/university';
import { getallApplication } from "../../api/applicatin";
import { getallOfferTatModule } from '../../api/universityModule/offerTat';
import Mastersidebar from '../../compoents/sidebar';

const AddSenderInvoice = () => {
  const initialState = {
    tax: "",
    gst: "",
    tds: "",
    offerTAT: "",
    businessName: "",
    universityName: "",
    applicationID: "",
    currency: "",
  };

  const initialStateErrors = {
    tax: { required: false },
    gst: { required: false },
    tds: { required: false },
    offerTAT: { required: false },
    businessName: { required: false },
    universityName: { required: false },
    applicationID: { required: false },
  };

  const [invoice, setInvoice] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [offerTAT, setOfferTat] = useState([]);
  const [universityList, setUniversityList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
    getAllApplicationList();
    getOfferTatList();
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

  const getOfferTatList = () => {
    getallOfferTatModule()
      .then((res) => {
        const value = res?.data?.result;
        setOfferTat(value);
      })
      .catch((err) => {
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
                  <h4 className='card-title fw-bold'>Add Invoice Details</h4>
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
                          <option key={university.universityID} value={university.universityName}>{university.universityName}</option>
                        ))}
                      </select>
                      {errors.universityName.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputBusinessName">Business Name</label>
                      <input type="text" onChange={handleInputs} value={invoice.businessName} name='businessName' className="form-control" />
                      {errors.businessName.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputApplicationID">Application Code</label>
                      <select onChange={handleInputs} value={invoice.applicationID} name='applicationID' className="form-select" aria-label="Default select example5">
                        <option>Select Application Code</option>
                        {applicationList.map((application) => (
                          <option key={application.applicationID} value={application.applicationCode}>{application.applicationCode}</option>
                        ))}
                      </select>
                      {errors.applicationID.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputOfferTAT">Offer TAT</label>
                      <select onChange={handleInputs} value={invoice.offerTAT} name='offerTAT' className="form-select" aria-label="Default select example6">
                        <option>Select Offer TAT</option>
                        {offerTAT.map((tat) => (
                          <option key={tat.offerTATID} value={tat.offerTAT}>{tat.offerTAT}</option>
                        ))}
                      </select>
                      {errors.offerTAT.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                    </div>
                    {invoice.offerTAT && offerTAT.find((tat) => tat.offerTAT === invoice.offerTAT)?.labels.map((label, index) => (
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={index}>
                        <label className="form-label" htmlFor={`inputDynamicLabel${index}`}>{label}</label>
                        <input type="text" onChange={handleInputs} name={`dynamicLabel${index}`} className="form-control" />
                      </div>
                    ))}
                    <h4 className='card-title fw-bold mt-5'>Course Fees</h4>
                    <hr />
                  </div>
                </div>
                <div className='row my-4'>
                  <div className="col">
                    <button className="btn btn-primary" type="submit">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSenderInvoice;

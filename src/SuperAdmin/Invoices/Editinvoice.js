import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { updateSenderInvoice,getSingleSenderInvoice } from "../../api/invoice/sender";
import { getallCommission } from '../../api/commission';
import { getallApplication } from "../../api/applicatin";
import Mastersidebar from '../../compoents/sidebar';
import Select from "react-select";

const AddSenderInvoice = () => {
  const location = useLocation();
 const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    tax: "",
    gst: "",
    tds: "",
    clientName: "",
    universityName: "",
    applicationID:[],
    application:[{applicationCode: "",courseFeesAmount:"",course:"", agentName: "",amountReceivedInINR:""}],
    totalCourseFees: "",
    finalValue: "",
    commission: "",
    paymentMethod: "",
  };

  const initialStateErrors = {
    tax: { required: false },
    gst: { required: false },
    tds: { required: false },
    clientName: { required: false },
    universityName: { required: false },
    applicationID: { required: false },
    application: { required: false },
    totalCourseFees: { required: false },
    finalValue: { required: false },
  };

  const [invoice, setInvoice] = useState(initialState);
  const [commission, setCommssion] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [selectedApplications, setSelectedApplications] = useState([]); // To store selected applications
  const [applicationList, setApplicationList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    getAllApplicationList();
    getAllCommissionList();
    getAllInvoiceListed();
  }, []);

 const getAllCommissionList = () => {
    getallCommission().then(res => {
      setCommssion(res?.data?.result);
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

  const getAllInvoiceListed = () => {
    getSingleSenderInvoice(id).then(res => {
     setInvoice(res?.data?.result);
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
   
    return error;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    
    setInvoice((prevInvoice) => {
        const updatedInvoice = { ...prevInvoice, [name]: value };

        // When client name is selected
        if (name === "clientName") {
            const selectedUniversity = applicationList.find(u => u.clientName === value);
            if (selectedUniversity) {
                return {
                    ...updatedInvoice,
                    clientName: selectedUniversity.clientName,
                    universityName: selectedUniversity.universityName,
                    applicationID: selectedUniversity.applicationCode,
                    courseFeesAmount: selectedUniversity.courseFees,
                    tax: selectedUniversity.tax,
                    gst: selectedUniversity.gst,
                    tds: selectedUniversity.tds,
                };
            }
        }

        // When university name is selected
        if (name === "universityName") {
            const selectedUniversity = commission.find(u => u.universityName === value);
            if (selectedUniversity) {
                // Assuming selectedUniversity.years is an array and you want the first year
                const firstYear = selectedUniversity.years?.[0]; // Access the first year
                const firstCourseType = firstYear?.courseTypes?.[0]; // Access the first course type
                const firstInTake = firstCourseType?.inTake?.[0]; // Access the first intake
                
                return {
                    ...updatedInvoice,
                    paymentMethod: selectedUniversity.paymentMethod, // Get payment method
                    courseType: firstCourseType?.courseType || "", // Get the course type if available
                    commission: firstInTake?.value || 0, // Get intake value if available
                };
            }
        }

        return updatedInvoice; // Return the updated invoice if no conditions matched
    });

    // Handle validation if form is submitted
    if (submitted) {
        const newError = handleValidation({ ...invoice, [name]: value });
        setErrors(newError);
    }
};

const handleChange = (selectedOptions) => {
  // Map selected options to selectedApplications array format
  const newApplications = selectedOptions.map(option => {
    const selectedApplication = applicationList.find(app => app.applicationCode === option.value);
    return {
      applicationCode: selectedApplication.applicationCode,
      course: selectedApplication.course,
      courseFeesAmount: selectedApplication.courseFees,
      amountReceivedInINR: selectedApplication.amountReceivedInINR,
      agentName: selectedApplication.agentName || '', // Ensure agentName is fetched properly or set to empty string if not present
     
    };
  });

  // Update state, ensuring no duplicates are added
  setSelectedApplications(prevApps => {
    const existingCodes = prevApps.map(app => app.applicationCode);
    const filteredNewApps = newApplications.filter(app => !existingCodes.includes(app.applicationCode));
    return [...prevApps, ...filteredNewApps];
  });
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
    const finalInvoiceData = {
      ...invoice,
      application: selectedApplications,  
      totalCourseFees: selectedApplications.reduce((total, app) => total + (app.courseFeesAmount || 0), 0),
      finalValue: selectedApplications.reduce((total, app) => total + (app.courseFeesAmount || 0), 0) * (invoice.commission || 0) / 100

    };
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      updateSenderInvoice(finalInvoiceData)
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
        .filter(uni => uni.clientName === invoice.clientName) // Filter based on clientName
        .map(uni => uni.universityName) // Get university names
    )
  ).map(universityName => {
    // Return an object with value and label for the select options
    return { value: universityName, label: universityName };
  });
  return (
    <>
    
        <div >
         
            <Mastersidebar />
         
          <div className='content-wrapper' style={{ fontSize: '13px' }}>
            <form className="p-1" onSubmit={handleSubmited}>
              <div className='content-header'>
                <div className='container-fluid card card-body p-4 border-0'>
                  <h4 className='card-title  fw-bold'>Edit Sender Invoice Details</h4>
                  <hr />
                  <div className='row g-3'>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" htmlFor="inputTax">Tax</label>
                      <select className="form-select form-select-lg rounded-2" value={invoice.tax} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} aria-label="Default select example1" onChange={handleInputs} name='tax'>
                        <option>Select Tax</option>
                        <option value="Yes" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                        <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                      </select>
                      {errors.tax.required && (
                        <div className="text-danger form-text">This field is required.</div>
                      )}
                      <br />
                     
                    </div>
                    {invoice.tax === 'Yes' && (
                        <div className='row g-4'>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label" htmlFor="inputGST">GST</label>
                            <select className="form-select form-select-lg rounded-2" value={invoice.gst} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} aria-label="Default select example2" onChange={handleInputs} name={'gst'}>
                              <option>Select GST</option>
                              <option value="18" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                              <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                            </select>

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label" htmlFor="inputTDS">TDS</label>
                            <select className="form-select form-select-lg rounded-2" value={invoice.tds} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} aria-label="Default select example3" onChange={handleInputs} name='tds'>
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
                    <h4 className='card-title fw-bold mt-5'>Sender Name</h4>
                    <hr />
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label className="form-label" htmlFor="inputClientName">Client Name</label>
  <select 
    onChange={handleInputs} 
    value={invoice.clientName} 
    name="clientName" 
    className="form-select form-select-lg rounded-2" 
    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
    aria-label="Default select example4"
  >
    <option value="">Select Client Name</option>
    {[...new Set(applicationList.map(uni => uni.clientName))].map((clientName, index) => (
      <option key={index} value={clientName} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
        {clientName}
      </option>
    ))}
  </select>
  {errors?.clientName?.required && (
    <div className="text-danger form-text">This field is required.</div>
  )}
</div>

<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label className="form-label" htmlFor="inputUniversity">University Name</label>
  <select 
    onChange={handleInputs} 
    value={invoice.universityName} 
    name="universityName" 
    className="form-select form-select-lg rounded-2" 
    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
    aria-label="Default select example4"
    disabled={!invoice.clientName}
  >
    <option value="">Select University</option>
    {uniqueUniversities.map((university, index) => (
          <option key={index} value={university.value} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
            {university.label}
          </option>
        ))}
  </select>
  {errors?.universityName?.required && (
    <div className="text-danger form-text">This field is required.</div>
  )}
</div>

<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  visually-hidden">
  <label className="form-label " htmlFor="inputApplicationID">Application ID</label>
  <Select
        isMulti
        options={options}
        onChange={handleChange}
        value={selectedApplications.map(app => ({ value: app.applicationCode, label: app.applicationCode }))}
        className="basic-multi-select"
        classNamePrefix="select"
        name="applicationID"
        isDisabled={!invoice.universityName} // Disable if universityName is not selected
      />
  {errors?.applicationID?.required && (
    <div className="text-danger form-text">This field is required.</div>
  )}
</div>
{invoice.paymentMethod && (
 <>
  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
    <label className="form-label">Payment Method</label>
    <input 
      className="form-control" 
      type="text" 
      name='paymentMethod'
      value={invoice.paymentMethod} 
     onChange={handleInputs}
      readOnly 
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
    />
  </div>
   <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
   <label className="form-label">Commission</label>
   <input 
     className="form-control" 
     type="text" 
     name='commission'
     value={invoice.commission} 
    onChange={handleInputs}
     readOnly 
     style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
   />
 </div>
 </>
)}

{/* Render dynamic fields for each selected application */}
{invoice.application.map((app, index) => (
  <div key={index} className="row mt-3" >
     <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label" >applicationCode</label>
      <input 
        className="form-control" 
        type="text" 
        name="applicationCode"
        placeholder="Enter applicationCode" 
        value={app.applicationCode}
        onChange={handleInputs} 
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
        readOnly
      />
      
    </div>
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label" >Course Name</label>
      <input 
        className="form-control" 
        type="text" 
        name="course"
        placeholder="Enter Course Name" 
        value={app.course} 
        onChange={handleInputs}
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
        readOnly
      />
      
    </div>

    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label" >Course Fees Amount</label>
      <input 
        className="form-control" 
        onChange={handleInputs}
        type="number" 
        name="courseFeesAmount" 
        placeholder="Enter Course Fees Amount" 
        value={app.courseFeesAmount} 
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
        readOnly
      />
      
    </div>
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label" >Commission In INR</label>
      <input 
        className="form-control" 
        onChange={handleInputs}
        type="number" 
        name="amountReceivedInINR" 
        placeholder="Enter Course Fees Amount" 
        value={app.amountReceivedInINR} 
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
       
      />
      
    </div>
    {  app.agentName  ? (
      <>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
          <label className="form-label">Agent Name</label>
          <input
            className="form-control"
            type="text"  // This should be text instead of number since agent names are usually strings
            name="agentName"
            placeholder="Enter Agent Name"
            value={app.agentName}
            onChange={handleInputs}
            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            readOnly
          />
        </div>

      </>
    ) : null}
  </div>
))}


<div className="row mt-3">
  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
    <label className="form-label">Total Course Fees Amount</label>
    <input 
      className="form-control" 
      type="number" 
      name="totalCourseFees" 
      placeholder="Total Course Fees" 
      onChange={handleInputs}
value={invoice.totalCourseFees}
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
      readOnly
    />
     
  </div>
  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
    <label className="form-label">Course Fees Inr</label>
    <input 
      className="form-control" 
      type="number" 
      name="CourseFeesInr" 
      placeholder="Total Course Fees" 
      onChange={handleInputs}
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
     
    />
     
  </div>
  {/* Calculate Final Value */}
  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label">Final Value</label>
      <input 
        className="form-control" 
        type="number" 
        name="finalValue" 
        value={invoice.finalValue}
        placeholder="Final Value" 
        onChange={handleInputs}   
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
        readOnly
      />
       
    </div>
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label">Final Value Inr</label>
      <input 
        className="form-control" 
        type="number" 
        name="finalValueInr" 
       
        placeholder="Final Value Inr" 
        onChange={handleInputs}   
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
        readOnly
      />
       
    </div>
</div>


 
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      
    </>
  );
}

export default AddSenderInvoice;

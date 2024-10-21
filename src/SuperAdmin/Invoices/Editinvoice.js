import React, { useEffect, useState,useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { updateSenderInvoice,getSingleSenderInvoice,statusSenderInvoice } from "../../api/invoice/sender";
import { getallCommission } from '../../api/commission';
import { getallApplication } from "../../api/applicatin";
import Mastersidebar from '../../compoents/sidebar';
import Select from "react-select";
import { FiEdit, } from 'react-icons/fi';

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
    application: [],
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
  const initialStates = {
    applicationCode: "",
    courseFeesAmount:"",
    course:"", 
    universityName:"",
    commissionValue:"",

    amountReceivedInINR:"",
  };
  const initialStateError = {
    applicationCode: { required: false },
    courseFeesAmount:{ required: false },
    course:{ required: false }, 
    universityName:{ required: false },
    commissionValue:{ required: false },
   
    amountReceivedInINR:{ required: false },
  };
  const [invoice, setInvoice] = useState(initialState);
  const [invoices, setInvoices] = useState(initialStates);
  const [error, setError] = useState(initialStateError);

  const [commission, setCommssion] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [selectedApplications, setSelectedApplications] = useState([]); // To store selected applications
  const [applicationList, setApplicationList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const modal = useRef(null)
  // Function to toggle edit mode
 

  useEffect(() => {
   
    getAllApplicationList();
    getAllCommissionList();
    getAllInvoiceListed();
    getAllInvoiceList();
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
  const getAllInvoiceList = () => {
    getSingleSenderInvoice(id).then(res => {
     setInvoices(res?.data?.result?.application);
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
   
   
    return error;
  };
  const handleValidations = (data) => {
    let error = initialStateError;
    if (data.applicationCode === "") {
      error.applicationCode.required = true;
    }
    if (data.courseFeesAmount === "") {
      error.courseFeesAmount.required = true;
    }
    if (data.course === "") {
      error.course.required = true;
    }
    if (data.universityName === "") {
      error.universityName.required = true;
    }
    if (data.commissionValue === "") {
      error.commissionValue.required = true;
    }
    
    if (data.amountReceivedInINR === "") {
      error.amountReceivedInINR.required = true;
    }
    return error;
  };
  const handleinvoice = (event) => {
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
const handleEditExperience = (data) => {
  setInvoices(data)
  setSubmitted(false)
  setError(initialStateError)
}

const handleExperienceinvoice = (event) => {
  setInvoices({ ...invoices, [event?.target?.name]: event?.target?.value })
  if (submitted) {
      const newError = handleValidations({ ...invoices, [event.target.name]: event.target.value })
      setError(newError)
  }
}
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
    const allinvoiceValid = Object.values(newError);
    const valid = allinvoiceValid.every((x) => x.required === false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrorExperience = handleValidations(invoices)
    setError(newErrorExperience)
    setSubmitted(true)
    if (handleErrors(newErrorExperience)) {
        if (invoices?._id) {
            const data = {
                _id: invoice._id,
                application: invoices
            }
            statusSenderInvoice(data)
                .then((res) => {
                    toast.success(" Update Application Invoice");
                    modal.current.click();
                    getAllInvoiceList();
                })
                .catch(err => console.log(err))

        }
       

    }
}

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
                      <select className="form-select form-select-lg rounded-2" value={invoice.tax} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} aria-label="Default select example1" onChange={handleinvoice} name='tax'>
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
                            <select className="form-select form-select-lg rounded-2" value={invoice.gst} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} aria-label="Default select example2" onChange={handleinvoice} name={'gst'}>
                              <option>Select GST</option>
                              <option value="18" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Yes</option>
                              <option value="No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>No</option>
                            </select>

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label className="form-label" htmlFor="inputTDS">TDS</label>
                            <select className="form-select form-select-lg rounded-2" value={invoice.tds} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} aria-label="Default select example3" onChange={handleinvoice} name='tds'>
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
    onChange={handleinvoice} 
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
    onChange={handleinvoice} 
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
     onChange={handleinvoice}
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
    onChange={handleinvoice}
     readOnly 
     style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
   />
 </div>
 </>
)}

<div className="container">
      

      {invoice.application.map((data, index) => (
         <div key={index} className='card rounded mt-2 px-3 pt-1 '>
         <div className='container'>
             <div className='modal-btn d-flex gap-2 align-items-center justify-content-end'>
                 <Link onClick={() => handleEditExperience(data)} className="btn  btn-sm btn-light  border-0" data-bs-toggle="modal" data-bs-target="#modal_4" aria-controls="modal_4" type="button"><FiEdit />
                 </Link>
                
             </div>
         </div>
         <div className='row row-cols-md-2 row-cols-1'>
             <p className='fw-bold '>Application Code - <span className='fw-lighter'> {data?.applicationCode}</span></p>
             <p className='fw-bold '>University Name - <span className='fw-lighter'> {data?.universityName}</span></p>
             <p className='fw-bold '>Course Name - <span className='fw-lighter'> {data?.course}</span></p>
             <p className='fw-bold '>courseFees - <span className='fw-lighter'> {data?.courseFeesAmount}</span></p>
             <p className='fw-bold '> Commission Value- <span className='fw-lighter'> {data?.commissionValue}</span></p>
             <p className='fw-bold '>AmountReceivedInINR - <span className='fw-lighter'> {data?.amountReceivedInINR}</span></p>
         </div>
     </div>
      ))}
    </div>

<div className="row mt-3">
  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
    <label className="form-label">Total Course Fees Amount</label>
    <input 
      className="form-control" 
      type="number" 
      name="totalCourseFees" 
      placeholder="Total Course Fees" 
      onChange={handleinvoice}
value={invoice.totalCourseFees}
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
      readOnly
    />
     
  </div>
  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
    <label className="form-label">Total Course Fees Inr</label>
    <input 
      className="form-control" 
      type="number" 
      name="courseFeeInINR" 
      placeholder="Total Course Fees" 
      onChange={handleinvoice}
      value={invoice.courseFeeInINR}
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
     
    />
     
  </div>
  {/* Calculate Final Value */}
  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label">Final Value</label>
      <input 
        className="form-control" 
        type="number" 
        name="finalValue" 
        value={invoice.finalValue}
        placeholder="Final Value" 
        onChange={handleinvoice}   
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
        readOnly
      />
       
    </div>
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
      <label className="form-label">Final Value Inr</label>
      <input 
        className="form-control" 
        type="number" 
        name="finalValueInINR" 
        value={invoice.finalValueInINR}
        placeholder="Final Value Inr" 
        onChange={handleinvoice}   
        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} 
      
      />
       
    </div>
</div>


 
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div className='d-flex justify-content-between align-items-start'>
                            <p className='fw-bold'>Edit Application</p>
                            
                            <div className="modal fade " id="modal_4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable" >
                                    <div className="modal-content border-0 shadow-lg rounded m-3">
                                        <div className="card w-100  border-0  shadow" style={{ height: '600px' }} >
                                            <div className="modal-header d-flex justify-content-between align-items-center">
                                                <p className="modal-title fs-4 fw-bolder mb-3" id="exampleModalToggleLabel">Edit Application Invoice</p>
                                                <button type="button" ref={modal} className="btn-close bg-white border rounded-5 m-0 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body  ">
                                                <div className='container-fluid'>
                                                    <form className='fw-bolder' onSubmit={handleSubmit}>
                                                        <div className=' row row-cols-lg-2 row-cols-1'>

                                                            <div className="mb-3 col">
                                                                <label htmlFor="title" className="form-label text-secondary" >Application Code<span className="text-danger">*</span></label>
                                                                <input type="text" name="applicationCode" value={invoices?.applicationCode} onChange={handleExperienceinvoice} placeholder='State University' className="form-control" id="title" />
                                                                {error.applicationCode.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="universityName" className="form-label text-secondary">University Name<span className="text-danger">*</span></label>
                                                                <input type="text" name="universityName" value={invoices?.universityName} onChange={handleExperienceinvoice} placeholder='Bachelor' className="form-control" id="universityName" />
                                                                {error.universityName.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>

                                                           
                                                            

                                                            <div className='mb-3 col'>
                                                                <label className="form-label text-secondary">Course Name<span className="text-danger">*</span></label>
                                                                <input type="text" name="course" value={invoices?.course} onChange={handleExperienceinvoice} className="form-control" id="course" />
                                                                {error.course.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className='mb-3 col'>
                                                                <label className="form-label text-secondary">course Fee<span className="text-danger">*</span></label>
                                                                <input type="text" name="courseFeesAmount" value={invoices?.courseFeesAmount} onChange={handleExperienceinvoice} className="form-control" id="courseFeesAmount" />

                                                                {error.courseFeesAmount.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="location" className="form-label text-secondary">Commission Value<span className="text-danger">*</span></label>
                                                                <input type="text" name="commissionValue" value={invoices?.commissionValue} onChange={handleExperienceinvoice} placeholder='Ex: 100%' className="form-control w-100" id="location" />
                                                                {error.commissionValue.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                           
                                                            <div className="mb-2 col">
                                                                <label htmlFor="skills" className="form-label text-secondary">Amount Received In INR<span className="text-danger">*</span></label>
                                                                <input type="text" name='amountReceivedInINR' value={invoices?.amountReceivedInINR} onChange={handleExperienceinvoice} placeholder='Ex:React,Node,Python etc..' className="form-control w-100" id="skills" />
                                                                {error.amountReceivedInINR.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            
                                                            <div className=" justify-content-end d-flex gap-3 mt-5" >
                                                            <button type="submit" className="btn btn-primary" >{invoices?._id ? 'Update' : 'Save'}</button>
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        </div>
                                                        </div>
                                                        
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>






                        </div>
        </div>
      
    </>
  );
}

export default AddSenderInvoice;

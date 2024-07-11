import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import { getallCurrency } from '../../api/currency';
import { getUniversitiesByCountry } from '../../api/university';
import Flags from 'react-world-flags';

import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";

function AddCommission() {
    const initialState = {
        country: "",
        universityName: "",
        businessName: "",
        paymentMethod: "",
        amount: null,
        percentage: null,
        commissionPaidOn: "",
        eligibility: "",
        tax: "",
        paymentType: "",
        currency: "",
        flag: "",
        clientName: "",
        years: [{ id: 1, year: '', courseType: '', inTake1: '', inTake2: '', inTake3: "", value1: null, value2: null, value3: null }],
    };

    const initialStateErrors = {
        country: { required: false },
        universityName: { required: false },
        businessName: { required: false },
        paymentMethod: { required: false },
        amount: { required: false },
        percentage: { required: false },
        commissionPaidOn: { required: false },
        eligibility: { required: false },
        tax: { required: false },
        paymentType: { required: false },
        years: { required: false },
        flag: { required: false },
        clientName: { required: false },
        currency: { required: false },
    };

    const [commission, setCommission] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [countries, setCountries] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCurrencyDetails();
    }, []);

    const getAllCurrencyDetails = () => {
        getallCurrency()
            .then((res) => {
                setCountries(res?.data?.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (!data.country) {
            error.country.required = true;
        }
        if (!data.universityName) {
            error.universityName.required = true;
        }
        if (!data.paymentMethod) {
            error.paymentMethod.required = true;
        }
        if (!data.eligibility) {
            error.eligibility.required = true;
        }
        if (!data.tax) {
            error.tax.required = true;
        }
        if (!data.paymentType) {
            error.paymentType.required = true;
        }
        return error;
    };

    const fetchCountryDetails = (selectedCountry) => {
        const selectedCountryData = countries.find(c => c.country === selectedCountry);
        if (selectedCountryData) {
            setCommission(prevState => ({
                ...prevState,
                currency: selectedCountryData.currency,
                flag: selectedCountryData.flag,
            }));
        }
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCommission({ ...commission, country: selectedCountry });

        getUniversitiesByCountry(selectedCountry)
            .then((res) => {
                setUniversities(res?.data?.result || []);
            })
            .catch((err) => {
                console.error(`Error fetching universities for ${selectedCountry}:`, err);
                setUniversities([]);
            });

        fetchCountryDetails(selectedCountry);
    };

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setCommission({ ...commission, [name]: value });

        if (name === "universityName") {
            const selectedUniversity = universities.find(u => u.universityName === value);
            if (selectedUniversity) {
                setCommission(prevState => ({
                    ...prevState,
                    universityId: selectedUniversity._id,
                    paymentMethod: selectedUniversity.paymentMethod,
                    tax: selectedUniversity.tax,
                    clientName: selectedUniversity.businessName,
                    amount: selectedUniversity.amount,
                    percentage: selectedUniversity.percentage,
                    commissionPaidOn: selectedUniversity.commissionPaidOn,
                    eligibility: selectedUniversity.eligibilityForCommission,
                    tax: selectedUniversity.tax,
                }));
            }
        }

        if (submitted) {
            const newError = handleValidation({ ...commission, [name]: value });
            setErrors(newError);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(commission);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
            saveClient(commission)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/client");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    return (
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div className="container-fluid">
                <nav className="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                </nav>

                <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                    <div className="content-header">
                        <div className="content container-fluid">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                                            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                                                <h5 className='text-center text-capitalize p-1'>Add Commission Details</h5>
                                            </div>
                                            <div className="card-body mt-5">
                                                <div className="row g-3">
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Country<span className="text-danger">*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="country"
                                                            value={commission.country}
                                                            onChange={handleCountryChange}
                                                        >
                                                            <option value="">Select Country</option>
                                                            {countries.map((country) => (
                                                                <option key={country._id} value={country.country}>
                                                                    {country.country}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.country.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>University<span className="text-danger">*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="universityName"
                                                            value={commission.universityName}
                                                            onChange={handleInputs}
                                                        >
                                                            <option value="">Select University</option>
                                                            {universities.map((uni) => (
                                                                <option key={uni._id} value={uni.universityName}>
                                                                    {uni.universityName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.universityName.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Payment Method<span className="text-danger">*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="paymentMethod"
                                                            value={commission.paymentMethod}
                                                            onChange={handleInputs}
                                                        >
                                                            <option value="">Select Payment Type</option>
                                                            <option value="Fixed">Fixed Amount</option>
                                                            <option value="Percentage">Percentage</option>
                                                        </select>
                                                        {errors.paymentMethod.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}

                                                        {commission.paymentMethod === 'Fixed' ? (
                                                            <div className="form-group">
                                                                <label style={{ color: '#231F20' }}>Fixed Amount</label>
                                                                <input
                                                                    name="amount"
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder='Enter Amount'
                                                                    value={commission?.amount}
                                                                    style={{ height: 50 }}
                                                                    onChange={handleInputs}
                                                                />
                                                            </div>
                                                        ) : commission.paymentMethod === 'Percentage' ? (
                                                            <div className="form-group">
                                                                <label style={{ color: '#231F20' }}>Course Fees Percentage</label>
                                                                <input
                                                                    name="percentage"
                                                                    className="form-control"
                                                                    value={commission?.percentage}
                                                                    type="number"
                                                                    placeholder='Enter Percentage'
                                                                    style={{ height: 50 }}
                                                                    onChange={handleInputs}
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Commission Paid On<span className="text-danger">*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="commissionPaidOn"
                                                            value={commission.commissionPaidOn}
                                                            onChange={handleInputs}
                                                        >
                                                            <option value="">Select Commission Paid On</option>
                                                            <option value="CourseFees">Course Fees</option>
                                                            <option value="PaidFees">Paid Fees</option>
                                                        </select>
                                                        {errors.commissionPaidOn.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Eligibility<span className="text-danger">*</span></label>
                                                        <input type="text" value={commission?.eligibility} className="form-control" placeholder="Enter Eligibility" name="eligibility" onChange={handleInputs} />
                                                        {errors.eligibility.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Tax<span className="text-danger">*</span></label>
                                                        <input type="text" value={commission?.tax} className="form-control" placeholder="Enter Tax" name="tax" onChange={handleInputs} />
                                                        {errors.tax.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                                                        <label style={{ color: "#231F20" }}>Client Name<span className="text-danger">*</span></label>
                                                        <input type="text" value={commission?.clientName} className="form-control" placeholder="Enter Client Name" name="clientName" onChange={handleInputs} />
                                                        {errors.clientName.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Currency
                            </label>
                            <div sm="9" className="d-flex align-items-center">
                              {commission.flag && (
                                <Flags code={commission.flag} className="me-2" style={{ width: '40px', height: '30px' }} onChange={handleInputs} name='flag' />
                              )}
                              <input className='form-control' type="text" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs} name='currency' value={`${commission.currency}`} readOnly />
                            </div>
                            {errors.currency.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                                                  
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Currency<span className="text-danger">*</span></label>
                                                       <select className="form-select" value={commission?.paymentType} aria-label="Default select example" name="paymentType" onChange={handleInputs}>
                                                            <option value=""> select Payment Type</option>
                                                            <option value="One_Time">One Time</option>
                                                            <option value="Semester">  Semester   </option> 
                                                        </select>
                                                        {errors.paymentType.required ? <span className="text-danger form-text profile_error">This field is required.</span> : null}
                                                    </div>
                                                </div>


                                                <div className="col-xl-12">
                                                    <button type="submit" className="btn btn-primary mt-4">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCommission;

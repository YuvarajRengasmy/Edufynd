import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import { getallCurrency } from '../../api/currency';
import {getUniversitiesByCountry  } from '../../api/university'; // Assuming you have an API function to fetch universities by country

import Sidebar from '../../compoents/sidebar';

function AddCommission() {
    const initialState = {
        country: '',
        universityName: '',
        paymentMethod: '',
        eligibility: '',
        tax: '',
        clientName: '',
        flag: '',
        currency: '',
    };

    const initialStateErrors = {
        country: false,
        universityName: false,
        paymentMethod: false,
        eligibility: false,
        tax: false,
        clientName: false,
        flag: false,
        currency: false,
    };

    const [commission, setCommission] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [countries, setCountries] = useState([]);
    const [universities, setUniversities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCurrencyDetails();
    }, []);

    const getAllCurrencyDetails = () => {
        getallCurrency()
            .then((res) => {
                setCountries(res?.data?.result || []);
            })
            .catch((err) => {
                console.error('Error fetching countries:', err);
            });
    };

    const handleValidation = () => {
        const newErrors = {
            ...initialStateErrors,
            country: !commission.country,
            universityName: !commission.universityName,
            paymentMethod: !commission.paymentMethod,
            eligibility: !commission.eligibility,
            tax: !commission.tax,
            clientName: !commission.clientName,
            flag: !commission.flag,
            currency: !commission.currency,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCommission({ ...commission, country: selectedCountry });

        getUniversitiesByCountry (selectedCountry)
            .then((res) => {
                setUniversities(res?.data?.result || []);
            })
            .catch((err) => {
                console.error(`Error fetching universities for ${selectedCountry}:`, err);
                setUniversities([]);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCommission({ ...commission, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (handleValidation()) {
            saveClient(commission)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate('/client');
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || 'Failed to save client');
                });
        } else {
            toast.error('Please fill all required fields correctly.');
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="content-wrapper">
                <div className="content-header">
                    <h5 className="text-center text-capitalize">Add Commission Details</h5>
                </div>
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Country</label>
                                <select
                                    className={`form-select ${errors.country && 'is-invalid'}`}
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
                                {errors.country && <div className="invalid-feedback">Please select a country.</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">University</label>
                                <select
                                    className={`form-select ${errors.universityName && 'is-invalid'}`}
                                    name="universityName"
                                    value={commission.universityName}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select University</option>
                                    {universities.map((uni) => (
                                        <option key={uni._id} value={uni.universityName}>
                                            {uni.universityName}
                                        </option>
                                    ))}
                                </select>
                                {errors.universityName && (
                                    <div className="invalid-feedback">Please select a university.</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Payment Method</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.paymentMethod && 'is-invalid'}`}
                                    name="paymentMethod"
                                    value={commission.paymentMethod}
                                    onChange={handleInputChange}
                                />
                                {errors.paymentMethod && (
                                    <div className="invalid-feedback">Please enter payment method.</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Eligibility</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.eligibility && 'is-invalid'}`}
                                    name="eligibility"
                                    value={commission.eligibility}
                                    onChange={handleInputChange}
                                />
                                {errors.eligibility && (
                                    <div className="invalid-feedback">Please enter eligibility.</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Tax</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.tax && 'is-invalid'}`}
                                    name="tax"
                                    value={commission.tax}
                                    onChange={handleInputChange}
                                />
                                {errors.tax && <div className="invalid-feedback">Please enter tax.</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Client Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.clientName && 'is-invalid'}`}
                                    name="clientName"
                                    value={commission.clientName}
                                    onChange={handleInputChange}
                                />
                                {errors.clientName && (
                                    <div className="invalid-feedback">Please enter client name.</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Flag</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.flag && 'is-invalid'}`}
                                    name="flag"
                                    value={commission.flag}
                                    onChange={handleInputChange}
                                />
                                {errors.flag && <div className="invalid-feedback">Please enter flag.</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Currency</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.currency && 'is-invalid'}`}
                                    name="currency"
                                    value={commission.currency}
                                    onChange={handleInputChange}
                                />
                                {errors.currency && (
                                    <div className="invalid-feedback">Please enter currency.</div>
                                )}
                            </div>
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCommission;

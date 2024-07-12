import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../compoents/sidebar";
import { saveCommission } from '../../api/commission';
import { getallCurrency } from '../../api/currency';
import { getFilterYear } from '../../api/year';
import { getallTaxModule } from "../../api/universityModule/tax";
import { getUniversitiesByCountry } from '../../api/university';
import Flags from 'react-world-flags';

function AddCommission() {
    const initialState = {
        country: "",
        universityName: "",
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
        years: [{ id: 1, year: '', courseTypes: [{ courseType: '',intake:[{inTake: '', value: null}],  }] }],
    };

    const initialStateErrors = {
        country: { required: false },
        universityName: { required: false },
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
    const [tax, setTax] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [years, setYears] = useState(initialState.years);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const pageSize = 3;
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize,
    });
    const navigate = useNavigate();

    useEffect(() => {
        getAllCurrencyDetails();
        getAllTaxDetails();
        getAllYearDetails();
    }, [pagination.from, pagination.to]);

    const getAllCurrencyDetails = () => {
        getallCurrency()
            .then((res) => {
                setCountries(res?.data?.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllYearDetails = () => {
        const data = {
            limit: 3,
            page: pagination.from,
        };
        getFilterYear(data)
            .then((res) => {
                setYears(res?.data?.result?.yearList || []);
                setPagination({
                    ...pagination,
                    count: res?.data?.result?.yearCount || 0,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllTaxDetails = () => {
        getallTaxModule()
            .then((res) => {
                setTax(res?.data?.result);
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

    const addYear = () => {
        const newYear = {
            year: '',
            courseTypes: [{ courseType: '', inTake: '', value: null }],
        };
        setYears([...years, newYear]);
    };

    const addCourseType = (yearIndex) => {
        const updatedYears = [...years];
        updatedYears[yearIndex].courseTypes.push({ courseType: '', inTake: '', value: null });
        setYears(updatedYears);
    };

    const handleInputChange = (yearIndex, courseTypeIndex, fieldName, value) => {
        const updatedYears = [...years];
        updatedYears[yearIndex].courseTypes[courseTypeIndex][fieldName] = value;
        

        if (fieldName === 'year' && commission.universityName) {
            const selectedUniversity = universities.find(uni => uni.universityName === commission.universityName);
            if (selectedUniversity && selectedUniversity.courseTypes.length > 0) {
                updatedYears[yearIndex].courseTypes[courseTypeIndex].courseType = selectedUniversity.courseTypes[0].courseType;
                updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake = selectedUniversity.courseTypes[0].inTake;
            }
        }

        setYears(updatedYears);
    };



    const YearOptions = years.map((data) => ({ value: data.year, label: data.year }));
    const campusOptions = years?.year && years?.year.map((data) => ({ value: data.courseType, label: data.courseType }));

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
                    clientName: selectedUniversity.businessName,
                    courseType: selectedUniversity.courseType,
                }));

                setYears(prevYears => prevYears.map(year => ({
                    ...year,
                    courseTypes: [{ courseType: selectedUniversity.courseType, inTake: '', value: null }],
                })));
            }
        }

        if (submitted) {
            const newError = handleValidation({ ...commission, [name]: value });
            setErrors(newError);
        }
    };

    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({ ...pagination, from: from, to: to });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(commission);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
            saveCommission({
                ...commission,
                years: years,
            })
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/ListCommission");
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
                                                        <label style={{ color: "#231F20" }}>Country</label>
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
                                                        {submitted && errors.country.required && (
                                                            <span className="text-danger">Country is required.</span>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>University</label>
                                                        <select
                                                            className="form-select"
                                                            name="universityName"
                                                            value={commission.universityName}
                                                            onChange={handleInputs}
                                                        >
                                                            <option value="">Select University</option>
                                                            {universities.map((university) => (
                                                                <option key={university._id} value={university.universityName}>
                                                                    {university.universityName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {submitted && errors.universityName.required && (
                                                            <span className="text-danger">University is required.</span>
                                                        )}
                                                    </div>
                                                    {/* Other fields go here */}
                                                </div>
                                                <div className="mt-4">
                                                    {years.map((year, yearIndex) => (
                                                        <div key={yearIndex} className="card mt-2">
                                                            <div className="card-header">
                                                                Year {yearIndex + 1}
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="row g-3">
                                                                    <div className="col-md-4">
                                                                        <label style={{ color: "#231F20" }}>Year</label>
                                                                        <select
                                                                            className="form-select"
                                                                            value={year.year}
                                                                            onChange={(e) => handleInputChange(yearIndex, 0, 'year', e.target.value)}
                                                                        >
                                                                            <option value="">Select Year</option>
                                                                            {YearOptions.map((option) => (
                                                                                <option key={option.value} value={option.value}>
                                                                                    {option.label}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    {year?.courseTypes && year?.courseTypes.map((courseType, courseTypeIndex) => (
                                                                        <div key={courseTypeIndex} className="col-md-4">
                                                                            <label style={{ color: "#231F20" }}>Course Type</label>
                                                                            <select
                                                                                className="form-select"
                                                                                value={courseType.courseType}
                                                                                onChange={(e) => handleInputChange(yearIndex, courseTypeIndex, 'courseType', e.target.value)}
                                                                            >
                                                                                <option value="">Select Course Type</option>

                                                                                {(universities.find(uni => uni.universityName === commission.universityName)?.courseType || []).map((type, idx) => (
                                                                                    <option key={idx} value={type}>
                                                                                        {type}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                            <label style={{ color: "#231F20" }}>Course Type</label>
                                                                            <select
                                                                                className="form-select"
                                                                                value={courseType.courseType}
                                                                                onChange={(e) => handleInputChange(yearIndex, courseTypeIndex, 'inTake', e.target.value)}
                                                                            >
                                                                                <option value="">Select Intake</option>

                                                                                {(universities.find(uni => uni.universityName === commission.universityName)?.inTake || []).map((type, idx) => (
                                                                                    <option key={idx} value={type}>
                                                                                        {type}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                            <label style={{ color: "#231F20" }}>Course Type</label>
                                                                          
                                                                            <input type="number" className="form-control" placeholder="Enter Value" value={courseType.value} onChange={(e) => handleInputChange(yearIndex, courseTypeIndex, 'value', e.target.value)} />
                                                                          
                                                                        </div>
                                                                    ))}
                                                                    <button type="button" className="btn btn-secondary mt-3" onClick={() => addCourseType(yearIndex)}>
                                                                        Add Course Type
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button type="button" className="btn btn-primary mt-3" onClick={addYear}>
                                                        Add Year
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
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

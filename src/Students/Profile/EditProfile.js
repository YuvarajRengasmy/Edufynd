import React, { useEffect, useState, useRef } from "react";
import CountryRegion from "countryregionjs";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { getStudentId } from "../../Utils/storage";
import { updateStudent, getSingleStudent } from "../../api/student";
import { toast } from "react-toastify";
import { isValidPhone } from "../../Utils/Validation";
const Profile = () => {


    const initialState = {
        name: "",
        passportNo: "",
        expiryDate: "",
        dob: "",
        citizenship: "",
        gender: "",
        whatsAppNumber: "",
        country: "",
        desiredUniversity: "",
        desiredCourse: "",
        workExperience: "",
        finance: "",
        degreeName: "",
        academicYear: "",
        institution: "",
        percentage: "",
        twitter: "",
        instagram: "",
        facebook: "",
        linkedIn: "",
    };

    const initialStateErrors = {
        name: { required: false },
        passportNo: { required: false },
        expiryDate: { required: false },
        dob: { required: false },
        citizenship: { required: false },
        gender: { required: false, },
        whatsAppNumber: { required: false, valid: false },
       country: { required: false },
        desiredUniversity: { required: false },
        desiredCourse: { required: false },
        workExperience: { required: false },
        finance: { required: false },
        degreeName: { required: false },
        academicYear: { required: false },
        institution: { required: false },
        percentage: { required: false },
        twitter: { required: false },
        facebook: { required: false },
        linkedIn: { required: false },
        instagram: { required: false },


    };

    const [student, setStudent] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState(initialStateErrors);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [customInputValue, setCustomInputValue] = useState('');
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    let countryRegion = null;


    useEffect(() => {
        getStudentDetails();
    }, []);

    const getStudentDetails = () => {
        const id = getStudentId();
        getSingleStudent(id)
            .then((res) => {
                setStudent(res?.data?.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInputs = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...student, [event.target.name]: event.target.value, });
            setErrors(newError);
        }
    };

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.passportNo === "") {
            error.passportNo.required = true;
        }
        if (data.expiryDate === "") {
            error.expiryDate.required = true;
        }
        if (data.dob === "") {
            error.dob.required = true;
        }
        if (data.gender === "") {
            error.gender.required = true;
        }
        if (data.whatsAppNumber === "") {
            error.whatsAppNumber.required = true;
        }
        if(data.country === "") {
            error.country.required = true;
        }
        if (data.citizenship === "") {
            error.citizenship.required = true;
        }
        if (data.workExperience === "") {
            error.workExperience.required = true;
        }
        if (data.finance === "") {
            error.finance.required = true;
        }
        if (data.degreeName === "") {
            error.degreeName.required = true;
        }
        if (data.academicYear === "") {
            error.academicYear.required = true;
        }
        if (data.institution === "") {
            error.institution.required = true;
        }
        if (data.percentage === "") {
            error.percentage.required = true;
        }
        if (!isValidPhone(data.whatsAppNumber)) {
            error.whatsAppNumber.valid = true;
        }
        return error;
    };

    const handleErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true) {
                    return false;
                }
            }
        }
        return true;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(student);
        setErrors(newError);
        setSubmitted(true);
        if (handleErrors(newError)) {
            updateStudent(student)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/student");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };
    const getCountryRegionInstance = () => {
        if (!countryRegion) {
            countryRegion = new CountryRegion();
        }
        return countryRegion;
    };

    useEffect(() => {
        const getCountries = async () => {
            try {
                const countries = await getCountryRegionInstance().getCountries();
                setCountries(countries.map(country => ({
                    value: country.id,
                    label: country.name
                   
                })));
            } catch (error) {
                console.error(error);
            }
        }
        getCountries();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setCustomInputValue('');
    };

    const handleCustomInputChange = (e) => {
        setCustomInputValue(e.target.value);
    };

    const handleCountryChange = (selectedOption) => {
        setStudent({ ...student, country: selectedOption });
    };

    return (
        <>
            <div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body pt-3">
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col-lg-12 col-md-6 col-sm-12">
                                            <div className="upload-img form-group text-center">
                                                <label style={{ color: "#231F20" }}>
                                                    Profile Photo<span className="text-danger">*</span>
                                                </label>
                                                <br />
                                                <label htmlFor="fileInputImage" className="file-upload">
                                                    <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                                                </label>
                                                <input
                                                    name="profileImage"
                                                    id="fileInputImage"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Student Name <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="name" onChange={handleInputs} type="text" className="form-control" id="fullName" value={student?.name} />
                                                {errors.name.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">PassportNo <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9 d-flex">
                                                <input name="passportNo" value={student?.passportNo} onChange={handleInputs} type="text" className="form-control" id="company" />
                                                &nbsp; &nbsp; &nbsp; &nbsp;
                                                {errors.passportNo.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                                <input name="expiryDate" type="date" value={student?.expiryDate} onChange={handleInputs} className="form-control" id="company" />
                                                {errors.expiryDate.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">DOB <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input type="date" name="dob" value={student?.dob} onChange={handleInputs} className="form-control" id="Job" />
                                                {errors.dob.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Citizenship <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="citizenship" onChange={handleInputs} value={student?.citizenship} type="text" className="form-control" id="Country" />
                                                {errors.citizenship.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Gender <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="gender" type="text" onChange={handleInputs} value={student?.gender} className="form-control" id="Address" />
                                                {errors.gender.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Whatsapp Number <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="whatsAppNumber" type="text" onChange={handleInputs} value={student?.whatsAppNumber} placeholder="Enter The whatsapp number" className="form-control" id="Email" />
                                                {errors.whatsAppNumber.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        {/* <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                English Language Test
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="categories">Yes</option>
                                                    <option value="">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">TestName </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <select className="form-control" name="campus" value={customInputValue} onChange={handleCustomInputChange}>
                                                            <option value="">Test Name</option>
                                                            <option value="">IELTS</option>
                                                            <option value="">PTE</option>
                                                            <option value="">TOEFL</option>
                                                            <option value="">Duolingo</option>
                                                        </select>
                                                    </div><br /><br />
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Test Score</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input type="text" className="form-control" value={customInputValue} onChange={handleCustomInputChange} placeholder="Enter TheTest Score" />
                                                    </div><br /><br />
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Date of Test</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input type="text" className="form-control" value={customInputValue} onChange={handleCustomInputChange} placeholder="Enter The Date of Test" />
                                                    </div>
                                                </div>
                                            )}
                                        </div> */}
                                        <div className="row mb-3">
                                            <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Desired Country <span className=" text-danger">*</span></label>
                                           
                                            <div  className="col-md-8 col-lg-9">
                                                <Select
                                                    type="text"
                                                    placeholder="Select Country"
                                                    id="name"
                                                    name="country"
                                                    value={country?.label}
                                                    onChange={handleCountryChange}
                                                    options={countries}
                                                    className="submain-one-form-body-subsection-select"
                                                />
                                                {errors.country.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                           
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Desired University </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="desiredUniversity" value={student?.desiredUniversity} onChange={handleInputs} type="text" className="form-control" id="Phone" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Course </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="desiredCourse" type="text" onChange={handleInputs} value={student?.desiredCourse} className="form-control" id="Email" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Work Experience <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="workExperience" type="text" onChange={handleInputs} value={student?.workExperience} className="form-control" id="Twitter" />
                                                {errors.workExperience.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                Any visa rejections
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="categories">Yes</option>
                                                    <option value="">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Reason  </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <textarea name="about" className="form-control" style={{ height: 100 }} defaultValue={"Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde."} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                Do you have a travel history
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="categories">Yes</option>
                                                    <option value="">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Reason  </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <textarea name="about" className="form-control" style={{ height: 100 }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div> */}
                                        <div className="row mb-3">
                                            <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Finance <span className=" text-danger">*</span>  </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" type="select" name="finance" onChange={handleInputs} value={student?.finance} >
                                                    <option value="selfFunding">Self Funding</option>
                                                    <option value="loan">Loan</option>
                                                </select>
                                                {errors.finance.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div><br />
                                        <h4>Highest Qualification :</h4>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Degree Name <span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="degreeName" type="text" className="form-control" id="Phone" onChange={handleInputs} value={student?.degreeName} />
                                                {errors.degreeName.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Academic Year & Year Passed <span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="academicYear" type="date" className="form-control" id="Phone" value={student?.academicYear} onChange={handleInputs} />
                                                {errors.academicYear.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Institution <span className=" text-danger">*</span></label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="institution" type="text" className="form-control" id="Phone" value={student?.institution} onChange={handleInputs} />
                                                {errors.institution.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Percentage<span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="percentage" type="text" className="form-control" id="Phone" value={student?.percentage} onChange={handleInputs} />
                                                {errors.percentage.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Twitter<span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="twitter" type="text" className="form-control" id="Phone" value={student?.twitter} onChange={handleInputs} />

                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Instagram<span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="instagram" type="text" className="form-control" id="Phone" value={student?.instagram} onChange={handleInputs} />

                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">FaceBook<span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="facebook" type="text" className="form-control" id="Phone" value={student?.facebook} onChange={handleInputs} />

                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Linkedin<span className=" text-danger">*</span> </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="linkedIn" type="text" className="form-control" id="Phone" value={student?.linkedIn} onChange={handleInputs} />

                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-settings">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                                            <div className="col-md-8 col-lg-9">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked />
                                                    <label className="form-check-label" htmlFor="changesMade">
                                                        Changes made to your account
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked />
                                                    <label className="form-check-label" htmlFor="newProducts">
                                                        Information on new products and services
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="proOffers" />
                                                    <label className="form-check-label" htmlFor="proOffers">
                                                        Marketing and promo offers
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled />
                                                    <label className="form-check-label" htmlFor="securityNotify">
                                                        Security alerts
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="password" type="password" className="form-control" id="currentPassword" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="newpassword" type="password" className="form-control" id="newPassword" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Change Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;
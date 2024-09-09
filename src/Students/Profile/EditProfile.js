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
        hasVisaRejections: "",
        visaReason: "",
        doYouHaveTravelHistory: "",
        travelReason: "",
        doHaveAnyEnglishLanguageTest:"",
        englishTestType: "",
        testScore: "",
        dateOfTest: "",
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
        hasVisaRejections: { required: false },
        visaReason: { required: false },
        doYouHaveTravelHistory: { required: false },
        travelReason: { required: false },
        doHaveAnyEnglishLanguageTest: { required: false },
        englishTestType: { required: false },
        testScore: { required: false },
        dateOfTest: { required: false },

    };

    const [student, setStudent] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState(initialStateErrors);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [customInputValue, setCustomInputValue] = useState('');
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
 


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
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setCustomInputValue('');
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
                    navigate("/Profile");
                   
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
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
                                        <div className="col">
                                            <label htmlFor="fullName" className="form-label fw-semibold">Student Name <span className=" text-danger">*</span></label>
                                            
                                                <input name="name" onChange={handleInputs} type="text" className="form-control" id="fullName" value={student?.name} />
                                                {errors.name.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="col ">
                                            <label htmlFor="company" className="form-label fw-semibold">PassportNo <span className=" text-danger">*</span></label>
                                           
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
                                            <div className="col">
                                            <label htmlFor="Job" className="form-label fw-semibold">DOB <span className=" text-danger">*</span></label>
                                           
                                                <input type="date" name="dob" value={student?.dob} onChange={handleInputs} className="form-control" id="Job" />
                                                {errors.dob.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                     
                                        
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Country" className="form-label fw-semibold">Citizenship <span className=" text-danger">*</span></label>
                                            
                                                <input name="citizenship" onChange={handleInputs} value={student?.citizenship} type="text" className="form-control" id="Country" />
                                                {errors.citizenship.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Address" className="form-label fw-semibold">Gender <span className=" text-danger">*</span></label>
                                           
                                                <input name="gender" type="text" onChange={handleInputs} value={student?.gender} className="form-control" id="Address" />
                                                {errors.gender.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">Whatsapp Number <span className=" text-danger">*</span></label>
                                           
                                                <input name="whatsAppNumber" type="text" onChange={handleInputs} value={student?.whatsAppNumber} placeholder="Enter The whatsapp number" className="form-control" id="Email" />
                                                {errors.whatsAppNumber.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                      
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label style={{ color: '#231F20' }} className="form-label fw-semibold">
                                                English Language Test
                                            </label>
                                           
                                                <select className="form-control" name="doHaveAnyEnglishLanguageTest" value={student?.doHaveAnyEnglishLanguageTest} onChange={handleInputs}>
                                                    <option value="categori">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                            <div  className="col">
                                            <label htmlFor="Country" className="form-label fw-semibold">Desired Country <span className=" text-danger">*</span></label>
                                           
                                           
                                            <input name="country" value={student?.country} onChange={handleInputs} type="text" className="form-control" id="Phone" />

                                                {errors.country.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Desired University </label>
                                            
                                                <input name="desiredUniversity" value={student?.desiredUniversity} onChange={handleInputs} type="text" className="form-control" id="Phone" />
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categori' && (
                                                <div className="row mb-3">
                                                     <div className="col">
                                                    <label style={{ color: '#231F20' }} className="form-label fw-semibold">TestName </label>
                                                   
                                                        <select className="form-control" name="englishTestType" value={student?.englishTestType} onChange={handleInputs}>
                                                            <option value="testName">Test Name</option>
                                                            <option value="ielts">IELTS</option>
                                                            <option value="pte">PTE</option>
                                                            <option value="toefl">TOEFL</option>
                                                            <option value="duolingo">Duolingo</option>
                                                        </select>
                                                    </div>
                                                    <div className="col">
                                                    <label style={{ color: '#231F20' }} className="form-label fw-semibold">Test Score</label>
                                                    
                                                        <input type="text" className="form-control" value={student?.testScore} onChange={handleInputs} name="testScore" placeholder="Enter TheTest Score" />
                                                    </div>
                                                    <div className="col">
                                                    <label style={{ color: '#231F20' }} className="form-label fw-semibold">Date of Test</label>
                                                   
                                                        <input type="date" className="form-control" value={student?.dateOfTest} onChange={handleInputs} name="dateOfTest" placeholder="Enter The Date of Test" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                      
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">Desired Course </label>
                                            
                                                <input name="desiredCourse" type="text" onChange={handleInputs} value={student?.desiredCourse} className="form-control" id="Email" />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Twitter" className="form-label fw-semibold">Work Experience <span className=" text-danger">*</span></label>
                                           
                                                <input name="workExperience" type="text" onChange={handleInputs} value={student?.workExperience} className="form-control" id="Twitter" />
                                                {errors.workExperience.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                            <div className="col">
                                            <label style={{ color: '#231F20' }} className="form-label fw-semibold">
                                                Any visa rejections
                                            </label>
                                            
                                                <select className="form-control" name="hasVisaRejections" type="selectOne" value={student?.hasVisaRejections} onChange={handleInputs}>
                                                    <option value="categories">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                     <div className="col">
                                                    <label style={{ color: '#231F20' }} className="form-label fw-semibold">Reason  </label>
                                                   
                                                        <textarea name="visaReason" type="text" className="form-control" style={{ height: 100 }} value={student?.visaReason} onChange={handleInputs} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label style={{ color: '#231F20' }} className="form-label fw-semibold">
                                                Do you have a travel history
                                            </label>
                                            
                                                <select className="form-control" name="doYouHaveTravelHistory" value={student?.doYouHaveTravelHistory} onChange={handleInputs}>
                                                    <option value="categorie">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categorie' && (
                                                <div className="row mb-3">
                                                     <div className="col">
                                                    <label style={{ color: '#231F20' }} className="form-label fw-semibold">Reason  </label>
                                                   
                                                        <textarea name="travelReason" className="form-control" style={{ height: 100 }} onChange={handleInputs} value={student?.travelReason} />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col">
                                            <label htmlFor="Linkedin" className="form-label fw-semibold">Finance <span className=" text-danger">*</span>  </label>
                                          
                                                <select className="form-control" type="select" name="finance" onChange={handleInputs} value={student?.finance} >
                                                    <option value="selfFunding">Self Funding</option>
                                                    <option value="loan">Loan</option>
                                                </select>
                                                {errors.finance.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Linkedin" className="form-label fw-semibold">Finance <span className=" text-danger">*</span>  </label>
                                          
                                                <select className="form-control" type="select" name="finance" onChange={handleInputs} value={student?.finance} >
                                                    <option value="selfFunding">Self Funding</option>
                                                    <option value="loan">Loan</option>
                                                </select>
                                                {errors.finance.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                        <br />
                                        <h4>Highest Qualification :</h4>
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Degree Name <span className=" text-danger">*</span> </label>
                                            
                                                <input name="degreeName" type="text" className="form-control" id="Phone" onChange={handleInputs} value={student?.degreeName} />
                                                {errors.degreeName.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Academic Year & Year Passed <span className=" text-danger">*</span> </label>
                                           
                                                <input name="academicYear" type="date" className="form-control" id="Phone" value={student?.academicYear} onChange={handleInputs} />
                                                {errors.academicYear.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Institution <span className=" text-danger">*</span></label>
                                           
                                                <input name="institution" type="text" className="form-control" id="Phone" value={student?.institution} onChange={handleInputs} />
                                                {errors.institution.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                        </div>
                                       
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Percentage<span className=" text-danger">*</span> </label>
                                            
                                                <input name="percentage" type="text" className="form-control" id="Phone" value={student?.percentage} onChange={handleInputs} />
                                                {errors.percentage.required && (
                                                    <span className="form-text text-danger">This field is required.</span>
                                                )}
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Twitter<span className=" text-danger">*</span> </label>
                                           
                                                <input name="twitter" type="text" className="form-control" id="Phone" value={student?.twitter} onChange={handleInputs} />

                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Instagram<span className=" text-danger">*</span> </label>
                                           
                                                <input name="instagram" type="text" className="form-control" id="Phone" value={student?.instagram} onChange={handleInputs} />

                                            </div>
                                        </div>
                                       
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">FaceBook<span className=" text-danger">*</span> </label>
                                           
                                                <input name="facebook" type="text" className="form-control" id="Phone" value={student?.facebook} onChange={handleInputs} />

                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Linkedin<span className=" text-danger">*</span> </label>
                                           
                                                <input name="linkedIn" type="text" className="form-control" id="Phone" value={student?.linkedIn} onChange={handleInputs} />

                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Linkedin<span className=" text-danger">*</span> </label>
                                           
                                                <input name="linkedIn" type="text" className="form-control" id="Phone" value={student?.linkedIn} onChange={handleInputs} />

                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button type="submit" className="btn " style={{backgroundColor:'#fe5722',color:'#fff'}}>Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-settings">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="fullName" className="form-label fw-semibold">Email Notifications</label>
                                            <div className="col">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked />
                                                    <label className="form-check-label fw-semibold" htmlFor="changesMade">
                                                        Changes made to your account
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked />
                                                    <label className="form-check-label fw-semibold" htmlFor="newProducts">
                                                        Information on new products and services
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="proOffers" />
                                                    <label className="form-check-label fw-semibold" htmlFor="proOffers">
                                                        Marketing and promo offers
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled />
                                                    <label className="form-check-label fw-semibold" htmlFor="securityNotify">
                                                        Security alerts
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn " style={{backgroundColor:'#fe5722',color:'#fff'}}>Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                    <form>
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="currentPassword" className="form-label fw-semibold">Current Password</label>
                                            
                                                <input name="password" type="password" className="form-control" id="currentPassword" />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="newPassword" className="form-label fw-semibold">New Password</label>
                                          
                                                <input name="newpassword" type="password" className="form-control" id="newPassword" />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="renewPassword" className="form-label fw-semibold">Re-enter New Password</label>
                                           
                                                <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                                            </div>
                                        </div>
                                      
                                        <div className="text-center">
                                            <button type="submit" className="btn" style={{backgroundColor:'#fe5722',color:'#fff'}}>Change Password</button>
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
import React, { useEffect, useState } from 'react';
import { getallCountry } from "../../api/globalsettings";
import { getallClient } from "../../api/client";
import { isValidEmail } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { saveUniversity } from '../../api/university';
import { getallCategories } from '../../api/universityModule/categories';
import { getallOfferTatModule } from '../../api/universityModule/offerTat';
import { getallInstitutionModule } from '../../api/universityModule/institutation';
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import Sidebar from "../../compoents/sidebar";
import Select from 'react-select';
import CountryRegion from "countryregionjs";




function Profile() {
  const initialState = {
    banner: "",
    businessName: "",
    universityLogo: "",
    universityName: "",
    website: "",
    about: "",
    founded: "",
    courseType: "",
    country: "",
    inTake: "",
    state: "",
    lga: "",
    ranking: "",
    averageFees: "",
    popularCategories: [],
    admissionRequirement: "",
    offerTAT: "",
    email: "",
    institutionType: "",
    // costOfLiving: "",
  
 
  };

  const initialStateErrors = {
    businessName: { required: false },
    universityLogo: { required: false },
    banner: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    email: { required: false, valid: false },
    country: { required: false },
    website: { required: false },
    courseType: { required: false },
    state: { required: false },
    lga: { required: false },
    ranking: { required: false },
    averageFees: { required: false },
    popularCategories: { required: false },
    admissionRequirement: { required: false },
    offerTAT: { required: false },
    founded: { required: false },
    institutionType: { required: false },
    //  costOfLiving: { required: false },
    // grossTuition: { required: false },
    // applicationFees: { required: false },
    
 
 
  };

  const [university, setUniversity] = useState(initialState);

  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [country, setCountry] = useState([]);
  const [categorie, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institutation, setInstitution] = useState([]);

  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [lgas, setLGAs] = useState([]);
  const [selectedLGAs, setSelectedLGAs] = useState([]);
  const [type, setType] = useState([]);
  const [inTake, setInTake] = useState([]);
  const ZERO = 0;
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  let countryRegion = null;
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (data.universityName === "") error.universityName.required = true;
    if (data.businessName === "") error.businessName.required = true;
    if (data.inTake === "") error.inTake.required = true;
    if (data.website === "") error.website.required = true;
    if (data.averageFees === "") error.averageFees.required = true;
    if (data.courseType.length === 0) error.courseType.required = true;
    if (data.popularCategories.length === 0) error.popularCategories.required = true;
    if (data.offerTAT === "") error.offerTAT.required = true;
    if (data.email === "") error.email.required = true;
    if (data.founded === "") error.founded.required = true;
    if (data.institutionType === "") error.institutionType.required = true;
    // if (data.costOfLiving === "") error.costOfLiving.required = true;
 
    if (!isValidEmail(data.email)) error.email.valid = true;
    return error;
  };

  useEffect(() => {
    getClientList();
    getCountryList();
    getAllCatgoeryDetails();
    getAllCourseDetails();
    getOfferTatList();
    getAllInstitutionDetails();
   
    getAllIntakeDetails();
  }, []);


  const getAllCourseDetails = () => {
    getallModule()
      .then((res) => {
        console.log(res);
        setType(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllIntakeDetails = () => {
    getallIntake()
      .then((res) => {
        console.log(res);
        setInTake(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClientList = () => {
    getallClient()
      .then((res) => {
        const value = res?.data?.result;
        setClient(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountryList = () => {
    getallCountry()
      .then((res) => {
        const value = res?.data?.result;
        setCountry(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCatgoeryDetails = () => {
    getallCategories()
      .then((res) => {
        console.log(res);
        setCategories(res?.data?.result);

      })
      .catch((err) => {
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
  const getAllInstitutionDetails = () => {
    getallInstitutionModule()
      .then((res) => {
        console.log(res);
        setInstitution(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  



  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUniversity((prevUniversity) => ({
        ...prevUniversity,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setUniversity((prevUniversity) => {
        const updatedUniversity = { ...prevUniversity, [name]: value };
        return updatedUniversity;
      });
    }
    if (submitted) {
      const newError = handleValidation({ ...university, [name]: value });
      setErrors(newError);
    }
  };
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUniversity({ ...university, [name]: values });
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
  useEffect(() => {
    const getStates = async () => {
      try {
        const states = await getCountryRegionInstance().getStates(selectedCountry);
        setStates(states.map(userState => ({
          value: userState?.id,
          label: userState?.name
        })));
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);
  useEffect(() => {
    const getLGAs = async () => {
      try {
        const allLGAs = await Promise.all(selectedStates.map(async (state) => {
          const lgas = await getCountryRegionInstance().getLGAs(selectedCountry, state.value);
          return lgas.map(lga => ({
            value: lga?.id,
            label: lga?.name
          }));
        }));
        setLGAs(allLGAs.flat());
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedStates.length > 0) {
      getLGAs();
    }
  }, [selectedStates, selectedCountry]);
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedStates([]);
    setSelectedLGAs([]); // Reset selected LGAs when country changes
  };
  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions || []);
    setSelectedLGAs([]); // Reset selected LGAs when states change
  };
  const handleLGAChange = (selectedOptions) => {
    setSelectedLGAs(selectedOptions || []);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(university);
    setErrors(newError);
    setSubmitted(true);
    const selectedCountryLabel = countries.find(country => country.value === selectedCountry)?.label || "";
    const selectedStatesLabels = selectedStates.map(state => state.label);
    const selectedLGAsLabels = selectedLGAs.map(lga => lga.label);
    const updatedUniversity = {
      ...university,
      country: selectedCountryLabel,
      state: selectedStatesLabels,
      lga: selectedLGAsLabels
    };
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveUniversity(updatedUniversity)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListUniversity");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const popularCategoriesOptions = categorie.map((data) => ({ value: data.popularCategories, label: data.popularCategories }));
  const courseTypeOptions = type.map((data) => ({ value: data.courseType, label: data.courseType }));
  const intakeOptions = inTake.map((data) => ({ value: data.intakeName, label: data.intakeName }));
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.4783px solid rgba(11, 70, 84, 0.25)',
      borderRadius: '4.91319px',
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#3B0051' : '#F2CCFF',
      ':hover': {
        color: 'black'
      }
    })
  };

  return (
    <>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </nav>
        </div>
        <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="content-header ">
            <div className=" container-fluid ">
              <form onSubmit={handleSubmit} >
                <div className="row">
                  <div className="col-xl-12 ">
                    <div className="card rounded-0 shadow-sm border-0 ">
                      <div className=' position-relative'>
                        <label htmlFor="banner" className="file-upload" style={{ color: "#231F20" }}>
                          <img class="card-img-top rounded-0 " src={university?.banner ? university?.banner : "https://wallpapercave.com/wp/wp6837474.jpg"} alt="image" style={{ width: '60.9rem', height: '12rem', objectFit: 'cover' }} />
                        </label>
                        <input
                          name="banner"
                          id="banner"
                          type="file"
                          accept="image/*"
                          className="form-control border-0 text-dark bg-transparent"
                          style={{ display: "none", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          onChange={handleInputs}
                        />
                        <label htmlFor="fileInputImage" className="file-upload" style={{ color: "#231F20" }}>
                          <img class="img-fluid rounded-pill img-thumbnail position-absolute profile-logo  " src={university?.universityLogo ? university?.universityLogo : "https://placehold.co/128x128"} alt="image"  style={{ width: '8rem', height: '8rem', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                        </label>
                        <input
                          name="universityLogo"
                          id="fileInputImage"
                          type="file"
                          accept="image/*"
                          className="form-control border-0 text-dark bg-transparent"
                          style={{ display: "none", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          onChange={handleInputs}
                        />
                      </div>
                      <div className="card-header rounded-0 bg-white " >
                       
                        <h5 style={{ fontVariant:'all-small-caps',fontWeight:'bold'}}>Add  University Details </h5> 
                       
                      </div>
                      <div className="card-body p-4">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Client Name<span className="text-danger">*</span>
                            </label>
                            <select onChange={handleInputs} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-1 form-select-lg  " name='businessName'>
                              <option value={""} disabled hidden >Select Client</option>
                              {client.map((data, index) =>
                                <option key={index} value={data?.businessName}> {data?.businessName}</option>)}
                            </select>
                            {errors.businessName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Institution Type <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-select-lg rounded-1"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="institutionType"
                              onChange={handleInputs}
                            >
                              <option value={" "}>Select Institution Type</option>
                              {institutation.map((data, index) =>
                                <option key={index} value={data?.institutionType}> {data?.institutionType}</option>)}
                            </select>
                            {
                              errors.institutionType.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              University Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter University Name"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="universityName"
                              onChange={handleInputs}
                            />
                            {errors.universityName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Country<span className="text-danger">*</span>
                            </label>

                            <Select
                              placeholder="Select  Country"
                              onChange={handleCountryChange}
                              options={countries}
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select "
                            />
                            {errors.country.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              State<span className="text-danger">*</span>
                            </label>
                            {states.length !== ZERO && (
                              <Select
                                placeholder="Select  State"
                                isMulti
                                onChange={handleStateChange}
                                options={states}
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                            )}
                            {errors.state.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              City<span className="text-danger">*</span>
                            </label>
                            {lgas.length !== ZERO && (
                              <Select
                                placeholder="Select  City"
                                isMulti
                                onChange={handleLGAChange}
                                options={lgas}
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                            )}

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              E-Mail<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter E-Mail"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="email"
                              onChange={handleInputs}
                            />
                            {errors.email.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : errors.email.valid ? (
                              <div className="text-danger form-text">
                                Enter valid Email Id.
                              </div>
                            ) : null}

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Website<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Website"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="website"
                              onChange={handleInputs}
                            />
                            {errors.website.required ? <div className="text-danger form-text">This field is required.</div> : null}

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Course Type<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              options={courseTypeOptions}
                              name="courseType"
                              onChange={handleSelectChange}
                              styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                              placeholder='Select Course Type'
                            >

                            </Select>
                            {errors.courseType.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Found Year <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Founded Year"
                              name="founded"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              onChange={handleInputs}
                            />
                            {
                              errors.founded.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Ranking
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Ranking "
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="ranking"
                              onChange={handleInputs}
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Popular Categories <span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              options={popularCategoriesOptions}
                              name="popularCategories"
                              onChange={handleSelectChange}
                              styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                              placeholder='Select Popular Categories'
                            >

                            </Select>
                            {errors.popularCategories.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Average Fees<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Average Fees"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="averageFees"
                              onChange={handleInputs}
                            />
                            {
                              errors.averageFees.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              InTake<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              options={intakeOptions}
                              name="inTake"
                              onChange={handleSelectChange}
                              styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                              placeholder='Select InTake'
                            >

                            </Select>
                            {errors.inTake.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Offer TAT<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-select-lg rounded-1"
                              name="offerTAT"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              onChange={handleInputs}
                              
                            > <option value={" "}>Select OfferTAT</option>
                              {offerTAT.map((data, index) =>
                                <option key={index} value={data?.offerTAT}> {data?.offerTAT}</option>)}
                            </select>
                            {errors.offerTAT.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                About <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Enter About"
                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                rows="5" // You can adjust the number of rows as needed
                                onChange={handleInputs}
                                name="about"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                Admission Requirement <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Admission Requirements"
                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                rows="5" // You can adjust the number of rows as needed
                                onChange={handleInputs}
                                name="admissionRequirement"
                              ></textarea>
                            </div>
                          </div>
                   
                        
                         
                          
                         
                       
                         
                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              to="/ListUniversity"
                              className="btn btn-cancel border-0 px-4 py-2 fw-semibold text-uppercase text-white  m-1"
                            >
                              Cancel
                            </Link>
                            <button
                              style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              type="submit"
                              className="btn btn-save border-0 px-4 py-2 fw-semibold text-uppercase text-white m-1"
                            >
                              Submit
                            </button>
                          </div>
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
    </>
  )

}
export default Profile;
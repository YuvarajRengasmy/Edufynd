import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidWebsite,
  isValidYear,
  isValidPinCode,
} from "../../Utils/Validation";
import { getallCountry } from "../../api/globalsettings";
import { getallClient } from "../../api/client";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveUniversity } from "../../api/university";
import { getallCategories } from "../../api/universityModule/categories";
import { getallOfferTatModule } from "../../api/universityModule/offerTat";
import { getallInstitutionModule } from "../../api/universityModule/institutation";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import Sidebar from "../../compoents/sidebar";
import Select from "react-select";
import CountryRegion from "countryregionjs";

function Profile() {
  const initialState = {
    banner: "",
    businessName: "",
    universityLogo: "",
    universityName: "",
    about: "",
    founded: "",
    courseType: "",
    country: "",
    campus: [{ country: "", state: "", lga: "" }],
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
  };

  const [university, setUniversity] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [categorie, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institutation, setInstitution] = useState([]);
  const [type, setType] = useState([]);
  const [inTake, setInTake] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLGAs] = useState([]);
  const navigate = useNavigate();
  const countryRegion = new CountryRegion();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    // Validation logic here...
    return error;
  };

  useEffect(() => {
    
    fetchCountries();
  }, []);

  useEffect(() => {
    if (university.campus.length > 0) {
      updateStatesAndLgasForCampuses();
    }
  }, [university.campus]);

  const fetchCountries = async () => {
    try {
      const countries = await countryRegion.getCountries();
      setCountries(
        countries.map((country) => ({
          value: country.id,
          label: country.name,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatesAndLgasForCampuses = async () => {
    const updatedCampuses = await Promise.all(
      university.campus.map(async (campus) => {
        let statesList = [];
        let lgasList = [];
        if (campus.country) {
          statesList = await countryRegion.getStates(campus.country);
          statesList = statesList.map((state) => ({
            value: state.id,
            label: state.name,
          }));

          if (campus.state) {
            lgasList = await countryRegion.getLGAs(campus.country, campus.state);
            lgasList = lgasList.map((lga) => ({
              value: lga.id,
              label: lga.name,
            }));
          }
        }
        return { ...campus, states: statesList, lgas: lgasList };
      })
    );
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: updatedCampuses,
    }));
  };

  const handleCountryChange = (index, selectedOption) => {
    const newCampuses = [...university.campus];
    newCampuses[index].country = selectedOption.value;
    newCampuses[index].state = "";
    newCampuses[index].lga = "";
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: newCampuses,
    }));
  };

  const handleStateChange = (index, selectedOption) => {
    const newCampuses = [...university.campus];
    newCampuses[index].state = selectedOption.value;
    newCampuses[index].lga = "";
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: newCampuses,
    }));
  };

  const handleLGAChange = (index, selectedOption) => {
    const newCampuses = [...university.campus];
    newCampuses[index].lga = selectedOption.value;
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: newCampuses,
    }));
  };

  const addCampus = () => {
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: [
        ...prevUniversity.campus,
        { country: "", state: "", lga: "" },
      ],
    }));
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(university);
    setErrors(newError);
    setSubmitted(true);

    const updatedUniversity = {
      ...university,
      country: countries.find((option) => option.value === university.country)?.label,
      state: states.find((option) => option.value === university.state)?.label,
      lga: lgas.find((option) => option.value === university.lga)?.label,
    };

    if (handleErrors(newError)) {
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

  const popularCategoriesOptions = categorie.map((data) => ({
    value: data.popularCategories,
    label: data.popularCategories,
  }));
  const courseTypeOptions = type.map((data) => ({
    value: data.courseType,
    label: data.courseType,
  }));
  const intakeOptions = inTake.map((data) => ({
    value: data.intakeName,
    label: data.intakeName,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };

  return (
    <>
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </nav>
        </div>
        <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card rounded-0 shadow-sm border-0">
                      <div className="position-relative">
                        <label
                          htmlFor="banner"
                          className="file-upload"
                          style={{ color: "#231F20" }}
                        >
                          <img
                            className="card-img-top rounded-0"
                            src={
                              university?.banner
                                ? university?.banner
                                : "https://wallpapercave.com/wp/wp6837474.jpg"
                            }
                            alt="image"
                            style={{
                              width: "60.9rem",
                              height: "12rem",
                              objectFit: "fill",
                            }}
                          />
                        </label>
                        <input
                          name="banner"
                          id="banner"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setUniversity({ ...university, banner: URL.createObjectURL(e.target.files[0]) })
                          }
                          style={{ display: "none" }}
                        />
                      </div>
                      <div className="card-body py-5">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label
                                htmlFor="universityLogo"
                                className="form-label"
                              >
                                University Logo
                              </label>
                              <input
                                name="universityLogo"
                                id="universityLogo"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  setUniversity({
                                    ...university,
                                    universityLogo: URL.createObjectURL(e.target.files[0]),
                                  })
                                }
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Render input fields here */}
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          {university.campus.map((campus, index) => (
                            <Select
                              key={index}
                              value={countries.find((c) => c.value === campus.country)}
                              onChange={(selectedOption) => handleCountryChange(index, selectedOption)}
                              options={countries}
                              placeholder="Select Country"
                              styles={customStyles}
                            />
                          ))}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          {university.campus.map((campus, index) => (
                            <Select
                              key={index}
                              value={campus.state ? states.find((s) => s.value === campus.state) : null}
                              onChange={(selectedOption) => handleStateChange(index, selectedOption)}
                              options={campus.states}
                              placeholder="Select State"
                              styles={customStyles}
                            />
                          ))}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">LGA</label>
                          {university.campus.map((campus, index) => (
                            <Select
                              key={index}
                              value={campus.lga ? lgas.find((l) => l.value === campus.lga) : null}
                              onChange={(selectedOption) => handleLGAChange(index, selectedOption)}
                              options={campus.lgas}
                              placeholder="Select LGA"
                              styles={customStyles}
                            />
                          ))}
                        </div>
                        <div className="mb-3">
                          <button
                            type="button"
                            onClick={addCampus}
                            className="btn btn-primary"
                          >
                            Add Campus
                          </button>
                        </div>
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Save
                          </button>
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
  );
}

export default Profile;

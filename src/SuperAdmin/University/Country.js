import React, { useEffect, useState } from "react";
import { getSingleStudent } from "../../api/student";
import { getallCurrency } from "../../api/currency";
import { getallProgram, getProgramByUniversity, getProgramByCountry } from "../../api/Program";
import { getallIntake } from "../../api/intake";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialStateInputs = {
    name: "",
    dob: "",
    passportNo: "",
    country: "",
    email: "",
    primaryNumber: "",
    whatsAppNumber: "",
    inTake: "",
    universityName: "",
    course: "",
    campus: "",
    courseFees: "",
    courseType: "",
    programDetails: {} // Added to store selected program details
  };

  const initialStateErrors = {
    name: { required: false },
    dob: { required: false },
    passportNo: { required: false },
    country: { required: false },
    email: { required: false },
    primaryNumber: { required: false },
    whatsAppNumber: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    course: { required: false },
    campus: { required: false },
    courseFees: { required: false },
    courseType: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [inTake, setInTake] = useState([]);
  const [student, setStudent] = useState({});

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getStudentDetails();
    getAllCurrencyDetails();
    getAllUniversityList();
    getAllIntakeDetails();
  }, []);

  const getStudentDetails = () => {
    getSingleStudent(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllIntakeDetails = () => {
    getallIntake()
      .then((res) => {
        setInTake(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCurrencyDetails = () => {
    getallCurrency()
      .then((res) => {
        setCountries(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUniversityList = () => {
    getallProgram()
      .then((res) => {
        setPrograms(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    // Validation logic...
    setErrors(error);
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setInputs({ ...inputs, country: selectedCountry });

    // Fetch intake details based on country if needed
    const selectedIntake = inputs.inTake; // Adjust if needed

    getProgramByCountry(selectedCountry, selectedIntake)
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(`Error fetching universities for ${selectedCountry} and intake ${selectedIntake}:`, err);
        setUniversities([]);
      });
  };

  const handleUniversityChange = (event) => {
    const selectedUniversity = event.target.value;
    setInputs({ ...inputs, universityName: selectedUniversity });

    getProgramByUniversity(selectedUniversity)
      .then((res) => {
        setPrograms(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(`Error fetching programs for ${selectedUniversity}:`, err);
        setPrograms([]);
      });
  };

  const handleProgramChange = (event) => {
    const selectedProgram = event.target.value;
    const selectedProgramDetails = programs.find(p => p.programName === selectedProgram);

    setInputs(prevInputs => ({
      ...prevInputs,
      programDetails: selectedProgramDetails || {}
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const isValid = handleValidation(inputs);
    if (isValid) {
      // Handle successful submission
      toast.success("Form submitted successfully");
    } else {
      // Handle validation errors
      toast.error("Please correct the errors");
    }
  };

  return (
    <div>
     
      <form onSubmit={handleSubmit}>
        {/* Country Select */}
        <select name="country" onChange={handleCountryChange} value={inputs.country}>
          {countries.map(country => (
            <option key={country.id} value={country.name}>{country.name}</option>
          ))}
        </select>

        {/* Intake Select */}
        <select name="inTake" onChange={e => setInputs({ ...inputs, inTake: e.target.value })} value={inputs.inTake}>
          {inTake.map(intake => (
            <option key={intake.id} value={intake.name}>{intake.name}</option>
          ))}
        </select>

        {/* University Select */}
        <select name="universityName" onChange={handleUniversityChange} value={inputs.universityName}>
          {universities.map(university => (
            <option key={university.id} value={university.name}>{university.name}</option>
          ))}
        </select>

        {/* Program Select */}
        <select name="program" onChange={handleProgramChange} value={inputs.programDetails.programName || ''}>
          {Array.isArray(programs) && programs.map(program => (
            <option key={program.id} value={program.programName}>{program.programName}</option>
          ))}
        </select>

        {/* Render program details if selected */}
        {inputs.programDetails && (
          <div>
            <h3>Program Details</h3>
            <p>{inputs.programDetails.description}</p>
            {/* Display other program details as needed */}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Profile;

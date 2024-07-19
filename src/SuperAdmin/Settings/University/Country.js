// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import { getSingleClient, updateClient } from "../../api/client";
// import { getCountries, getStates, getLGAs } from "../../api/location"; // Adjust import paths based on your actual API structure

// function AddAgent() {
//   const [client, setClient] = useState({
//     country: "",
//     state: "",
//     lga: "",
//     // Other fields from your database
//   });
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [lgas, setLGAs] = useState([]);
//   const [errors, setErrors] = useState({
//     country: { required: false },
//     state: { required: false },
//     lga: { required: false },
//     // Add other fields as needed
//   });
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     // Fetch initial client data
//     const id = 1; // Replace with your logic to get client ID
//     getSingleClient(id)
//       .then((res) => {
//         setClient(res?.data?.result);
//         // Assuming res.data.result contains existing client data including country, state, lga
//       })
//       .catch((err) => {
//         console.error("Error fetching client:", err);
//       });

//     // Fetch initial countries data
//     fetchCountries();
//   }, []);

//   // Function to fetch countries
//   const fetchCountries = () => {
//     getCountries()
//       .then((res) => {
//         setCountries(
//           res.data.map((country) => ({
//             value: country.id,
//             label: country.name,
//           }))
//         );
//       })
//       .catch((err) => {
//         console.error("Error fetching countries:", err);
//       });
//   };

//   // Function to fetch states based on selected country
//   const fetchStates = (countryId) => {
//     getStates(countryId)
//       .then((res) => {
//         setStates(
//           res.data.map((state) => ({
//             value: state.id,
//             label: state.name,
//           }))
//         );
//       })
//       .catch((err) => {
//         console.error("Error fetching states:", err);
//       });
//   };

//   // Function to fetch LGAs based on selected country and state
//   const fetchLGAs = (countryId, stateId) => {
//     getLGAs(countryId, stateId)
//       .then((res) => {
//         setLGAs(
//           res.data.map((lga) => ({
//             value: lga.id,
//             label: lga.name,
//           }))
//         );
//       })
//       .catch((err) => {
//         console.error("Error fetching LGAs:", err);
//       });
//   };

//   // Handle change in country selection
//   const handleCountryChange = (selectedOption) => {
//     const selectedCountryId = selectedOption.value;
//     setClient({ ...client, country: selectedCountryId, state: "", lga: "" });
//     fetchStates(selectedCountryId); // Fetch states based on selected country
//   };

//   // Handle change in state selection
//   const handleStateChange = (selectedOption) => {
//     const selectedStateId = selectedOption.value;
//     setClient({ ...client, state: selectedStateId, lga: "" });
//     fetchLGAs(client.country, selectedStateId); // Fetch LGAs based on selected country and state
//   };

//   // Handle change in LGA selection
//   const handleLGAChange = (selectedOption) => {
//     const selectedLgaId = selectedOption.value;
//     setClient({ ...client, lga: selectedLgaId });
//   };

//   // Validate form fields before submission
//   const validateForm = () => {
//     let formValid = true;
//     const newErrors = { ...errors };

//     // Validate country selection
//     if (!client.country) {
//       newErrors.country.required = true;
//       formValid = false;
//     } else {
//       newErrors.country.required = false;
//     }

//     // Validate state selection
//     if (!client.state) {
//       newErrors.state.required = true;
//       formValid = false;
//     } else {
//       newErrors.state.required = false;
//     }

//     // Validate LGA selection
//     if (!client.lga) {
//       newErrors.lga.required = true;
//       formValid = false;
//     } else {
//       newErrors.lga.required = false;
//     }

//     setErrors(newErrors);
//     return formValid;
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setSubmitted(true);

//     if (validateForm()) {
//       // Prepare data to send to API
//       const updatedClientData = {
//         ...client,
//         country: countries.find((c) => c.value === client.country)?.label,
//         state: states.find((s) => s.value === client.state)?.label,
//         lga: lgas.find((l) => l.value === client.lga)?.label,
//       };

//       // Call API to update client data
//       updateClient(updatedClientData)
//         .then((res) => {
//           console.log("Client updated successfully:", res);
//           // Handle success (e.g., show success message, navigate)
//         })
//         .catch((err) => {
//           console.error("Error updating client:", err);
//           // Handle error (e.g., show error message)
//         });
//     } else {
//       console.log("Form validation failed.");
//       // Handle validation errors (e.g., show error messages)
//     }
//   };

//   // Custom styles for Select components
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       border: "1.4783px solid rgba(11, 70, 84, 0.25)",
//       borderRadius: "4.91319px",
//       fontSize: "11px",
//     }),
//     dropdownIndicator: (provided, state) => ({
//       ...provided,
//       color: state.isFocused ? "#3B0051" : "#F2CCFF",
//       ":hover": {
//         color: "black",
//       },
//     }),
//   };

//   return (
//     <div>
//       <h1>Add Agent</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Country</label>
//           <Select
//             options={countries}
//             value={countries.find((c) => c.value === client.country)}
//             onChange={handleCountryChange}
//             styles={customStyles}
//           />
//           {errors.country.required && (
//             <div className="text-danger">Please select a country.</div>
//           )}
//         </div>
//         <div className="form-group">
//           <label>State</label>
//           <Select
//             options={states}
//             value={states.find((s) => s.value === client.state)}
//             onChange={handleStateChange}
//             styles={customStyles}
//           />
//           {errors.state.required && (
//             <div className="text-danger">Please select a state.</div>
//           )}
//         </div>
//         <div className="form-group">
//           <label>LGA</label>
//           <Select
//             options={lgas}
//             value={lgas.find((l) => l.value === client.lga)}
//             onChange={handleLGAChange}
//             styles={customStyles}
//           />
//           {errors.lga.required && (
//             <div className="text-danger">Please select an LGA.</div>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddAgent;

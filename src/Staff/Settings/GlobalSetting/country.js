// import React, { useState } from "react";
// import {
//   CountryDropdown,
//   RegionDropdown,
//   CityDropdown,
// } from "react-countries-cities";

// const GeoLocationSelector = () => {
//   const [country, setCountry] = useState("");
//   const [regions, setRegions] = useState([]);
//   const [selectedRegions, setSelectedRegions] = useState([]);
//   const [cities, setCities] = useState({});
//   const [selectedCities, setSelectedCities] = useState({});

//   const handleCountryChange = (val) => {
//     setCountry(val);
//     setRegions([]);
//     setSelectedRegions([]);
//     setCities({});
//     setSelectedCities({});
//   };

//   const handleRegionChange = (val) => {
//     setSelectedRegions((prev) => [...prev, val]);
//     setCities((prev) => ({ ...prev, [val]: [] }));
//   };

//   const handleCityChange = (region, val) => {
//     setSelectedCities((prev) => ({
//       ...prev,
//       [region]: [...(prev[region] || []), val],
//     }));
//   };

//   return (
//     <div>
//       <h3>Select Location</h3>
//       <div>
//         <label>Country: </label>
//         <CountryDropdown
//           value={country}
//           onChange={(val) => handleCountryChange(val)}
//         />
//       </div>
      
//       {country && (
//         <div>
//           <label>State/Region: </label>
//           <RegionDropdown
//             country={country}
//             value={""}
//             onChange={(val) => handleRegionChange(val)}
//           />
//           <ul>
//             {selectedRegions.map((region) => (
//               <li key={region}>
//                 <strong>{region}</strong>
//                 <CityDropdown
//                   country={country}
//                   region={region}
//                   value={""}
//                   onChange={(val) => handleCityChange(region, val)}
//                 />
//                 <ul>
//                   {selectedCities[region] &&
//                     selectedCities[region].map((city, index) => (
//                       <li key={index}>{city}</li>
//                     ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
      
//       <div>
//         <h4>Selected Location:</h4>
//         <p>Country: {country}</p>
//         <p>States/Regions: {selectedRegions.join(", ")}</p>
//         <div>
//           <h5>Cities:</h5>
//           {Object.keys(selectedCities).map((region) => (
//             <div key={region}>
//               <strong>{region}:</strong>
//               <ul>
//                 {selectedCities[region].map((city, index) => (
//                   <li key={index}>{city}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GeoLocationSelector;

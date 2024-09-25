import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UniversityForm = () => {
  const [university, setUniversity] = useState({
    about: '',
    admissionRequirement: '',
    country: '',
    state: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Sample data for countries and states
  const countryStateData = {
    USA: ['California', 'Texas', 'Florida'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
    India: ['Maharashtra', 'Karnataka', 'Delhi'],
  };

  useEffect(() => {
    // Populate countries (this could be from an API)
    setCountries(Object.keys(countryStateData));
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setUniversity((prev) => ({
      ...prev,
      country: selectedCountry,
      state: '', // Reset state when country changes
    }));
    setStates(countryStateData[selectedCountry] || []);
  };

  const handleStateChange = (e) => {
    setUniversity((prev) => ({
      ...prev,
      state: e.target.value,
    }));
  };

  const handleRichAboutChange = (data) => {
    setUniversity((prev) => ({
      ...prev,
      about: data,
    }));
  };

  const handleRichTextChange = (data) => {
    setUniversity((prev) => ({
      ...prev,
      admissionRequirement: data,
    }));
  };

  return (
    <div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label style={{ color: "#231F20" }}>
            About{" "}
            <span className="text-danger">*</span>
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={university.about}
            name="about"
            config={{
              placeholder: 'Start writing your content here...',
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "|",
                "insertTable",
                "mediaEmbed",
                "imageUpload",
                "|",
                "undo",
                "redo",
              ],
              image: {
                toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleRichAboutChange(data);
            }}
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "12px",
              zIndex: '0'
            }}
          />
        </div>
      </div>

      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label style={{ color: "#231F20" }}>
            Admission Requirements{" "}
            <span className="text-danger">*</span>
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={university.admissionRequirement}
            config={{
              placeholder: 'Start writing your content here...',
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "|",
                "insertTable",
                "mediaEmbed",
                "imageUpload",
                "|",
                "undo",
                "redo",
              ],
              image: {
                toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleRichTextChange(data);
            }}
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "12px",
              zIndex: '0'
            }}
          />
        </div>
      </div>

      {/* Country Selection */}
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label style={{ color: "#231F20" }}>
            Country{" "}
            <span className="text-danger">*</span>
          </label>
          <select
            className="form-control"
            value={university.country}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State Selection */}
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label style={{ color: "#231F20" }}>
            State{" "}
            <span className="text-danger">*</span>
          </label>
          <select
            className="form-control"
            value={university.state}
            onChange={handleStateChange}
            disabled={!university.country} // Disable if no country is selected
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UniversityForm;

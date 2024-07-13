import React, { useState } from 'react';

const CommissionForm = ({ universities, saveCommission, isUniversityAdded }) => {
    const [commission, setCommission] = useState({
        country: '',
        universityName: '',
        paymentMethod: '',
        eligibility: '',
        tax: '',
        paymentType: '',
        years: [{ id: 1, year: '', courseTypes: [{ courseType: '', inTake: '', value: null }] }]
    });

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setCommission(prevCommission => ({
            ...prevCommission,
            [name]: value
        }));
    };

    const handleYearChange = (index, event) => {
        const { name, value } = event.target;
        const updatedYears = [...commission.years];
        updatedYears[index][name] = value;
        setCommission({ ...commission, years: updatedYears });
    };

    const handleCourseTypeChange = (yearIndex, courseIndex, event) => {
        const { name, value } = event.target;
        const updatedYears = [...commission.years];
        updatedYears[yearIndex].courseTypes[courseIndex][name] = value;
        setCommission({ ...commission, years: updatedYears });
    };

    const validateYears = (years) => {
        for (const year of years) {
            if (!year.year) {
                return { valid: false, message: 'Year is required.' };
            }

            for (const courseType of year.courseTypes) {
                if (!courseType.courseType) {
                    return { valid: false, message: 'Course Type is required.' };
                }

                if (!courseType.inTake) {
                    return { valid: false, message: 'Intake is required.' };
                }

                if (courseType.value === null || courseType.value === '') {
                    return { valid: false, message: 'Value is required.' };
                }
            }
        }

        return { valid: true };
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if the selected university is already added
        if (isUniversityAdded(commission.universityName)) {
            alert('This university is already added in the commission list.');
            return;
        }

        // Validate the years array
        const validation = validateYears(commission.years);
        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        // Proceed with saving the commission
        saveCommission(commission);

        // Reset form or perform other necessary actions
        // resetForm();
    };

    const getFilteredUniversities = () => {
        return universities.filter(uni => !isUniversityAdded(uni.universityName));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="form-group">
                    <label htmlFor="universityName">University</label>
                    <select
                        name="universityName"
                        value={commission.universityName}
                        onChange={handleInputs}
                    >
                        <option value="">Select University</option>
                        {getFilteredUniversities().map((uni, index) => (
                            <option key={index} value={uni.universityName}>
                                {uni.universityName}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Year and Course Types fields */}
                {commission.years.map((year, yearIndex) => (
                    <div key={yearIndex} className="form-group">
                        <label htmlFor={`year-${yearIndex}`}>Year</label>
                        <input
                            type="text"
                            name="year"
                            value={year.year}
                            onChange={(e) => handleYearChange(yearIndex, e)}
                        />
                        {year.courseTypes.map((courseType, courseIndex) => (
                            <div key={courseIndex}>
                                <label htmlFor={`courseType-${yearIndex}-${courseIndex}`}>Course Type</label>
                                <input
                                    type="text"
                                    name="courseType"
                                    value={courseType.courseType}
                                    onChange={(e) => handleCourseTypeChange(yearIndex, courseIndex, e)}
                                />
                                <label htmlFor={`inTake-${yearIndex}-${courseIndex}`}>Intake</label>
                                <input
                                    type="text"
                                    name="inTake"
                                    value={courseType.inTake}
                                    onChange={(e) => handleCourseTypeChange(yearIndex, courseIndex, e)}
                                />
                                <label htmlFor={`value-${yearIndex}-${courseIndex}`}>Value</label>
                                <input
                                    type="number"
                                    name="value"
                                    value={courseType.value}
                                    onChange={(e) => handleCourseTypeChange(yearIndex, courseIndex, e)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Save Commission</button>
            </form>
        </div>
    );
};

export default CommissionForm;

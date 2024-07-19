import React, { useEffect, useState } from "react";
import Select from 'react-select';
import CountryRegion from "countryregionjs";

function Country() {
    const [state, setState] = useState("");
    const [states, setStates] = useState([]);
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [lga, setLGA] = useState("");
    const [lgas, setLGAs] = useState([]);

    const getCountryRegionInstance = () => {
        return new CountryRegion();
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
                const states = await getCountryRegionInstance().getStates(country);
                setStates(states.map(userState => ({
                    value: userState?.id,
                    label: userState?.name
                })));
            } catch (error) {
                console.error(error);
            }
        }
        if (country) {
            getStates();
        }
    }, [country]);

    useEffect(() => {
        const getLGAs = async () => {
            try {
                const lgas = await getCountryRegionInstance().getLGAs(country, state);
                setLGAs(lgas?.map(lga => ({
                    value: lga?.id,
                    label: lga?.name
                })));
            } catch (error) {
                console.error(error);
            }
        }
        if (state) {
            getLGAs();
        }
    }, [country, state]);

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption.value);
        setState("");
        setStates([]);
        setLGA("");
        setLGAs([]);
    };

    const handleStateChange = (selectedOption) => {
        setState(selectedOption.value);
        setLGA("");
        setLGAs([]);
    };

    const handleLGAChange = (selectedOption) => {
        setLGA(selectedOption.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle submit logic here
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid rgba(11, 70, 84, 0.25)',
            borderRadius: '5px',
            fontSize: "1.5rem",
            backgroundColor: '#EBF0F3',
            minHeight: '45px',
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
        <main className="container">
            <div className="px-4 mx-3">
                <div className='mt-3'>
                    <div className='d-flex gap-3 mt-6 flex-wrap flex-md-nowrap'>
                        <form className="my-5 d-flex flex-column flex-md-row align-items-start" onSubmit={handleSubmit}>
                            <div className="mb-3 mx-3" style={{ width: "250px" }}>
                                <label className="text-white">
                                    Country<span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="Country"
                                    onChange={handleCountryChange}
                                    options={countries}
                                    styles={customStyles}
                                    value={countries.find(option => option.value === country)}
                                />
                            </div>
                            <div className="mb-3 mx-3" style={{ width: "250px" }}>
                                <label className="text-white">
                                    State<span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="State"
                                    onChange={handleStateChange}
                                    options={states}
                                    styles={customStyles}
                                    value={states.find(option => option.value === state)}
                                    isDisabled={!country}
                                />
                            </div>
                            <div className="mb-3 mx-3 align-self-center" style={{ width: "250px" }}>
                                <label className="text-white">
                                    City<span className="text-danger">*</span>
                                </label>
                                <Select
                                    placeholder="City"
                                    onChange={handleLGAChange}
                                    options={lgas}
                                    styles={customStyles}
                                    value={lgas.find(option => option.value === lga)}
                                    isDisabled={!state}
                                />
                            </div>
                            <div className="mt-3 mx-3 align-self-center">
                                <button type="submit" className="btn text-white" style={{ width: "150px", height: "50px", backgroundColor: "#fe5722" }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Country;

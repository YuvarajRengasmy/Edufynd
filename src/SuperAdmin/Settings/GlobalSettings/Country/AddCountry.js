
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
    const ZERO = 0;
    let countryRegion = null;
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

    const handleCountryChange = (event) => {
        const { value } = event;
        setCountry(value);
    };

    const handleStateChange = (event) => {
        const { value } = event;
        setState(value);
    };

    const handleLGAChange = (event) => {
        const { value } = event;
        setLGA(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'border: 1.4783px solid rgba(11, 70, 84, 0.25)',
            borderRadius: '5.91319px',
            fontSize: "1.5rem",
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
           <aside className="app-sidebar sticky" id="sidebar">
  <div className="main-sidebar-header">
    <a href="index.html" className="header-logo">
      <img src="../assets/images/brand-logos/desktop-logo.png" alt="logo" className="desktop-logo" />
      <img src="../assets/images/brand-logos/toggle-logo.png" alt="logo" className="toggle-logo" />
      <img src="../assets/images/brand-logos/desktop-dark.png" alt="logo" className="desktop-dark" />
      <img src="../assets/images/brand-logos/toggle-dark.png" alt="logo" className="toggle-dark" />
      <img src="../assets/images/brand-logos/desktop-white.png" alt="logo" className="desktop-white" />
      <img src="../assets/images/brand-logos/toggle-white.png" alt="logo" className="toggle-white" />
    </a>
  </div>
  <div className="main-sidebar" id="sidebar-scroll">
    {/* Start::App User */}
    <div className="app-sidebar__user">
      <div className="dropdown user-pro-body text-center">
        <div className="user-pic">
          <img alt="user-img" className="avatar avatar-xl avatar-rounded mb-0" src="../assets/images/faces/16.jpg" />
        </div>
        <div className="user-info text-center">
          <h5 className=" mb-1 fw-bold">John Thomson</h5>
          <span className="text-muted app-sidebar__user-name text-sm">App Developer</span>
        </div>
      </div>
    </div>
    {/* End::App User */}
    {/* Start::nav */}
    <nav className="main-menu-container nav nav-pills flex-column sub-open">
      <div className="slide-left" id="slide-left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width={24} height={24} viewBox="0 0 24 24"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" /> </svg>
      </div>
      <ul className="main-menu">
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <span className="side-menu__label">Dashboard</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1"><a href="javascript:void(0);">Dashboard</a></li>
            <li className="slide"><a className="side-menu__item" href="index.html"><span>Dashboard 01</span></a></li>
            <li className="slide"><a className="side-menu__item" href="index2.html"><span>Dashboard 02</span></a></li>
            <li className="slide"><a className="side-menu__item" href="index3.html"><span>Dashboard 03</span></a></li>
            <li className="slide"><a className="side-menu__item" href="index4.html"><span>Dashboard 04</span></a></li>
            <li className="slide"><a className="side-menu__item" href="index5.html"><span>Dashboard 05</span></a></li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
            <span className="side-menu__label">Apps</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Apps</a>
            </li>
            <li className="slide">
              <a href="full-calendar.html" className="side-menu__item">Full Calendar</a>
            </li>
            <li className="slide">
              <a href="gallery.html" className="side-menu__item">Gallery</a>
            </li>
            <li className="slide">
              <a href="sweet_alerts.html" className="side-menu__item">Sweet Alerts</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Chat
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="chat.html" className="side-menu__item">Chat</a>
                </li>
                <li className="slide">
                  <a href="chat2.html" className="side-menu__item">Chat 02</a>
                </li>
                <li className="slide">
                  <a href="chat3.html" className="side-menu__item">Chat 03</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Contact
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="contact-list.html" className="side-menu__item">Contacts</a>
                </li>
                <li className="slide">
                  <a href="contact-list2.html" className="side-menu__item">Contacts 02</a>
                </li>
                <li className="slide">
                  <a href="contacts.html" className="side-menu__item">Contacts 03</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">File Manager
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="file-manager.html" className="side-menu__item">File Manager</a>
                </li>
                <li className="slide has-sub">
                  <a href="javascript:void(0);" className="side-menu__item">File Manager List
                    <i className="fe fe-chevron-right side-menu__angle" /></a>
                  <ul className="slide-menu child3">
                    <li className="slide">
                      <a href="file-manager-list.html" className="side-menu__item">File List</a>
                    </li>
                    <li className="slide">
                      <a href="file-manager-list2.html" className="side-menu__item">File List 02</a>
                    </li>
                  </ul>
                </li>
                <li className="slide">
                  <a href="file-details.html" className="side-menu__item">File Manager Details</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Todo List
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="todo-list.html" className="side-menu__item">Todo List</a>
                </li>
                <li className="slide">
                  <a href="todo-list2.html" className="side-menu__item">Todo List 02</a>
                </li>
                <li className="slide">
                  <a href="todo-list3.html" className="side-menu__item">Todo List 03</a>
                </li>
                <li className="slide">
                  <a href="todo-list4.html" className="side-menu__item">Todo List 04</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">User List
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="users-list-1.html" className="side-menu__item">User List</a>
                </li>
                <li className="slide">
                  <a href="users-list-2.html" className="side-menu__item">User List 02</a>
                </li>
                <li className="slide">
                  <a href="users-list-3.html" className="side-menu__item">User List 03</a>
                </li>
                <li className="slide">
                  <a href="users-list-4.html" className="side-menu__item">User List 04</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1={12} y1="22.08" x2={12} y2={12} /></svg>
            <span className="side-menu__label">Widgets</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Widgets</a>
            </li>
            <li className="slide">
              <a href="widgets-1.html" className="side-menu__item">Widgets</a>
            </li>
            <li className="slide">
              <a href="widgets-2.html" className="side-menu__item">Chart Widgets</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="side-menu__icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            <span className="side-menu__label">Forms</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Forms</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Form Elements
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="form_inputs.html" className="side-menu__item">Inputs</a>
                </li>
                <li className="slide">
                  <a href="form_check_radios.html" className="side-menu__item">Checks &amp; Radios</a>
                </li>
                <li className="slide">
                  <a href="form_input_group.html" className="side-menu__item">Input Group</a>
                </li>
                <li className="slide">
                  <a href="form_select.html" className="side-menu__item">Form Select</a>
                </li>
                <li className="slide">
                  <a href="form_range.html" className="side-menu__item">Range Slider</a>
                </li>
                <li className="slide">
                  <a href="form_input_masks.html" className="side-menu__item">Input Masks</a>
                </li>
                <li className="slide">
                  <a href="form_file_uploads.html" className="side-menu__item">File Uploads</a>
                </li>
                <li className="slide">
                  <a href="form_dateTime_pickers.html" className="side-menu__item">Date,Time Picker</a>
                </li>
                <li className="slide">
                  <a href="form_color_pickers.html" className="side-menu__item">Color Pickers</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a href="floating_labels.html" className="side-menu__item">Floating Labels</a>
            </li>
            <li className="slide">
              <a href="form_layout.html" className="side-menu__item">Form Layouts</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Form Editors
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="quill_editor.html" className="side-menu__item">Quill Editor</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a href="form_validation.html" className="side-menu__item">Validation</a>
            </li>
            <li className="slide">
              <a href="form_select2.html" className="side-menu__item">Select2</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
            <span className="side-menu__label">Charts</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Charts</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Apex Charts
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="apex-line-charts.html" className="side-menu__item">Line Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-area-charts.html" className="side-menu__item">Area Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-column-charts.html" className="side-menu__item">Column Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-bar-charts.html" className="side-menu__item">Bar Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-mixed-charts.html" className="side-menu__item">Mixed Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-rangearea-charts.html" className="side-menu__item">Range Area Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-timeline-charts.html" className="side-menu__item">Timeline Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-candlestick-charts.html" className="side-menu__item">CandleStick
                    Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-boxplot-charts.html" className="side-menu__item">Boxplot Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-bubble-charts.html" className="side-menu__item">Bubble Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-scatter-charts.html" className="side-menu__item">Scatter Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-heatmap-charts.html" className="side-menu__item">Heatmap Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-treemap-charts.html" className="side-menu__item">Treemap Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-pie-charts.html" className="side-menu__item">Pie Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-radialbar-charts.html" className="side-menu__item">Radialbar Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-radar-charts.html" className="side-menu__item">Radar Charts</a>
                </li>
                <li className="slide">
                  <a href="apex-polararea-charts.html" className="side-menu__item">Polararea Charts</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a href="chartjs-charts.html" className="side-menu__item">Chartjs Charts</a>
            </li>
            <li className="slide">
              <a href="echarts.html" className="side-menu__item">Echart Charts</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={18} height={18} rx={2} ry={2} /><line x1={3} y1={9} x2={21} y2={9} /><line x1={9} y1={21} x2={9} y2={9} /></svg>
            <span className="side-menu__label">Tables</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Tables</a>
            </li>
            <li className="slide">
              <a href="tables.html" className="side-menu__item">Tables</a>
            </li>
            <li className="slide">
              <a href="grid-tables.html" className="side-menu__item">Grid JS Tables</a>
            </li>
            <li className="slide">
              <a href="data-tables.html" className="side-menu__item">Data Tables</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="feather feather-map-pin side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx={12} cy={10} r={3} /></svg>
            <span className="side-menu__label">Maps</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Maps</a>
            </li>
            <li className="slide">
              <a href="google-maps.html" className="side-menu__item">Google Maps</a>
            </li>
            <li className="slide">
              <a href="leaflet-maps.html" className="side-menu__item">Leaflet Maps</a>
            </li>
            <li className="slide">
              <a href="vector-maps.html" className="side-menu__item">Vector Maps</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="side-menu__icon"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /></svg>
            <span className="side-menu__label">Elements</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1 mega-menu">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Elements</a>
            </li>
            <li className="slide">
              <a href="alerts.html" className="side-menu__item">Alerts</a>
            </li>
            <li className="slide">
              <a href="badge.html" className="side-menu__item">Badge</a>
            </li>
            <li className="slide">
              <a href="breadcrumb.html" className="side-menu__item">Breadcrumb</a>
            </li>
            <li className="slide">
              <a href="buttons.html" className="side-menu__item">Buttons</a>
            </li>
            <li className="slide">
              <a href="buttongroup.html" className="side-menu__item">Button Group</a>
            </li>
            <li className="slide">
              <a href="cards.html" className="side-menu__item">Cards</a>
            </li>
            <li className="slide">
              <a href="dropdowns.html" className="side-menu__item">Dropdowns</a>
            </li>
            <li className="slide">
              <a href="images_figures.html" className="side-menu__item">Images &amp; Figures</a>
            </li>
            <li className="slide">
              <a href="listgroup.html" className="side-menu__item">List Group</a>
            </li>
            <li className="slide">
              <a href="navs_tabs.html" className="side-menu__item">Navs &amp; Tabs</a>
            </li>
            <li className="slide">
              <a href="object-fit.html" className="side-menu__item">Object Fit</a>
            </li>
            <li className="slide">
              <a href="pagination.html" className="side-menu__item">Pagination</a>
            </li>
            <li className="slide">
              <a href="popovers.html" className="side-menu__item">Popovers</a>
            </li>
            <li className="slide">
              <a href="progress.html" className="side-menu__item">Progress</a>
            </li>
            <li className="slide">
              <a href="spinners.html" className="side-menu__item">Spinners</a>
            </li>
            <li className="slide">
              <a href="toasts.html" className="side-menu__item">Toasts</a>
            </li>
            <li className="slide">
              <a href="tooltips.html" className="side-menu__item">Tooltips</a>
            </li>
            <li className="slide">
              <a href="typography.html" className="side-menu__item">Typography</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide">
          <a href="icons.html" className="side-menu__item">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="side-menu__icon"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
            <span className="side-menu__label">Icons</span>
          </a>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="feather feather-archive side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8" /><rect x={1} y={3} width={22} height={5} /><line x1={10} y1={12} x2={14} y2={12} /></svg>
            <span className="side-menu__label">Advanced Ui</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Advanced Ui</a>
            </li>
            <li className="slide">
              <a href="accordions_collpase.html" className="side-menu__item">Accordions &amp; Collapse</a>
            </li>
            <li className="slide">
              <a href="carousel.html" className="side-menu__item">Carousel</a>
            </li>
            <li className="slide">
              <a href="draggable-cards.html" className="side-menu__item">Draggable Cards</a>
            </li>
            <li className="slide">
              <a href="modals_closes.html" className="side-menu__item">Modals &amp; Closes</a>
            </li>
            <li className="slide">
              <a href="navbar.html" className="side-menu__item">Navbar</a>
            </li>
            <li className="slide">
              <a href="offcanvas.html" className="side-menu__item">Offcanvas</a>
            </li>
            <li className="slide">
              <a href="placeholders.html" className="side-menu__item">Placeholders</a>
            </li>
            <li className="slide">
              <a href="ratings.html" className="side-menu__item">Ratings</a>
            </li>
            <li className="slide">
              <a href="scrollspy.html" className="side-menu__item">Scrollspy</a>
            </li>
            <li className="slide">
              <a href="swiperjs.html" className="side-menu__item">Swiper JS</a>
            </li>
            <li className="slide">
              <a href="treeview.html" className="side-menu__item">Treeview</a>
            </li>
            <li className="slide">
              <a href="ribbons.html" className="side-menu__item">Ribbons</a>
            </li>
            <li className="slide">
              <a href="counters.html" className="side-menu__item">Counters</a>
            </li>
            <li className="slide">
              <a href="loader.html" className="side-menu__item">Loaders</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
            <span className="side-menu__label">Pages</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Pages</a>
            </li>
            <li className="slide">
              <a href="about-us.html" className="side-menu__item">About Us</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Blog
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide has-sub">
                  <a href="javascript:void(0);" className="side-menu__item">Blog
                    <i className="fe fe-chevron-right side-menu__angle" /></a>
                  <ul className="slide-menu child3">
                    <li className="slide">
                      <a href="blog.html" className="side-menu__item">Blog-01</a>
                    </li>
                    <li className="slide">
                      <a href="blog-2.html" className="side-menu__item">Blog 02</a>
                    </li>
                    <li className="slide">
                      <a href="blog-3.html" className="side-menu__item">Blog 03</a>
                    </li>
                  </ul>
                </li>
                <li className="slide">
                  <a href="blog-details.html" className="side-menu__item">Blog Details</a>
                </li>
                <li className="slide">
                  <a href="blog-create.html" className="side-menu__item">Create Blog</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Ecommerce
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="add-products.html" className="side-menu__item">Add Products</a>
                </li>
                <li className="slide">
                  <a href="cart.html" className="side-menu__item">Cart</a>
                </li>
                <li className="slide">
                  <a href="checkout.html" className="side-menu__item">Checkout</a>
                </li>
                <li className="slide">
                  <a href="edit-products.html" className="side-menu__item">Edit Products</a>
                </li>
                <li className="slide">
                  <a href="order-details.html" className="side-menu__item">Order Details</a>
                </li>
                <li className="slide">
                  <a href="orders.html" className="side-menu__item">Orders</a>
                </li>
                <li className="slide">
                  <a href="products.html" className="side-menu__item">Products</a>
                </li>
                <li className="slide">
                  <a href="product-details.html" className="side-menu__item">Product Details</a>
                </li>
                <li className="slide">
                  <a href="products-list.html" className="side-menu__item">Products List</a>
                </li>
                <li className="slide">
                  <a href="wishlist.html" className="side-menu__item">Wishlist</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Email
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="mail.html" className="side-menu__item">Mail Inbox</a>
                </li>
                <li className="slide">
                  <a href="mail-read.html" className="side-menu__item">Mail Read</a>
                </li>
                <li className="slide">
                  <a href="mail-settings.html" className="side-menu__item">Mail Settings</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a href="empty.html" className="side-menu__item">Empty</a>
            </li>
            <li className="slide">
              <a href="faq's.html" className="side-menu__item">FAQ's</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Invoice
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="invoice-create.html" className="side-menu__item">Create Invoice</a>
                </li>
                <li className="slide">
                  <a href="invoice-edit.html" className="side-menu__item">Edit Invoice</a>
                </li>
                <li className="slide has-sub">
                  <a href="javascript:void(0);" className="side-menu__item">Invoice Details
                    <i className="fe fe-chevron-right side-menu__angle" /></a>
                  <ul className="slide-menu child3">
                    <li className="slide">
                      <a href="invoice-1.html" className="side-menu__item">Invoice-01</a>
                    </li>
                    <li className="slide">
                      <a href="invoice-2.html" className="side-menu__item">Invoice-02</a>
                    </li>
                    <li className="slide">
                      <a href="invoice-3.html" className="side-menu__item">Invoice-03</a>
                    </li>
                  </ul>
                </li>
                <li className="slide">
                  <a href="invoice-list.html" className="side-menu__item">Invoice List</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Pricing
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="pricing.html" className="side-menu__item">pricing-1</a>
                </li>
                <li className="slide">
                  <a href="pricing2.html" className="side-menu__item">pricing-2</a>
                </li>
                <li className="slide">
                  <a href="pricing3.html" className="side-menu__item">pricing-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Profile
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="profile.html" className="side-menu__item">Profile-1</a>
                </li>
                <li className="slide">
                  <a href="profile2.html" className="side-menu__item">Profile-2</a>
                </li>
                <li className="slide">
                  <a href="profile3.html" className="side-menu__item">Profile-3</a>
                </li>
                <li className="slide">
                  <a href="editprofile.html" className="side-menu__item">Edit Profile</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a href="reviews.html" className="side-menu__item">Reviews</a>
            </li>
            <li className="slide">
              <a href="team.html" className="side-menu__item">Team</a>
            </li>
            <li className="slide">
              <a href="terms_conditions.html" className="side-menu__item">Terms &amp; Conditions</a>
            </li>
            <li className="slide">
              <a href="timeline.html" className="side-menu__item">Timeline</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="side-menu__icon"><line x1={4} y1={21} x2={4} y2={14} /><line x1={4} y1={10} x2={4} y2={3} /><line x1={12} y1={21} x2={12} y2={12} /><line x1={12} y1={8} x2={12} y2={3} /><line x1={20} y1={21} x2={20} y2={16} /><line x1={20} y1={12} x2={20} y2={3} /><line x1={1} y1={14} x2={7} y2={14} /><line x1={9} y1={8} x2={15} y2={8} /><line x1={17} y1={16} x2={23} y2={16} /></svg>
            <span className="side-menu__label">Nested Menu</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Nested Menu</a>
            </li>
            <li className="slide">
              <a href="javascript:void(0);" className="side-menu__item">Nested-1</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Nested-2
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="javascript:void(0);" className="side-menu__item">Nested-2-1</a>
                </li>
                <li className="slide has-sub">
                  <a href="javascript:void(0);" className="side-menu__item">Nested-2-2
                    <i className="fe fe-chevron-right side-menu__angle" /></a>
                  <ul className="slide-menu child3">
                    <li className="slide">
                      <a href="javascript:void(0);" className="side-menu__item">Nested-2-2-1</a>
                    </li>
                    <li className="slide">
                      <a href="javascript:void(0);" className="side-menu__item">Nested-2-2-2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            <span className="side-menu__label">Account</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Account</a>
            </li>
            <li className="slide">
              <a href="coming-soon.html" className="side-menu__item">Coming Soon</a>
            </li>
            <li className="slide">
              <a href="under-maintenance.html" className="side-menu__item">Under Maintenance</a>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Create Password
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="create-password.html" className="side-menu__item">Create Password-1</a>
                </li>
                <li className="slide">
                  <a href="create-password-2.html" className="side-menu__item">Create Password-2</a>
                </li>
                <li className="slide">
                  <a href="create-password-3.html" className="side-menu__item">Create Password-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Lock Screen
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="lockscreen.html" className="side-menu__item">Lock Screen-1</a>
                </li>
                <li className="slide">
                  <a href="lockscreen-2.html" className="side-menu__item">Lock Screen-2</a>
                </li>
                <li className="slide">
                  <a href="lockscreen-3.html" className="side-menu__item">Lock Screen-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Reset Password
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="reset-password.html" className="side-menu__item">Reset Password-1</a>
                </li>
                <li className="slide">
                  <a href="reset-password-2.html" className="side-menu__item">Reset Password-2</a>
                </li>
                <li className="slide">
                  <a href="reset-password-3.html" className="side-menu__item">Reset Password-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Log In
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="login.html" className="side-menu__item">Log In-1</a>
                </li>
                <li className="slide">
                  <a href="login-2.html" className="side-menu__item">Log In-2</a>
                </li>
                <li className="slide">
                  <a href="login-3.html" className="side-menu__item">Log In-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Forgot Password
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="forgot.html" className="side-menu__item">Forgot Password-1</a>
                </li>
                <li className="slide">
                  <a href="forgot-2.html" className="side-menu__item">Forgot Password-2</a>
                </li>
                <li className="slide">
                  <a href="forgot-3.html" className="side-menu__item">Forgot Password-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Register
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="register.html" className="side-menu__item">Register-1</a>
                </li>
                <li className="slide">
                  <a href="register-2.html" className="side-menu__item">Register-2</a>
                </li>
                <li className="slide">
                  <a href="register-3.html" className="side-menu__item">Register-3</a>
                </li>
              </ul>
            </li>
            <li className="slide has-sub">
              <a href="javascript:void(0);" className="side-menu__item">Two Step Verification
                <i className="fe fe-chevron-right side-menu__angle" /></a>
              <ul className="slide-menu child2">
                <li className="slide">
                  <a href="two-step-verification.html" className="side-menu__item">Two Step Verification-1</a>
                </li>
                <li className="slide">
                  <a href="two-step-verification-2.html" className="side-menu__item">Two Step Verification-2</a>
                </li>
                <li className="slide">
                  <a href="two-step-verification-3.html" className="side-menu__item">Two Step Verification-3</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="side-menu__icon"><circle cx={12} cy={12} r={10} /><line x1={12} y1={8} x2={12} y2={12} /><line x1={12} y1={16} x2="12.01" y2={16} /></svg>
            <span className="side-menu__label">Error Pages</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Error Pages</a>
            </li>
            <li className="slide">
              <a href="400.html" className="side-menu__item">400 </a>
            </li>
            <li className="slide">
              <a href="401.html" className="side-menu__item">401</a>
            </li>
            <li className="slide">
              <a href="403.html" className="side-menu__item">403</a>
            </li>
            <li className="slide">
              <a href="404.html" className="side-menu__item">404 </a>
            </li>
            <li className="slide">
              <a href="500.html" className="side-menu__item">500</a>
            </li>
            <li className="slide">
              <a href="503.html" className="side-menu__item">503</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
        {/* Start::slide */}
        <li className="slide has-sub">
          <a href="javascript:void(0);" className="side-menu__item">
            <svg className="side-menu__icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={4} y={4} width={16} height={16} rx={2} ry={2} /><rect x={9} y={9} width={6} height={6} /><line x1={9} y1={1} x2={9} y2={4} /><line x1={15} y1={1} x2={15} y2={4} /><line x1={9} y1={20} x2={9} y2={23} /><line x1={15} y1={20} x2={15} y2={23} /><line x1={20} y1={9} x2={23} y2={9} /><line x1={20} y1={14} x2={23} y2={14} /><line x1={1} y1={9} x2={4} y2={9} /><line x1={1} y1={14} x2={4} y2={14} /></svg>
            <span className="side-menu__label">Utilities</span>
            <i className="fe fe-chevron-right side-menu__angle" />
          </a>
          <ul className="slide-menu child1">
            <li className="slide side-menu__label1">
              <a href="javascript:void(0);">Utilities</a>
            </li>
            <li className="slide">
              <a href="avatars.html" className="side-menu__item">Avatars</a>
            </li>
            <li className="slide">
              <a href="borders.html" className="side-menu__item">Borders</a>
            </li>
            <li className="slide">
              <a href="breakpoints.html" className="side-menu__item">Breakpoints</a>
            </li>
            <li className="slide">
              <a href="colors.html" className="side-menu__item">Colors</a>
            </li>
            <li className="slide">
              <a href="columns.html" className="side-menu__item">Columns</a>
            </li>
            <li className="slide">
              <a href="flex.html" className="side-menu__item">Flex</a>
            </li>
            <li className="slide">
              <a href="gutters.html" className="side-menu__item">Gutters</a>
            </li>
            <li className="slide">
              <a href="helpers.html" className="side-menu__item">Helpers</a>
            </li>
            <li className="slide">
              <a href="position.html" className="side-menu__item">Position</a>
            </li>
            <li className="slide">
              <a href="more.html" className="side-menu__item">Additional Content</a>
            </li>
          </ul>
        </li>
        {/* End::slide */}
      </ul>
      <div className="app-sidebar-help">
        <div className="dropdown text-center">
          <div className="help">
            <a href="javascript:void(0);" className="nav-link p-0 help-dropdown my-auto d-inline-flex align-items-center" data-bs-toggle="dropdown">
              <span className="fw-bold">Help Info</span> <i className="ri-arrow-down-s-line ms-2 lh-1 op-5" />
            </a>
            <div className="dropdown-menu dropdown-menu-end p-3">
              <div className="sidebar-dropdown-divider pb-3">
                <h4 className="fw-bold text-fixed-white">Help</h4>
                <a className="d-block text-fixed-white" href="javascript:void(0);">Knowledge base</a>
                <a className="d-block text-fixed-white" href="javascript:void(0);">Contact@info.com</a>
                <a className="d-block text-fixed-white" href="javascript:void(0);">88 8888 8888</a>
              </div>
              <div className="sidebar-dropdown-divider pb-3 pt-3 mb-3">
                <p className="mb-1">Your Fax Number</p>
                <a className="fw-bold text-fixed-white" href="javascript:void(0);">88 8888 8888</a>
              </div>
              <a href="login-1.html" className="text-fixed-white">Logout</a>
            </div>
            <div className="help-icon">
              <a aria-label="anchor" className="nav-link icon p-0" href="javascript:void(0);">
                <svg className="menu-icon" x={1008} y={1248} viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path opacity=".3" d="M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5z" /><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-2 6H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zM7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 013.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 013.54 6.42z" /></svg>
                <span className="pulse " />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width={24} height={24} viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" /> </svg></div>
    </nav>
    {/* End::nav */}
  </div>
</aside>


                                    <div className="main-content app-content">
                                        <div className="container-fluid">
                                            <div className="page-header">
                                                <h1 className="page-title my-auto">User List 2</h1>
                                                <div className="page-header-bredcrumb">
                                                    <ol className="breadcrumb mb-0">
                                                        <li className="breadcrumb-item">
                                                            <a href="javascript:void(0);"><svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" height={24} viewBox="0 0 24 24" width={24}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" /><path d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" opacity=".3" /></svg>
                                                                <span className="breadcrumb-icon"> Apps</span>
                                                            </a>
                                                        </li>
                                                        <li className="breadcrumb-item">
                                                            <a href="javascript:void(0);">Userlist</a>
                                                        </li>
                                                        <li className="breadcrumb-item active" aria-current="page">User List 2</li>
                                                    </ol>
                                                </div>
                                            </div>
                                            {/* PAGE-HEADER END */}
                                            {/* Start:: row-1 */}
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row mb-3 gap-3">
                                                                <div className="col">
                                                                    <a href="javascript:void(0);" className="btn btn-primary text-nowrap"><i className="fe fe-plus" /> Add New User</a>
                                                                </div>
                                                                <div className="col col-auto">
                                                                    <div className="input-group w-auto">
                                                                        <input type="text" className="form-control border-end-0" placeholder="Search Files" />
                                                                        <button aria-label="button" className="btn btn-light bg-white border-start-0" type="button"><i className="fe fe-search" /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/7.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Denis Rosenblum</p>
                                                                            <small className="text-muted">Project Manager</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/6.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Harvey Mattos</p>
                                                                            <small className="text-muted">Developer</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/5.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Catrice Doshier</p>
                                                                            <small className="text-muted">Assistant Manager</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/1.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Catherina Bamber</p>
                                                                            <small className="text-muted">Company Manager</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/8.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Margie Fitts</p>
                                                                            <small className="text-muted">It Manager</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/5.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Dana Lott</p>
                                                                            <small className="text-muted">Hr Manager</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/6.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Benedict Vallone</p>
                                                                            <small className="text-muted">Hr Recriuter</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/8.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Robbie Ruder</p>
                                                                            <small className="text-muted">Ceo</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/3.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Micaela Aultman</p>
                                                                            <small className="text-muted">Php developer</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/4.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Jacquelynn</p>
                                                                            <small className="text-muted">Web developer</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/9.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Elida Distefano</p>
                                                                            <small className="text-muted">Hr Manager</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                                                                        <img src="../assets/images/faces/7.jpg" className="avatar avatar-lg avatar-rounded d-block" alt />
                                                                        <div className="wrapper ms-sm-3 mt-2 mt-sm-0 text-nowrap">
                                                                            <p className="mb-0 mt-1 text-dark fw-semibold">Collin Bridgman</p>
                                                                            <small className="text-muted">web designer</small>
                                                                        </div>
                                                                        <div className="ms-auto mt-2 mt-sm-0 text-sm-end">
                                                                            <a href="javascript:void(0);" className="btn btn-outline-light btn-sm mb-1">Message</a>
                                                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm mb-1">View Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <main>
                                        <section className="submain submain-one">

                                            <form className="submain-one-form" onSubmit={handleSubmit}>
                                                <header className="submain-one-form-header">
                                                    <h1>Pick-A-Location</h1>
                                                </header>
                                                <section className="submain-one-form-body">
                                                    <section className="submain-one-form-body-subsection  col-md-3">
                                                        <Select
                                                            type="text"
                                                            placeholder="Select a country"
                                                            id="name"
                                                            onChange={handleCountryChange}
                                                            options={countries}
                                                            styles={customStyles}

                                                        />
                                                    </section>
                                                    <section className="submain-one-form-body-subsection  col-md-3">
                                                        {
                                                            states?.length !== ZERO &&
                                                            <Select
                                                                placeholder="Select a state"
                                                                id="name"
                                                                onChange={handleStateChange}
                                                                options={states}
                                                                styles={customStyles}


                                                            />}
                                                    </section>
                                                    <section className="submain-one-form-body-subsection  col-md-3">
                                                        {
                                                            lgas && lgas?.length !== ZERO &&
                                                            <Select
                                                                placeholder="Select a Substate"
                                                                id="name"
                                                                onChange={handleLGAChange}
                                                                options={lgas}
                                                                styles={customStyles}

                                                            />}
                                                    </section>
                                                    {
                                                        !true && lga
                                                    }
                                                    <section className="subdomain-one-form-body-subsection-one">
                                                        <button className="subdomain-one-form-body-subsection-one-button">Submit</button>
                                                    </section>
                                                </section>
                                            </form>
                                        </section>
                                        <section className="submain submain-two">
                                            <section className="submain-two-image-cover">

                                            </section>
                                        </section>
                                    </main>
                                </>
                                );
}
                                export default Country;
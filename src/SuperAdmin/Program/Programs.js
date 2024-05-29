import React, { useEffect, useState } from "react";
import { getallProgram, deleteProgram , getFilterProgram } from "../../api/Program";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import Masterheader from "../../compoents/header";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";
import axios from 'axios';




export default function Masterproductlist() {


  const initialStateInputs = {
    universityName: "",
    programTitle: "",
    applicationFee: "",
    courseFee: "",
  
  };
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [program, setProgaram] = useState();

  useEffect(() => {
    getAllProgaramDetails();
  }, [pagination.from, pagination.to]);

  const getAllProgaramDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getallProgram(data)
    .then((res) => {
      setProgaram(res?.data?.result?.programList);
      setPagination({
        ...pagination,
        count: res?.data?.result?.programCount,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteProgramData = () => {
    deleteProgram (deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllProgaramDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const filterProgramList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: inputs.universityName,
      programTitle: inputs.programTitle,
      applicationFee: inputs.applicationFee,
      courseFee: inputs.courseFee,
      limit: 10,
      page: pagination.from,

    };
    getFilterProgram(data)
      .then((res) => {
        setProgaram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllProgaramDetails();
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const openImportPopup = () => {
    setOpenImport(true);
  };

  const closeImportPopup = () => {
    setOpenImport(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('program', file);

    try {
      const response = await axios.post('http://localhost:4409/api/program/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };



  const pdfDownload = (event) => {
    event?.preventDefault();
    getFilterProgram(program)
      .then((res) => {
        var result = res?.data?.result;
        var tablebody = [];
        tablebody.push([
          {
            text: "S.NO",
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          },
          {
            text: "University Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Program Title",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Application Fees",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Course Fees",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Campus",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },

        ]);
        result.forEach((element, index) => {
          tablebody.push([
            {
              text: index + 1,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
              border: [true, false, true, true],
            },
            {
              text: element?.universityName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.programTitle ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.applicationFee ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.courseFee ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.campus ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("Program List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getFilterProgram(program)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
          universityName: res?.universityName ?? "-",
          programTitle: res?.programTitle ?? "-",
          applicationFee: res?.applicationFee ?? "-",
          courseFee: res?.courseFee ?? "-",
          campus: res?.campus ?? "-",
           

          });
        });
        let header1 = [
          "universityName",
          "programTitle",
          "applicationFee",
          "courseFee",
          "campus",
   

        ];
        let header2 = [
          "University Name",
          "Program Title",
          "Application Fees",
          "Course Fees",
          "Campus",
       
        ];
        ExportCsvService.downloadCsv(
          list,
          "programList",
          "Program List",

          header1,
          header2
        );

      })
      .catch((err) => {
        console.log(err);
      });
  };





  return (
    <div style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div class="">
        <div class="">
          <Mastersidebar />
        </div>
      </div>

      <div className="content-wrapper" style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row ">

              <div >
                <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                  <li className="flex-grow-1">
                    <input
                      type="search"
                      placeholder="Search"
                      border-color="black"
                      aria-describedby="button-addon3"
                      className="form-control-lg bg-white border-0 ps-1 rounded-4 w-100"
                      style={{ maxWidth: "600px", marginLeft: "0px" }}
                    />
                  </li>
                  <li class="m-2">


                    <div>
                      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter BY Program</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body ">
                          <form>
                            <div className="from-group mb-3">
                              <label className="form-label">University Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="universityName"
                                onChange={handleInputs}
                                placeholder="Search...University Name"
                              />
                              <label className="form-label">Program Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="programTitle"
                                onChange={handleInputs}
                                placeholder="Search...program Title"
                              />
                              <label className="form-label">ApplicationFee</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="applicationFee"
                                onChange={handleInputs}
                                placeholder="Search...Application Fee"
                              />
                              <label className="form-label">CourseFee</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="courseFee"
                                onChange={handleInputs}
                                placeholder="Search...Course Fee"
                              />

                             
                            </div>
                            <div>
                              <button

                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border text-white float-right bg"
                                style={{ backgroundColor: "#9265cc" }}
                                onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                onClick={filterProgramList}
                                className="btn btn-save border text-white float-right mx-2"
                                style={{ backgroundColor: "#9265cc" }}
                              >
                                Apply
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>


                  </li>
                  <li class="m-2">
                    <Link onClick={pdfDownload}>
                      <button   style={{ backgroundColor: "#E12929" }} className="btn text-white ">
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link onClick={exportCsv} class="btn-filters">
                      <span>
                        <button   style={{ backgroundColor: "#22A033" }} className="btn text-white ">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>

                  <li class="m-2">
                    <Link onClick={openImportPopup} class="btn-filters">
                      <span>
                        <button
                          style={{ backgroundColor: "#9265cc" }}
                          className="btn text-white "
                        >
                          <i class="fa fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link class="btn btn-pix-primary" to="/AddProgram">
                      <button
                        className="btn btn-outline border text-white  "
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Program
                      </button>
                    </Link>
                  </li>

                </ol>


              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">

                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr  style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                          <th className="text-capitalize text-start">S No</th>
                          <th className="text-capitalize text-start">University Name</th>
                          <th className="text-capitalize text-start">programTitle</th>
                          <th className="text-capitalize text-start">Application Fees</th>
                          <th className="text-capitalize text-start">CourseFees</th>
                         
                          <th className="text-capitalize text-start">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {program?.map((data, index) => (
                          <tr key={index}  style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                            <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                            <td className="text-capitalize text-start">{data?.universityName}</td>
                            <td className="text-capitalize text-start">{data?.programTitle}</td>
                            <td className="text-capitalize text-start">{data?.applicationFee}</td>
                            <td className="text-capitalize text-start">{data?.courseFee}</td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/ViewProgram",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-eye text-primary me-1"></i>

                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/EditProgram",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-edit text-warning me-1"></i>

                                </Link>
                                <Link
                                  className="dropdown-item"
                                  onClick={() => {
                                    openPopup(data?._id);
                                  }}
                                >
                                  <i className="far fa-trash-alt text-danger me-1"></i>

                                </Link>
                              </div>
                             
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-right my-2">
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3"
              onClick={deleteProgramData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel "
              onClick={closePopup}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter University
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>

        </DialogContent>
      </Dialog>
      <Dialog open={openImport} fullWidth maxWidth="sm">
        <DialogTitle>
         Upload Program List
          <IconButton className="float-right" onClick={closeImportPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">

            <div className="mb-3">
            <input
              type="file"
              name="file"
              className="form-control border-0 text-dark bg-transparent"
              onChange={handleFileChange}
            />
          </div>

            </div>
            <div>
              <Link
                to="/ListUniversity"
                className="btn btn-cancel border text-white float-right bg"
                style={{ backgroundColor: "#9265cc" }}

              >
                Cencel
              </Link>
              <button
                type="submit"
                onClick={handleFileUpload}
                className="btn btn-save border text-white float-right mx-2"
                style={{ backgroundColor: "#9265cc" }}
              >
                Apply
              </button>
              
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

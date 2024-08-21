import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { getallStudent, deleteStudent , getFilterStudentAdmin,getFilterStudent } from "../../api/student";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination,  } from "@mui/material";

import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { formatDate } from "../../Utils/DateFormat";

import { toast } from "react-toastify";
import { getStudentId, } from "../../Utils/storage";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';




export default function Masterproductlist() {


  const initialStateInputs = {
    name: "",
    programTitle: "",
    applicationFee: "",
    courseFee: "",
  
  };
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  // const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [student, setStudent] = useState();

  useEffect(() => {
    getAllStudentDetails();
  }, [pagination.from, pagination.to]);

  const getAllStudentDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      studentId:getStudentId,
      superAdminId:getStudentId,
    

    };
    getFilterStudentAdmin(data)
    
    .then((res) => {
      const sortedStudents = res?.data?.result?.studentList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
      });
      setStudent(sortedStudents);
      setPagination({
        ...pagination,
        count: res?.data?.result?.studentCount,
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
  const deleteStudentData = () => {
    deleteStudent (deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllStudentDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const openFilterPopup = () => {
  //   setOpenFilter(true);
  // };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const filterStudentList = (event) => {
    event?.preventDefault();
    // setFilter(true);
    const data = {
      universityName: inputs.universityName,
      programTitle: inputs.programTitle,
      applicationFee: inputs.applicationFee,
      courseFee: inputs.courseFee,
      limit: 10,
      page: pagination.from,

    };
    getFilterStudent(data)
      .then((res) => {
        setStudent(res?.data?.result?.programList);
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
    // setFilter(false);
    setInputs(initialStateInputs);
    getAllStudentDetails();
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
      const response = await axios.post('https://api.edufynd.in/api/student/import', formData, {
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
    getFilterStudent(student)
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
        templatePdf("Student List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getFilterStudent(student)
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

  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;

    // Apply SortableJS to the table headers
    const sortable = new Sortable(table.querySelector('thead tr'), {
      animation: 150,
      swapThreshold: 0.5,
      handle: '.sortable-handle',
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        // Move the columns in the tbody
        table.querySelectorAll('tbody tr').forEach((row) => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      }
    });

    return () => {
      sortable.destroy();
    };
  }, []);




  return (
    <>
      <div >
      
          <Mastersidebar />
        
      

      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header bg-light shadow-sm sticky-top">
  <div className="container">
    <div className="row">
      <div className="col-xl-12">
        <ol className="d-flex justify-content-end align-items-center mb-0 list-unstyled">
          <li className="flex-grow-1">
            <div className="input-group" style={{ maxWidth: "600px" }}>
              <input
                type="search"
                placeholder="Search"
                aria-describedby="button-addon3"
                className="form-control border-1 border-dark rounded-4"
                style={{ fontSize: "12px" }} // Keep the font size if it's correct
              />
              <span
                className="input-group-text bg-transparent border-0"
                id="button-addon3"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              >
                <i className="fas fa-search" style={{ color: "black" }}></i>
              </span>
            </div>
          </li>
          <li className="m-1">
            <button
              className="btn btn-primary border-0 rounded-1"
              style={{ fontSize: '12px' }}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <FaFilter />
            </button>
          </li>
          <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Filter Student</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentName"
                    onChange={handleInputs}
                    placeholder="Search...Student Name"
                    style={{ fontSize: '12px' }}
                  />
                  <label className="form-label">Student Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentCode"
                    onChange={handleInputs}
                    placeholder="Search...Student Code"
                    style={{ fontSize: '12px' }}
                  />
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={handleInputs}
                    placeholder="Search...Email"
                    style={{ fontSize: '12px' }}
                  />
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    onChange={handleInputs}
                    placeholder="Search...Status"
                    style={{ fontSize: '12px' }}
                  />
                </div>
                <div>
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-cancel border-0 rounded-pill fw-semibold text-white float-right"
                    style={{ backgroundColor: "#0f2239", fontSize: '14px' }}
                    onClick={resetFilter}
                  >
                    Reset
                  </button>
                  <button
                    data-bs-dismiss="offcanvas"
                    type="submit"
                    onClick={filterStudentList}
                    className="btn btn-save border-0 rounded-pill fw-semibold text-white float-right mx-2"
                    style={{ backgroundColor: "#fe5722", fontSize: '14px' }}
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
          <li className="m-1">
            <Link onClick={pdfDownload}>
              <button
                className="btn text-white rounded-1 border-0"
                style={{ backgroundColor: "#E12929", fontSize: '12px' }}
              >
                <i className="fa fa-file-pdf" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={exportCsv}>
              <button
                className="btn text-white rounded-1 border-0"
                style={{ backgroundColor: "#22A033", fontSize: '12px' }}
              >
                <i className="fa fa-file-excel" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={openImportPopup}>
              <button
                className="btn text-white rounded-1 border-0"
                style={{ backgroundColor: "#7627ef", fontSize: '12px' }}
              >
                <i className="fa fa-upload" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-0">
            <Link className="btn btn-pix-primary border-0 rounded-1" to="/add_student">
              <button
                className="btn fw-semibold rounded-1 border-0 text-white"
                style={{ backgroundColor: "#231f20", fontSize: '12px' }}
              >
                <i className="fa fa-plus-circle me-1" aria-hidden="true"></i> Add Student
              </button>
            </Link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>



<div className="container mt-3 overflow-x-auto" style={{scrollbarWidth:'thin'}}>
      <div className="d-flex ">
        {/* Application Submitted Card */}
       
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-paper-plane"></i>&nbsp;&nbsp;Application Submitted</h6>
                <p className="card-text">45</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Offered and Rejected Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#2196F3', color: '#fff' }}>
              <div className="card-body text-center">
                <h6 className="mb-1">Status</h6>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <h6><i className="fas fa-thumbs-up"></i>&nbsp;&nbsp;Offered</h6>
                    <p className="card-text">30</p>
                  </div>
                  <div className="d-flex flex-column">
                    <h6><i className="fas fa-thumbs-down"></i>&nbsp;&nbsp;Rejected</h6>
                    <p className="card-text">15</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Deposit Paid Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#FFC107', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-money-bill-wave"></i>&nbsp;&nbsp;Deposit Paid</h6>
                <p className="card-text">20</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Travel Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-plane"></i>&nbsp;&nbsp;Travel</h6>
                <p className="card-text">10</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Enrolled Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#009688', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-user-check"></i>&nbsp;&nbsp;Enrolled</h6>
                <p className="card-text">25</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Invoices Raised Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#3F51B5', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-file-invoice-dollar"></i>&nbsp;&nbsp;Invoices Raised</h6>
                <p className="card-text">8</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
        
        
            <div className="container">
            <div className="row">
              <div className="col-xl-12">
     
       <div className="card  rounded-1 shadow-sm border-0">
         <div className="card-body">
           <div className="card-table">
             <div className="table-responsive">

               <table className=" table table-hover card-table dataTable text-center" style={{ color: '#9265cc', fontSize: '13px' }}
              ref={tableRef}>
                 <thead className="table-light">
                   <tr  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                     <th className="text-capitalize text-start sortable-handle">S No</th>
                     <th className="text-capitalize text-start sortable-handle"> Name</th>
                     <th className="text-capitalize text-start sortable-handle"> Code</th>
                  
                     <th className="text-capitalize text-start sortable-handle">Email</th>
                     <th className="text-capitalize text-start  sortable-handle">Mobile Number</th>
                     <th className="text-capitalize text-start sortable-handle">Status</th>
                     <th className="text-capitalize text-start sortable-handle">Created by</th>
                     <th className="text-capitalize text-start sortable-handle">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {student?.map((data, index) => (
                     <tr key={index}  style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                       <td className="text-capitalize text-start text-truncate">{pagination.from + index + 1}</td>
                       <td className="text-capitalize text-start text-truncate">{data?.name?data?.name: data?.superAdminId?.studentName  || "Not Available"}</td>
                       <td className="text-capitalize text-start text-truncate">{data?.studentCode  || "Not Available"}</td>
                      
                       <td className=" text-start text-truncate">{data?.email}</td>
                       <td className="text-capitalize text-start text-truncate">{data?.mobileNumber?data?.mobileNumber:data?.whatsAppNumber?data?.whatsAppNumber:null  || "Not Available"}</td>
                       <td className="text-capitalize text-start text-truncate">{data?.status}</td>
                       <td className="text-capitalize text-start text-truncate" >{formatDate(data?.modifiedOn?data?.modifiedOn:data?.createdOn?data?.createdOn:null)  || "Not Available"}</td>
                       <td className="text-capitalize text-start text-truncate">
                         <div className="d-flex">
                           <Link
                             className="dropdown-item"
                             to={{
                               pathname: "/view_student",
                               search: `?id=${data?._id}`,
                             }}
                           >
                             <i className="far fa-eye text-primary me-1"></i>

                           </Link>
                           <Link
                             className="dropdown-item"
                             to={{
                               pathname: "/edit_student",
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
         
         
       
      </div>
             
   
         <Dialog open={open}>
   <DialogContent>
     <div className="text-center m-4">
       <h5 className="mb-4 text-capitalize"   >
         Are you sure you want to Delete <br /> the selected Student ?
       </h5>
       <button
         type="button"
         className="btn btn-danger fw-semibold  rounded-1 rounded-pill text-white border-0 mx-3"
         style={{fontSize:"12px",fontFamily: 'Plus Jakarta Sans'}}
         onClick={deleteStudentData}
       >
         Yes
       </button>
       <button
         type="button"
         className="btn btn-success fw-semibold  rounded-1 rounded-pill text-white border-0 "
         style={{fontSize:"12px",fontFamily: 'Plus Jakarta Sans'}}
         onClick={closePopup}
       >
         No
       </button>
     </div>
   </DialogContent>
 </Dialog>
 <Dialog open={openFilter} fullWidth maxWidth="sm">
   <DialogTitle>
     Filter Student
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
         className="form-control  text-dark bg-transparent"
         onChange={handleFileChange}
       />
     </div>

       </div>
       <div>
         <Link
           to="/ListUniversity"
           className="btn btn-cancel border-0 rounded-pill text-white  fw-semibold  px-3 py-1 float-right bg"
           style={{ backgroundColor: "#0f2239" }}

         >
           Cancel
         </Link>
         <button
           type="submit"
           onClick={handleFileUpload}
           className="btn btn-save border-0 text-white rounded-pill   fw-semibold  px-3 py-1 float-right mx-2"
           style={{ backgroundColor: "#fe5722" }}
         >
           Apply
         </button>
         
       </div>
     </form>
   </DialogContent>
 </Dialog>
              
        
   
    
    </div>
    </>
  );
}

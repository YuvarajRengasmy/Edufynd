import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { getallClient, deleteClient } from "../../api/client";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";

import Mastersidebar from "../../compoents/sidebar";

import { toast } from "react-toastify";


const Client = ({clients}) => {
 
  const [client, setClient] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });



  useEffect(() => {

    getClientList();
  }, []);



  const getClientList = () => {
    getallClient()
      .then((res) => {
        const value = res?.data?.result;
        setClient(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteClientData = () => {
    deleteClient(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getClientList();
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

          

           
              
                <div className="content-header">
                  <div className="container">
                  <div className="row">
                  <div className="col-xl-12">
                  <ol className="breadcrumb d-flex flex-row align-items-center justify-content-end">
                    <li className="flex-grow-1">
                      <div className="input-group" style={{ maxWidth: "600px" }}>
                        <input
                          type="search"
                          placeholder="Search..."
                          aria-describedby="button-addon3"
                          className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                          style={{
                            borderColor: "#FE5722",
                            paddingRight: "1.5rem",
                            marginLeft: "0px",
                            fontSize: "12px", // Keep the font size if it's correct
                            height: "11px", // Set the height to 11px
                            padding: "0px" // Adjust padding to fit the height
                          }}
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
                   

                  </ol>
                  </div>
                  </div>

                  </div>
                 
                </div>


              <div className="content-body">
                <div className="container">
                <div className="row">
              <div className="col-xl-12">
                <div className="card  border-0 rounded-0">
                  <div className="card-body">
                    <div className="card-table">
                      <div className="table-responsive">

                        <table className=" table   card-table table-hover  dataTable text-center" style={{ color: '#9265cc', fontSize: '12px' }} ref={tableRef}>
                          <thead class="table-light">
                            <tr style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                              <th className="text-capitalize text-start sortable-handle">S No</th>
                              <th className="text-capitalize text-start sortable-handle">Client Code</th>
                              <th className="text-capitalize text-start sortable-handle">Type of Client</th>
                              <th className="text-capitalize text-start sortable-handle">Client Name</th>
                              <th className="text-capitalize text-start sortable-handle">Primary No</th>
                              <th className="text-capitalize text-start sortable-handle">Email ID</th>
                              <th className="text-capitalize text-start sortable-handle">Status</th>
                              <th className="text-capitalize text-start sortable-handle">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                            {client?.map((data, index) => (
                              <tr key={index} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                                <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                                <td className="text-capitalize text-start">{data?.clientID}</td>
                                <td className="text-capitalize text-start">{data?.typeOfClient}</td>
                                <td className="text-capitalize text-start">{data?.businessName}</td>
                                <td className="text-capitalize text-start">{data?.businessContactNo}</td>
                                <td className=" text-start">{data?.businessMailID}</td>
                                <td className="text-capitalize text-start">{data?.status}</td>
                                <td>
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/ViewClient",
                                        search: `?id=${data?._id}`,
                                      }}
                                      data-bs-toggle="tooltip"
                                      title="View"
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>

                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/EditClient",
                                        search: `?id=${data?._id}`,
                                      }}
                                      data-bs-toggle="tooltip"
                                      title="Edit"
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>

                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      onClick={() => {
                                        openPopup(data?._id);
                                      }}
                                      data-bs-toggle="tooltip"
                                      title="Delete"
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
                    
                  </div>
                </div>
              </div>
            </div>
                </div>
             
              </div>
           
           
          


        </div>
        <Dialog open={open}>
          <DialogContent>
            <div className="text-center p-4">
              <h5 className="mb-4 text-capitalize">
                Are you sure you want to Delete <br /> the selected Client ?
              </h5>
              <button
                type="button"
                className="btn btn-save btn-success px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase mx-3"
                onClick={deleteClientData}
                style={{ fontSize: '12px' }}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-cancel  btn-danger px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase border-0 "
                onClick={closePopup}
                style={{ fontSize: '12px' }}
              >
                No
              </button>
            </div>
          </DialogContent>
        </Dialog>
       
      </div>
    </>
  );
}
export default Client;

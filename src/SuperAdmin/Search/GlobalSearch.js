import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { getallClient, deleteClient } from "../../api/client";
import { Link, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import Masterheader from "../../compoents/header";
import { getSuperAdminForSearch } from '../../api/superAdmin';
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";

export default function Masterproductlist() {
  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessMailID: "",
    businessContactNo: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    name: "",
    contactNo: "",
    emailID: "",
    gstn: "",
    status: "",
  };

  const [client, setClient] = useState([]);
  const location = useLocation();
  const searchValue = location.state || '';
  const [link ,setLink] = useState('');
  const [data, setData] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const pageSize = 10;
  const search = useRef(null);
  const [pagination, setPagination] = useState({ count: 0, from: 0, to: pageSize });

  useEffect(() => {
    getClientList();
  }, []);

  useEffect(() => {
    if (search.current) search.current.focus();
  }, []);

  useEffect(() => {
    if (searchValue) {
      search.current.value = searchValue.substring(1);
      handleSearch();
    }
  }, [searchValue]);

  const handleInputsearch = (event) => {
    if (event.key === 'Enter') {
      search.current.blur();
      handleSearch();
    }
  };

  const handleSearch = (event) => {
    const data = search.current.value;
    event?.preventDefault();
    getSuperAdminForSearch(data)
      .then(res => {
        const clientList = res?.data?.result?.clientList;
        setClient(clientList);
        const result = clientList.length ? 'clients' : '';
        setLink(result);
        setData(result === '' ? true : false);
      })
      .catch(err => console.log(err));
  };

  const getClientList = () => {
    getallClient()
      .then(res => setClient(res?.data?.result || []))
      .catch(err => console.log(err));
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setPagination(prev => ({ ...prev, from, to }));
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => setOpen(false);

  const deleteClientData = () => {
    deleteClient(deleteId)
      .then(res => {
        toast.success(res?.data?.message);
        closePopup();
        getClientList();
      })
      .catch(err => console.log(err));
  };

  const openFilterPopup = () => setOpenFilter(true);

  const closeFilterPopup = () => setOpenFilter(false);

  const handleInputs = (event) => {
    setClient(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const openImportPopup = () => setOpenImport(true);

  const closeImportPopup = () => setOpenImport(false);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const pdfDownload = (event) => {
    event?.preventDefault();
    getallClient(client)
      .then(res => {
        const result = res?.data?.result || [];
        const tablebody = [
          ["S.NO", "ClientId", "BusinessName", "BusinessMailID", "BusinessContactNo", "Status"].map(text => ({
            text,
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          }))
        ];
        result.forEach((element, index) => {
          tablebody.push([
            index + 1,
            element?.clientID ?? "-",
            element?.businessName ?? "-",
            element?.businessMailID ?? "-",
            element?.businessContactNo ?? "-",
            element?.status ?? "-",
          ].map(text => ({
            text,
            fontSize: 10,
            alignment: "left",
            margin: [5, 3],
            border: [true, false, true, true],
          })));
        });
        templatePdf("clientList", tablebody, "landscape");
      })
      .catch(err => console.log(err));
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallClient(client)
      .then(res => {
        const result = res?.data?.result || [];
        const list = result.map(res => ({
          clientID: res?.clientID ?? "-",
          businessName: res?.businessName ?? "-",
          businessMailID: res?.businessMailID ?? "-",
          businessContactNo: res?.businessContactNo ?? "-",
          status: res?.status ?? "-",
        }));
        const headers = ["clientID", "businessName", "businessMailID", "businessContactNo", "status"];
        const headersTranslated = ["Client Id", "Business Name", "Business MailID", "Business ContactNo", "Status"];
        ExportCsvService.downloadCsv(list, "clientList", "Client List", headers, headersTranslated);
      })
      .catch(err => console.log(err));
  };

  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;
    const sortable = new Sortable(table.querySelector('thead tr'), {
      animation: 150,
      swapThreshold: 0.5,
      handle: '.sortable-handle',
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        table.querySelectorAll('tbody tr').forEach(row => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      }
    });
    return () => sortable.destroy();
  }, []);

  return (
    <>
      <div>
        <Mastersidebar />
        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <ol className="breadcrumb d-flex flex-row align-items-center justify-content-end">
                    <form onSubmit={handleSearch}>
                      <li className="flex-grow-1">
                        <div className="input-group" style={{ maxWidth: "600px" }}>
                          <input
                            type="search"
                            placeholder="Search..."
                            aria-describedby="button-addon3"
                            ref={search}
                            onChange={handleInputsearch}
                            className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                          />
                          <button
                            className="btn btn-primary rounded-4 d-none"
                            type="submit"
                            id="button-addon3"
                          >
                            Search
                          </button>
                        </div>
                      </li>
                    </form>
                    <li className="breadcrumb-item">
                      <button className="btn btn-primary btn-sm" onClick={openImportPopup}>Import CSV</button>
                    </li>
                    <li className="breadcrumb-item">
                      <button className="btn btn-primary btn-sm" onClick={exportCsv}>Export CSV</button>
                    </li>
                    <li className="breadcrumb-item">
                      <button className="btn btn-primary btn-sm" onClick={pdfDownload}>Export PDF</button>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body table-responsive">
                      <table className="table table-bordered table-striped" ref={tableRef}>
                        <thead>
                          <tr>
                            <th className="sortable-handle">Client ID</th>
                            <th className="sortable-handle">Business Name</th>
                            <th className="sortable-handle">Business Mail ID</th>
                            <th className="sortable-handle">Business Contact No</th>
                            <th className="sortable-handle">Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {client.slice(pagination.from, pagination.to).map((item, index) => (
                            <tr key={item.clientID}>
                              <td>{item.clientID}</td>
                              <td>{item.businessName}</td>
                              <td>{item.businessMailID}</td>
                              <td>{item.businessContactNo}</td>
                              <td>{item.status}</td>
                              <td>
                                <IconButton onClick={() => openPopup(item.clientID)}>
                                  <i className="fas fa-trash-alt"></i>
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination
                        count={Math.ceil(client.length / pageSize)}
                        page={Math.floor(pagination.from / pageSize) + 1}
                        onChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={closePopup}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this client?</p>
            <button className="btn btn-danger" onClick={deleteClientData}>Delete</button>
            <button className="btn btn-secondary" onClick={closePopup}>Cancel</button>
          </DialogContent>
        </Dialog>
        <Dialog open={openFilter} onClose={closeFilterPopup}>
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSearch}>
              {/* Your filter form elements */}
              <button className="btn btn-primary" type="submit">Apply</button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={openImport} onClose={closeImportPopup}>
          <DialogTitle>Import CSV</DialogTitle>
          <DialogContent>
            <input type="file" onChange={handleFileChange} />
            <button className="btn btn-primary" onClick={() => {/* handle import */}}>Import</button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

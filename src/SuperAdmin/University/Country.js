import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getFilterNotification, deleteProgram, updatedNotifications } from "../../api/Notification/Notification";
import { Link } from "react-router-dom";
import { Dialog, Pagination } from "@mui/material";
import { formatDate } from "../../Utils/DateFormat";
import Mastersidebar from "../../compoents/sidebar";
import { toast } from "react-toastify";

export const ListNotifications = () => {
  const [notification, setnotification] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 0,
  });

  useEffect(() => {
    getAllClientDetails();
  }, [pagination.from, pagination.to]);

  const getAllClientDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterNotification(data)
      .then((res) => {
        setnotification(res?.data?.result?.notificationList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.notificationCount,
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

  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;
    const sortable = new Sortable(table.querySelector("thead tr"), {
      animation: 150,
      swapThreshold: 0.5,
      handle: ".sortable-handle",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        table.querySelectorAll("tbody tr").forEach((row) => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      },
    });
    return () => {
      sortable.destroy();
    };
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = notification.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      deleteSelectedNotifications();
    } else if (action === "Activate") {
      activateSelectedNotifications();
    }
  };

  const deleteSelectedNotifications = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteProgram(id)))
        .then((responses) => {
          toast.success("Notifications deleted successfully!");
          setSelectedIds([]);
          getAllClientDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete notifications.");
        });
    } else {
      toast.warning("No notifications selected.");
    }
  };

  const activateSelectedNotifications = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => updatedNotifications(id,{ active: true })))
        .then((responses) => {
          toast.success("Notifications activated successfully!");
          setSelectedIds([]);
          getAllClientDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate notifications.");
        });
    } else {
      toast.warning("No notifications selected.");
    }
  };

  return (
    <>
      <div>
        <Mastersidebar />
        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header bg-light shadow-sm sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <ol className="d-flex flex-row justify-content-end align-items-center w-100 list-unstyled mb-0">
                    {/* Add other buttons or filters here */}
                    <li className="m-1">
                      <Link className="btn btn-pix-primary" to="/add_notifications">
                        <button
                          className="btn btn-outline   fw-semibold rounded-1  border-0 text-white"
                          style={{ backgroundColor: "#231f20", fontSize: "12px" }}
                        >
                          <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>{" "}
                          Add Notifications
                        </button>
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="content-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card rounded-1 shadow-sm border-0">
                    <div className="card-header bg-white mb-0 mt-1 pb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex mb-0">
                          <p className="me-auto">
                            Change
                            <select
                              className="form-select form-select-sm rounded-1 d-inline mx-2"
                              aria-label="Default select example1"
                              style={{
                                width: "auto",
                                display: "inline-block",
                                fontSize: "12px",
                              }}
                              onChange={handleActionChange}
                            >
                              <option value="">Select Action</option>
                              <option value="Activate">Activate</option>
                              <option value="Delete">Delete</option>
                            </select>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="card-table">
                        <div className="table-responsive">
                          <table
                            className="table table-hover card-table dataTable text-center"
                            style={{ color: "#9265cc", fontSize: "12px" }}
                            ref={tableRef}
                          >
                            <thead className="table-light">
                              <tr
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <th className="text-start">
                                  <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === notification.length
                                    }
                                  />
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  S No
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Date
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  TypeOfUser
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Subject
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {notification?.map((data, index) => (
                                <tr
                                  key={index}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "11px",
                                  }}
                                >
                                  <td className="text-start">
                                    <input
                                      type="checkbox"
                                      checked={selectedIds.includes(data._id)}
                                      onChange={() => handleCheckboxChange(data._id)}
                                    />
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {pagination.from + index + 1}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {formatDate(
                                      data?.createdOn
                                        ? data?.createdOn
                                        : data?.modifiedOn
                                        ? data?.modifiedOn
                                        : "-"
                                    ) || "Not Available"}{" "}
                                    <small>Timer</small>
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.typeOfUser || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.subject || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                      <Link to={`/edit_notifications/${data._id}`}>
                                        <button className="btn btn-light btn-sm border-0 rounded-1">
                                          <i
                                            className="fa fa-pencil"
                                            style={{ color: "#ff6200" }}
                                          ></i>
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Pagination
                            count={Math.ceil(pagination.count / pageSize)}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                            size="small"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Dialog open={open} onClose={() => setOpen(false)}>
                  <div className="dialog-content">
                    <h5>Are you sure you want to delete?</h5>
                    <button
                      className="btn btn-primary"
                      onClick={deleteSelectedNotifications}
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListNotifications;
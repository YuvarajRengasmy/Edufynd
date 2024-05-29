import React, { useState } from 'react';
import { Link } from "react-router-dom";

const UniversityTable = ({ university, pagination, openPopup }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getDisplayText = (text, expanded) => {
    const words = text.split(' ');
    return expanded ? text : words.slice(0, 2).join(' ') + (words.length > 2 ? '...' : '');
  };

  return (
    <table className="table card-table dataTable text-center">
      <thead>
        <tr style={{ color: "#9265cc", fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
          <th className="text-capitalize text-start">S No</th>
          <th className="text-capitalize text-start">Client Name</th>
          <th className="text-capitalize text-start">University Name</th>
          <th className="text-capitalize text-start">Campus</th>
          <th className="text-capitalize text-start">Average Fees</th>
          <th className="text-capitalize text-start">Popular Categories</th>
          <th className="text-capitalize text-start">Country</th>
          <th className="text-capitalize text-start">Action</th>
        </tr>
      </thead>
      <tbody>
        {university?.map((data, index) => {
          const isExpanded = !!expandedRows[index];
          return (
            <tr key={index} style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
              <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
              <td className="text-capitalize text-start">{data?.businessName}</td>
              <td className="text-capitalize text-start">{data?.universityName}</td>
              <td className="text-capitalize text-start">{data?.campus}</td>
              <td className="text-capitalize text-start">{data?.averageFees}</td>
              <td className="text-capitalize text-start">
                {getDisplayText(data?.popularCategories?.join(", "), isExpanded)}
                {data?.popularCategories?.join(", ").split(' ').length > 2 && (
                  <button onClick={() => toggleRow(index)} className="btn btn-link p-0">
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </td>
              <td className="text-capitalize text-start">{data?.country}</td>
              <td>
                <div className="d-flex">
                  <Link
                    className="dropdown-item"
                    to={{
                      pathname: "/ViewUniversity",
                      search: `?id=${data?._id}`,
                    }}
                  >
                    <i className="far fa-eye text-primary me-1"></i>
                  </Link>
                  <Link
                    className="dropdown-item"
                    to={{
                      pathname: "/EditUniversity",
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
          );
        })}
      </tbody>
    </table>
  );
};

export default UniversityTable;

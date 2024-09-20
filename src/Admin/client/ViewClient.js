import { useState, useEffect, useCallback, useRef } from "react";
import { getSingleClient } from "../../api/client";
import { useLocation } from "react-router-dom";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import Sidebar from "../../compoents/AdminSidebar";
import BackButton from "../../compoents/backButton";
const ItemTypes = {
  ROW: "row",
};

const DraggableRow = ({ index, id, moveRow, label, value }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item) {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td className="fw-bold">{label}</td>
      <td>
        {label === "Passport Document" || label === "Offer Letter" ? (
          <a
            href={value}
            download={`${label.replace(" ", "")}.pdf`}
            className="btn btn-sm btn-custom"
          >
            <i className="fa fa-download" aria-hidden="true"></i> Download
          </a>
        ) : (
          value
        )}
      </td>
    </tr>
  );
};

const AddAgent = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [client, setClient] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getClientDetails();
  }, []);

  const getClientDetails = async () => {
    try {
      const res = await getSingleClient(id);
      const clientData = res?.data?.result;

      setClient(clientData);
      setRows([
        { id: 1, label: "Client ID", value: clientData?.clientID || "Not Available" },
        { id: 2, label: "Type of client", value: clientData?.typeOfClient || "Not Available" },
        { id: 3, label: "Business Name", value: clientData?.businessName || "Not Available" },
        { id: 4, label: "Business Mail ID", value: clientData?.businessMailID || "Not Available" },
        {
          id: 5,
          label: "Business Contact No",
          value: clientData?.businessContactNo || "Not Available"
        },
        { id: 6, label: "whatsAppNumber", value:clientData?.whatsAppNumber || "Not Available" },
        { id: 6, label: "Website", value: clientData?.website || "Not Available" },
        { id: 7, label: "Staff Name", value: clientData?.name || "Not Available" },
        { id: 8, label: "Staff Contact No", value: clientData?.contactNo || "Not Available" },
        { id: 9, label: "Staff Email ID", value: clientData?.emailID  || "Not Available"},
        { id: 10, label: "Address Line 1", value: clientData?.addressLine1 || "Not Available" },
        { id: 10, label: "Address Line 2", value: clientData?.addressLine2 || "Not Available" },
        { id: 10, label: "Pincode", value: clientData?.addressLine3 || "Not Available" },
        { id: 11, label: "city", value: clientData?.lga || "Not Available" },
        { id: 12, label: "State", value: clientData?.state || "Not Available" },
        { id: 13, label: "Country", value: clientData?.country || "Not Available" },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedRow = rows[dragIndex];
      setRows(
        update(rows, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedRow],
          ],
        })
      );
    },
    [rows]
  );

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Sidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header text-end">

        <BackButton/>
        
        </div>
        <div className="container-fluid mt-3">
            <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h6 className="text-center text-capitalize p-1">
                  View Client Details
                </h6>
              </div>
              <div className="card-body">
                <table
                  className="table table-hover table-bordered table-striped-columns mt-5"
                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                >
                  <tbody>
                    {rows.map((row, index) => (
                      <DraggableRow
                        key={row.id}
                        index={index}
                        id={row.id}
                        moveRow={moveRow}
                        label={row.label}
                        value={row.value}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            
            </div>
          </div>

        <div className="container-fluid my-2">
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        
        <li className="mb-4 position-relative">
          <div className="row align-items-start g-0">

          <div className="col-1 d-flex justify-content-center align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                <i className="fas fa-check" />
              </div>
            </div>
            <div className="col-4 text-center">
              <p className="mb-1 fw-semibold text-muted">23 August, 2023 10:30 AM</p>
              <p className="mb-0 text-muted">Changed by:<strong>John Doe</strong></p>
            </div>
           
            <div className="col-7">
            <div className="mb-3">
              
              <div className="bg-success text-white rounded-3 p-2">
                <h6 className="mb-1">New University Name</h6>
                <p className="mb-0">University Y</p>
              </div>
            </div>
              <div className="mb-3">
             
                <div className="bg-danger text-white rounded-3 p-2">
                  <h6 className="mb-1">Old University Name</h6>
                  <p className="mb-0">University X</p>
                </div>
              </div>
           
            </div>
          </div>
          <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
        </li>
       
      </ul>
    </div>
  </div>
</div>

      </div>
    </DndProvider>

    </>
  );
};

export default AddAgent;

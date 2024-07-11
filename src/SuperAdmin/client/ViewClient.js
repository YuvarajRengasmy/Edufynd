import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Sidebar from "../../compoents/sidebar";

const ItemTypes = {
    ROW: 'row',
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
            <td className='fw-bold'>{label}</td>
            <td>{label === 'Passport Document' || label === 'Offer Letter' ? (
                <a href={value} download={`${label.replace(' ', '')}.pdf`} className="btn btn-sm btn-custom">
                    <i className="fa fa-download" aria-hidden="true"></i> Download
                </a>
            ) : value}
            </td>
        </tr>
    );
};

const AddAgent = () => {
    const [rows, setRows] = useState([
        { id: 1, label: 'Client ID', value: '' },
        { id: 2, label: 'Type of client', value: '' },
        { id: 3, label: 'Business Name', value: '' },
        { id: 4, label: 'Business Mail ID', value: '' },
        { id: 5, label: 'Business Contact No', value: '' },
        { id: 6, label: 'Website', value: '' },
        { id: 7, label: 'Staff Name', value: '' },
        { id: 8, label: 'Staff Contact No', value: '' },
        { id: 9, label: 'Staff Email ID', value: '' },
        { id: 10, label: 'Address', value: '' },
        { id: 11, label: 'GSTN', value: '' },
        { id: 12, label: 'Status', value: '' },
        { id: 13, label: 'Passport Document', value: '' },
        { id: 14, label: 'Offer Letter', value: '' },
    ]);

    useEffect(() => {
        // Replace this with your actual data fetching logic
        const fetchData = async () => {
            // Simulating data fetch
            const fetchedData = {
                clientId: '12345',
                clientType: 'Business',
                businessName: 'Example Business',
                businessMail: 'example@business.com',
                businessContact: '+1234567890',
                website: 'www.example.com',
                staffName: 'John Doe',
                staffContact: '+0987654321',
                staffEmail: 'john.doe@example.com',
                address: '123 Business Street',
                gstn: 'GST123456',
                status: 'Active',
                passportDoc: 'path/to/passport.pdf',
                offerLetter: 'path/to/offerletter.pdf'
            };

            setRows([
                { id: 1, label: 'Client ID', value: fetchedData.clientId },
                { id: 2, label: 'Type of client', value: fetchedData.clientType },
                { id: 3, label: 'Business Name', value: fetchedData.businessName },
                { id: 4, label: 'Business Mail ID', value: fetchedData.businessMail },
                { id: 5, label: 'Business Contact No', value: fetchedData.businessContact },
                { id: 6, label: 'Website', value: fetchedData.website },
                { id: 7, label: 'Staff Name', value: fetchedData.staffName },
                { id: 8, label: 'Staff Contact No', value: fetchedData.staffContact },
                { id: 9, label: 'Staff Email ID', value: fetchedData.staffEmail },
                { id: 10, label: 'Address', value: fetchedData.address },
                { id: 11, label: 'GSTN', value: fetchedData.gstn },
                { id: 12, label: 'Status', value: fetchedData.status },
                { id: 13, label: 'Passport Document', value: fetchedData.passportDoc },
                { id: 14, label: 'Offer Letter', value: fetchedData.offerLetter },
            ]);
        };

        fetchData();
    }, []);

    const moveRow = useCallback((dragIndex, hoverIndex) => {
        const draggedRow = rows[dragIndex];
        setRows(update(rows, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, draggedRow],
            ],
        }));
    }, [rows]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="container-fluid">
                    <nav className="navbar navbar-vertical navbar-expand-lg">
                        <Sidebar />
                    </nav>
                    <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                                    <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                                        <h6 className='text-center text-capitalize p-1'>View Client Details</h6>
                                    </div>
                                    <div className="card-body">
                                        <table className='table table-hover table-bordered table-striped-columns mt-5' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <DraggableRow key={row.id} index={index} id={row.id} moveRow={moveRow} label={row.label} value={row.value} />
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
        </DndProvider>
    );
};

export default AddAgent;

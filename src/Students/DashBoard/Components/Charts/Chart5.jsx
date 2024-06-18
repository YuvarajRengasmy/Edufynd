import React from 'react';
import { FaCaretDown } from "react-icons/fa";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Chart5 = () => {
    const data = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
    ];

    return (
        <div className="col-md-12 mt-3">
            <div className="card shadow-lg  one border-0 rounded-5 px-4 py-1" style={{height:'17rem'}}>
                <div className="card-body">
                <div className="float-end">
                        <div className="dropdown">
                            <button className="btn btn-light rounded-4 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Monthly <FaCaretDown />
                            </button>
                            <ul className="dropdown-menu">
                                <li key="daily"><a className="dropdown-item" href="#">Daily</a></li>
                                <li key="weekly"><a className="dropdown-item" href="#">Weekly</a></li>
                                <li key="monthly"><a className="dropdown-item" href="#">Monthly</a></li>
                                <li key="yearly"><a className="dropdown-item" href="#">Yearly</a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="card-title text-muted fw-semibold">My Balance</p>
               
                    <p className="fs-5 fw-semibold three">$17,754.00</p>
                    <div className="charts">
                        <ResponsiveContainer width="100%" height={150}>
                            <ScatterChart
                                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            >
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                                <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="A school" data={data} fill="#8884d8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart5;

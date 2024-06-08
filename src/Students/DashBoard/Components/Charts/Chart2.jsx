import React from 'react';
import { FaCaretDown } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Chart2 = () => {
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
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
                                <li><a className="dropdown-item" href="#">Daily</a></li>
                                <li><a className="dropdown-item" href="#">Weekly</a></li>
                                <li><a className="dropdown-item" href="#">Monthly</a></li>
                                <li><a className="dropdown-item" href="#">Yearly</a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="card-title text-muted fw-semibold">My Balance</p>
                
                    <p className="fs-5 fw-semibold three">$17,754.00</p>
                    <div className="charts">
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart2;

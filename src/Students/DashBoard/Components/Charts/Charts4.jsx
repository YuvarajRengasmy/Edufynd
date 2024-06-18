import React, { PureComponent } from 'react';
import { FaCaretDown } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

class Charts4 extends PureComponent {
    render() {
        const data = [
            { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
            { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
            { name: 'Page C', uv: -1000, pv: 9800, amt: 2290 },
            { name: 'Page D', uv: 500, pv: 3908, amt: 2000 },
            { name: 'Page E', uv: -2000, pv: 4800, amt: 2181 },
            { name: 'Page F', uv: -250, pv: 3800, amt: 2500 },
            { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
        ];

        const gradientOffset = () => {
            const dataMax = Math.max(...data.map((i) => i.uv));
            const dataMin = Math.min(...data.map((i) => i.uv));

            if (dataMax <= 0) {
                return 0;
            }
            if (dataMin >= 0) {
                return 1;
            }

            return dataMax / (dataMax - dataMin);
        };

        const off = gradientOffset();

        return (
            <div className="col-md-12 mt-2">
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
                                <AreaChart
                                    data={data}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <defs>
                                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={off} stopColor="green" stopOpacity={1} />
                                            <stop offset={off} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Charts4;

import React from 'react';
import { FaCaretDown } from "react-icons/fa";
import { PieChart, Pie } from "recharts";

const Chart3 = () => {
   
    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
        { name: "Group E", value: 278 },
        { name: "Group F", value: 189 }
      ];
    return (
        <div className="col-md-12 mt-2">
            <div className="card shadow-lg  one border-0 rounded-5 px-4 py-1" style={{height:'17rem'}} >
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
                    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={180}
        cy={110}
        outerRadius={80}
        fill="#8884d8"
        label
      />
    </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart3;

import { CiLinkedin } from 'react-icons/ci'
import { RiCoinsFill } from 'react-icons/ri'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const UserDetails = () => { 
    return (
        <div className='container'>
            <div className='card shadow border-0 p-3'>
                <div className="mb-2 ">
                            <img src={'https://universitystudy.ca/wp-content/uploads/2022/08/Campus_UBC_Vancouver_Aerial.png'} className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '6rem', objectFit: 'cover' }} />
                            <div className="position-absolute top-55 start-50 translate-middle">
                            <img src= {"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} className="rounded-circle img-fluid mx-auto" alt="profileImage" style={{ width: '7rem', height: '7rem', objectFit: 'cover' }} />
                            </div>
                        </div>
                <span className='text-center mt-5' style={{ fontSize: "25px", fontWeight: "500" }}>International Language Academy of Canada (ILAC) - Vancouver</span>
                <p className='text-center text-secondary mt-2'>Vancouver, British Columbia, CA</p>
                <div className='card shadow border-1 rounded p-3 mt-3 mb-3'>
                    <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>UniverSity Rank: <span><RiCoinsFill className='text-warning fs-4' /> 1</span> </span>
                </div>
                <div>
                    <span className='text-secondary fw-bolder'>SOCIAL LINKS</span>
                    <div className='d-flex align-items-center gap-2 mt-2'>
                        <Link to="/"  className='text-decoration-none d-flex align-items-center text-secondary' style={{ fontSize: "12px" }}><CiLinkedin className='fs-4 text-dark '/> edufund</Link> 
                    </div>
                </div>
                <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
                    <div className='card-body'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <span className='fs-5' style={{ fontWeight: "500" }}>Institution Details</span>     
                        </div>
                        <div className=''>
                            <p className='text-secondary mt-2'>Founded:- 1970</p>
                            <p className='text-secondary mt-2'>School Id:- 154 </p>
                            <p className='text-secondary mt-2'>DLI Nuber:- 019319227442</p>
                            <p className='text-secondary mt-2'>Institution type:- Private </p>
                        </div>
                    </div>
                </div>
                <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
                    <div className='card-body'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <span className='fs-5' style={{ fontWeight: "500" }}>Cost and Duration</span>
                        </div>
                        <div className=''>
                            <p className='text-secondary mt-2'>Application fee:- $100 </p>
                            <p className='text-secondary mt-2'>Average graduate program:- No data available</p>
                            <p className='text-secondary mt-2'>Average undergraduate program:- No data available</p>
                            <p className='text-secondary mt-2'>Cost of living:- $20,635.00 CAD / Year </p>
                            <p className='text-secondary mt-2'>Gross tuition:- $8,740.45 CAD / Year </p>
                        </div>
                    </div>
                </div>
                <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
                    <div className='card-body'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <span className='fs-5' style={{ fontWeight: "500" }}>Average Time to Receive Letter of Acceptance</span>
                        </div>
                        <div className=''>
                            <p className='text-secondary mt-2'>January - April:- Under 15 days </p>
                            <p className='text-secondary mt-2'>May - August:- Under 15 days</p>
                            <p className='text-secondary mt-2'>September - December:- Under 15 days</p>                     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserDetails;
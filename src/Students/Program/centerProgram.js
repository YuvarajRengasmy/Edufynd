import React, { useEffect, useRef, useState } from 'react'

import { MdOutlineDateRange } from 'react-icons/md'
import { RiSchoolLine, RiFileTextLine, RiBookmark3Fill, RiBuilding2Fill } from 'react-icons/ri';
import { AiOutlineRead } from 'react-icons/ai'
import { LiaBookSolid } from 'react-icons/lia';
import { LuClipboardList } from 'react-icons/lu';




const UserExperience = () => {

    return (
        <>
            <div className='container'>
                <div className="mb-2 ">
                    <img src={'https://universitystudy.ca/wp-content/uploads/2022/08/Campus_UBC_Vancouver_Aerial.png'} className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '6rem', objectFit: 'cover' }} />
                </div>
                <div class="card single-job-items ">
                    <div class="card-body job-items d-flex align-items-center">
                        <div class="company-img mr-3">
                            <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
                        </div>
                        <div class="job-tittle job-tittle2">
                            <a href="/">
                                <h3 class="card-title font-weight-bold fs-5">General English - Intensive English Program (30 lessons/week)</h3>
                                <h3 class="card-title font-weight-bold fs-5"><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</h3>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='fw-bold mt-2'>  <RiSchoolLine /> :- About</h4>
                    <div className='container card my-2 px-4'>

                        <p>The International Language Academy of Canada (ILAC) is very diverse, and there are students from over 75 countries. The ambassadors speak over 40 languages and ensure the best possible experience at ILAC. ILAC has modern, boutique style facilities in Toronto and Vancouver, two of the cities to live in the world according to UNESCO. </p>
                    </div>
                </div>
                <br />
                <div>
                    <h4 className='fw-bold mt-2'> <RiFileTextLine color="purple" />  :-Program Features</h4>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Check Your Eligibility</h5>
                            <div className="accordion accordion-flush" id="faq-group-2">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" data-bs-target="#faqsTwo-1" type="button" data-bs-toggle="collapse">
                                            Program Summary
                                        </button>
                                    </h2>
                                    <div id="faqsTwo-1" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                                        <div className="accordion-body">
                                            Study English Online with ILAC KISS - Live from Toronto & Vancouver, Canada

                                            Students can study English online at one of the most awarded language schools in the world.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" data-bs-target="#faqsTwo-2" type="button" data-bs-toggle="collapse">
                                            Flexible Schedules
                                        </button>
                                    </h2>
                                    <div id="faqsTwo-2" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                                        <div className="accordion-body">
                                            Online English classes tailored for every time zone, everywhere. Learn in the comfort of your own home.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" data-bs-target="#faqsTwo-3" type="button" data-bs-toggle="collapse">
                                            Award Winning
                                        </button>
                                    </h2>
                                    <div id="faqsTwo-3" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                                        <div className="accordion-body">
                                            Every year ILAC wins awards from around the world that recognize our commitment to excellence.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" data-bs-target="#faqsTwo-4" type="button" data-bs-toggle="collapse">
                                            Diversity
                                        </button>
                                    </h2>
                                    <div id="faqsTwo-4" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                                        <div className="accordion-body">
                                            ILAC is one of the most diverse language schools in the world. Students come from over 90 countries.
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='container card my-2 px-4'>
                    <div className='row row-cols-1 row-cols-md-3'>
                        <h4 className='fw-bold text-secondary col'> <RiBuilding2Fill /> Institute  <span className='fw-lighter d-block text-primary'>ANNA University </span></h4>
                        <h4 className='fw-bold text-secondary col'><LiaBookSolid /> Qualification <span className='fw-lighter d-block text-primary'>MSC </span></h4>
                        <h4 className='fw-bold text-secondary col'>  <AiOutlineRead /> Field Of Study <span className='fw-lighter d-block text-primary'>Computer </span></h4>
                        <h4 className='fw-bold text-secondary col'> <RiBookmark3Fill />  Grade/Percentage <span className='fw-lighter d-block text-primary'>65% </span></h4>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary mt-3 btn-lg justify-content-center col-center">Apply Now</button>
        </>
    )
}
export default UserExperience;
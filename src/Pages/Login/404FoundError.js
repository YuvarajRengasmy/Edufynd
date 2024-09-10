// src/pages/NotFound.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an icon from react-icons

const NotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="alert alert-danger d-flex align-items-center justify-content-center mb-4" role="alert">
                    <FaExclamationTriangle size={50} className="me-3" />
                    <div>
                        <h4 className="alert-heading mb-0">404 Not Found</h4>
                        <p className="mb-0">Sorry, the page you are looking for does not exist.</p>
                    </div>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h1 className="display-1 fw-bold">404</h1>
                        <h2 className="display-4">Oops!</h2>
                        <p className="lead">We can't seem to find the page you're looking for.</p>
                        <a href="/" className="btn btn-primary btn-lg">Go Back Home</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

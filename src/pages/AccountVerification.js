import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import MainHead from "../components/MainHead";
import Navbar from "../components/Navbar";
import { useParams, useLocation } from "react-router-dom";

const AccountVerification = () => {
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const verifyToken = async () => {
      try {
        console.log(`Verifying token: ${token}`);
        const response = await axios.post(
          `/Account/verify-token?token=${encodeURIComponent(token)}`
        );
        console.log("Server response:", response.data);
        if (response.data.success) {
          setVerified(true);
          setError(null);
        } else {
          setError("Verification Failed!");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setError("Verification Failed!");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [location.search]);

  return (
    <div>
      <MainHead />
      <body className="sign-in-basic">
        <div className="container position-sticky z-index-sticky top-0">
          <div className="row">
            <div className="col-12">
              <Navbar />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="card card-body ">
          <div className="container">
            <div className="row">
              {verified && (
                <div className="alert alert-info text-white" role="alert">
                  <strong>Verified!</strong> Please log in again.
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-white" role="alert">
                  <strong>{error}</strong> Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default AccountVerification;

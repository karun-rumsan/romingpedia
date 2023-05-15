import { MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login");
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "240px",
      }}
    >
      <MDBCard className="shadow-3-strong d-flex justify-content-center">
        <MDBCardBody>
          <MDBTypography color="primary" blockquote>
            Redirecting you in {count} second
          </MDBTypography>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default LoadingToRedirect;

import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBFooter,
  MDBSpinner,
  MDBIcon,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/feature/authslice";
// import { googleSignIn, login } from "../redux/feature/authslice";
// import { GoogleLogin } from "react-google-login";
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  // const devEnv = process.env.NODE_ENV !== "production";

  // const clientID = devEnv
  //   ? "873553078059-tqhqgf7co0tl73mpbl2dnuq6dl49m4i7.apps.googleusercontent.com"
  //   : "873553078059-h54f4pm4mo8jrsm6ou6e0vhj3qh0epdg.apps.googleusercontent.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // const googleSuccess = (res) => {
  //   console.log("login success", res.profileObj);
  //   const email = res?.profileObj?.email;
  //   const name = res?.profileObj?.name;
  //   const token = res?.tokenId;
  //   const googleId = res?.googleId;
  //   const result = { email, name, token, googleId };

  //   dispatch(googleSignIn({ result, navigate, toast }));
  // };
  // const googleFailure = (error) => {
  //   toast.error(error);
  // };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alingment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your email"
              invalid
            >
              <MDBInput
                label="Your email"
                type="email"
                value={email}
                onChange={onInputChange}
                required
                // validation="Please provide your email"
                name="email"
                // invalid="true"
              />
            </MDBValidationItem>

            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your password"
              invalid
            >
              <MDBInput
                label="Your password"
                type="password"
                value={password}
                onChange={onInputChange}
                required
                // validation="Please provide your password"
                name="password"
                // invalid="true"
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-12"
                color="primary"
              >
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          {/* <div className="mt-3">
            <GoogleLogin
              clientId={clientID}
              render={(renderProps) => (
                <MDBBtn
                  style={{ width: "100%" }}
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled
                >
                  <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                </MDBBtn>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div> */}
        </MDBCardBody>
        <MDBFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBFooter>
      </MDBCard>
    </div>
  );
};

export default Login;

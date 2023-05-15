import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
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
import { register } from "../redux/feature/authslice";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "550px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alingment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              className="col-md-6"
              feedback="Please provide your first name"
              invalid
            >
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                onChange={onInputChange}
                required
                // validation="Please provide your first name"
                name="firstName"
                // invalid="true"
              />
            </MDBValidationItem>

            <MDBValidationItem
              className="col-md-6"
              feedback="Please provide your last name"
              invalid
            >
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                onChange={onInputChange}
                required
                // validation="Please provide your last name"
                name="lastName"
                // invalid="true"
              />
            </MDBValidationItem>

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
            <MDBValidationItem
              className="col-md-12"
              feedback="Please confirm your password"
              invalid
            >
              <MDBInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={onInputChange}
                required
                // validation="Please confirm your password"
                name="confirmPassword"
                // invalid="true"
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-12"
                color="danger"
              >
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBFooter>
      </MDBCard>
    </div>
  );
};

export default Register;

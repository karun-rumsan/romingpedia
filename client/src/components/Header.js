import React, { useState } from "react";
import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../redux/feature/authslice";
import { getTours, searchTours } from "../redux/feature/tourSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = user?.token;
  const logOut = () => {
    dispatch(setLogOut());
  };
  const loogedIn = user?.result?.name;

  let firstChar = loogedIn?.charAt(0) + loogedIn?.slice(1);

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tour/search?searchQuery=${search}`);
      setSearch("");
    } else {
      dispatch(getTours());
      navigate("/");
    }
  };

  if (token) {
    const decoded = decode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      dispatch(setLogOut());
    }
  }

  return (
    <MDBNavbar
      fixed="top"
      expand="lg"
      style={{ backgroundColor: "#f0e6ea", marginBottom: "2.5rem" }}
    >
      <MDBContainer>
        <MDBNavbarBrand
          style={{
            color: "#606080",
            fontWeight: "600",
            fontSize: "22px",
          }}
        >
          GhumnePedia
        </MDBNavbarBrand>
        {/* <small className="" style={{ margin: "auto" }}>
            {`${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`}
          </small> */}

        <MDBNavbarToggler
          type="button"
          onClick={() => setShow(!show)}
          aria-expanded="false"
          style={{
            color: "#606080",
          }}
          aria-label="Toogle navigation"
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user && (
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <MDBBtn
                    size="sm"
                    style={{
                      alignContent: "center",
                      marginTop: "6px",
                    }}
                    color="info"
                  >
                    {firstChar}
                  </MDBBtn>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
            {/* <img className="img-fluid" src={firstChar} alt="dsda" /> */}

            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addtour">
                    <p className="header-text">AddTour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text" onClick={logOut}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>

          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <MDBInputGroup
              textBefore={<MDBIcon fas icon="search" />}
              className="mb-2"
            >
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </MDBInputGroup>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;

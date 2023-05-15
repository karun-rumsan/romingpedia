import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { deleteTour, getToursByUser } from "../redux/feature/tourSlice";

const Dashboard = () => {
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const userId = user?.result._id;
  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId, dispatch]);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "1200px",
        alignContent: "center",
      }}
    >
      <MDBTypography
        noteColor="primary"
        variant="h4"
        color="body"
        className="text-center shadow-2-strong"
      >
        {!userTours
          ? `Dashboard:${user?.result?.name.toUpperCase()}`
          : `No Tour Available yet ${user?.result?.name.toUpperCase()}`}
      </MDBTypography>

      {userTours?.map((item) => (
        <MDBCardGroup key={item._id} className="d-flex justify-content-center">
          <MDBCard
            style={{ maxWidth: "600px" }}
            className="mt-3 p-2 shadow-2-strong"
          >
            <MDBRow className="g-1">
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded m-3"
                  src={item.imageFile}
                  alt={item.title}
                  style={{
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    <small className="text-muted">
                      {excerpt(item.description)}
                    </small>
                  </MDBCardText>
                  <div
                    style={{
                      marginLeft: "5px",
                      float: "right",
                      marginTop: "-60px",
                    }}
                  >
                    <MDBBtn className="mt-1" tag="a" color="none">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                        onClick={() => handleDelete(item._id)}
                      />
                    </MDBBtn>
                    <Link to={`/editTour/${item._id}`}>
                      <MDBIcon
                        fas
                        icon="edit"
                        style={{ color: "#55acee", marginLeft: "10px" }}
                        size="lg"
                      />
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </div>
  );
};

export default Dashboard;

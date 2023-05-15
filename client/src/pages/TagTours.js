import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBCardBody,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { tagTours } from "../redux/feature/tourSlice";
import { excerpt } from "../utils";
import Spinner from "../components/Spinner";

const TagTours = () => {
  const { tTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();
  useEffect(() => {
    if (tag) {
      dispatch(tagTours(tag));
    }
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Tours with tag:{tag}</h3>
      <hr style={{ maxWidth: "600px" }} />
      {tTours &&
        tTours.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard
              style={{ maxWidth: "600px" }}
              background="dark mb-3"
              className="text-white"
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    style={{ maxWidth: "100%", height: "180px" }}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText>{excerpt(item.description, 40)}</MDBCardText>
                    <div style={{ float: "right", margin: "-10px" }}>
                      <MDBBtn
                        rounded
                        color="info"
                        onClick={() => navigate(`/tour/${item._id}`)}
                      >
                        Read More
                      </MDBBtn>
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

export default TagTours;

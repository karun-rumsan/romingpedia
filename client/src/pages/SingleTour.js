import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardImage,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getRelatedTours, getTour } from "../redux/feature/tourSlice";
import Spinner from "../components/Spinner";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tour, loading, relatedTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const tags = tour?.tags;

  useEffect(
    () => {
      if (id) {
        dispatch(getTour(id));
      }
    },
    // eslint-disable-next-line
    [id]
  );

  console.log(tags);
  useEffect(
    () => {
      tags && dispatch(getRelatedTours(tags));
    },
    // eslint-disable-next-line
    [tags]
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MDBContainer>
        <MDBCard
          className="mb-3 mt-2 "
          // style={{
          //   margin: "auto",
          //   padding: "15px",
          //   marginTop: "120px",
          // }}
        >
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "500px" }}
            src={tour?.imageFile}
            alt={tour?.title}
          />
          <MDBCardBody>
            {/* <MDBCardTitle>{tour?.title}</MDBCardTitle> */}
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName text-muted">
                <strong>Created by: {tour?.name}</strong>
              </p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours tourId={id} relatedTours={relatedTours} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`tour/${id}`} />
      </MDBContainer>
    </>
  );
};

export default React.memo(SingleTour);

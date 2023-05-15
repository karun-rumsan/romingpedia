import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { tourLike } from "../redux/feature/tourSlice";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  name,
  _id,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const userId = user?.result?._id;
  const Likes = () => {
    return likes.find((l) => l === userId) ? (
      <>
        <MDBIcon fas icon="thumbs-up" color="success" />

        {likes.length > 2 ? (
          <MDBTooltip
            tag="a"
            title={`You and ${likes.length - 1} other people likes`}
          >
            {likes.length} Likes
          </MDBTooltip>
        ) : (
          `${likes.length} Like${likes.length > 1 ? "s" : ""}`
        )}
      </>
    ) : (
      <>
        <MDBIcon far icon="thumbs-up" color="secondary" />
        &nbsp;
        <MDBTooltip tag="a" title={` ${likes.length} other people likes`}>
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </MDBTooltip>
      </>
    );
  };

  const handleLike = () => {
    dispatch(tourLike({ _id }));
  };

  return (
    <MDBCardGroup key={_id}>
      <MDBCard
        background="dark"
        className="h-100 mt-2 d-sm-flex shadow-5-strong text-white"
        style={{ maxWidth: "20rem" }}
      >
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left text-warning">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>

        <span className="text-start tag-card">
          {tags.map((tag) => (
            <Link
              to={`/tour/tag/${tag}`}
              key={tag}
              style={{ float: "left" }}
              className="text-success"
            >
              #{tag}
            </Link>
          ))}

          <br />

          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            className="  m-2"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle
            className="text-start text-success"
            style={{ color: "Secondary" }}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </MDBCardTitle>

          <MDBCardText className="text-start">
            {excerpt(description, 40)}....
            <Link to={`/tour/${_id}`} className="text-info">
              Read More
              {/* <MDBBtn rounded className="mx-3 " size="sm" color="info">
              </MDBBtn> */}
            </Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;

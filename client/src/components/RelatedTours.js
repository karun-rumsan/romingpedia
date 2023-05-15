import React from "react";

import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardBody,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";

const RelatedTours = ({ relatedTours, tourId }) => {
  console.log(relatedTours);
  return (
    <div>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && (
            <h4 className="text-center">Related Tours</h4>
          )}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4 ">
            {relatedTours
              .filter((t) => t._id !== tourId)
              .splice(0, 3)
              .map((obj) => (
                <MDBCol sm="6">
                  <MDBCard className="m-5 ">
                    <Link to={`/tour/${obj._id}`}>
                      <MDBCardImage
                        src={obj.imageFile}
                        alt={obj.title}
                        position="top"
                        style={{ maxWidth: "100%", height: "180px" }}
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {obj.tags.map((tag) => (
                        <Link to={`/tour/tag/${tag}`}> #{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {obj.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(obj.description, 45)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </div>
  );
};

export default RelatedTours;

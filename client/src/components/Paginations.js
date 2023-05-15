import { MDBBtn, MDBPagination, MDBPaginationItem } from "mdb-react-ui-kit";
import React from "react";

const Paginations = ({
  setCurrentPage,
  currentPage,
  numberofPage,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberofPage && currentPage === 1) return null;

    if (currentPage === 1) {
      return (
        <MDBPagination center className="mb-0 mt-2">
          <MDBPaginationItem>
            <p className="fw-bold m-1">1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              size="sm"
              rounded
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberofPage) {
      return (
        <MDBPagination center className="mb-0 mt-2">
          <MDBPaginationItem>
            <MDBBtn
              size="sm"
              rounded
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold m-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              size="sm"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-0 mt-2">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              size="sm"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold m-1">{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className="pt-3">{renderPagination()}</div>;
};

export default Paginations;

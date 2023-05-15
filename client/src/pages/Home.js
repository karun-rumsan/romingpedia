import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/feature/tourSlice";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Paginations from "../components/Paginations";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Home = () => {
  const { tours, loading, currentPage, numberofPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  }

  if (currentPage === numberofPages && currentPage === 1) {
    console.log(currentPage, numberofPages);
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center m-5" tag="h2">
            NO Tours Found with search {query.get("searchQuery")}
          </MDBTypography>
        )}
      </MDBRow>
      <MDBCol>
        <MDBContainer>
          <MDBRow className="row-cols-1 row-cols-md-3 g-2 ">
            {tours &&
              tours.map((item) => <CardTour key={item._id} {...item} />)}
          </MDBRow>
        </MDBContainer>
      </MDBCol>
      {tours.length > 0 && (
        <Paginations
          currentPage={currentPage}
          dispatch={dispatch}
          setCurrentPage={setCurrentPage}
          numberofPage={numberofPages}
        />
      )}
    </div>
  );
};

export default React.memo(Home);

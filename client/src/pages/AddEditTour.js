import React, { useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createTour, patchTour } from "../redux/feature/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};
const AddEditTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  useEffect(() => {
    if (id) {
      const forEdit = userTours.find((tour) => tour._id === id);
      console.log(forEdit);
      setTourData({ ...forEdit });
    }
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(patchTour({ id, updatedTourData, toast, navigate }));
      }
    }
    // handleClear();
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alingment="center">
        <h5>{id ? "Updatetour" : "AddTour"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide title"
              invalid
            >
              <MDBInput
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                label="Enter Title"
              />
            </MDBValidationItem>

            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide description"
              invalid
            >
              <MDBTextArea
                type="text"
                value={description || ""}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                label="Enter Description"
                rows={4}
                cols={4}
              />
            </MDBValidationItem>
            <div className="col-md-12 mt-3">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>

            <div className="d-flex justify-content-start mt-2">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie } from "../../store/movieSlice";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const MovieTable: React.FC = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state: any) => state.movies.movies);
  const [showModal, setShowModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const handleDeleteMovie = (movieId: number) => {
    dispatch(deleteMovie(movieId));
    toast.success("Movie deleted successfully!");
    setShowModal(false);
  };

  const columns = [
    {
      name: "Title",
      selector: (row: Movie) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row: Movie) => row.year.toString(),
      sortable: true,
    },
    {
      name: "Genre",
      selector: (row: Movie) => row.genre,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      width: "200px",
      cell: (row: Movie) => (
        <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
          <Link to={`/edit-movie/${row.id}`} className="btn btn-warning">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              setMovieToDelete(row);
              setShowModal(true);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Movies Table</h1>
        <Link to="/add-movie" className="btn btn-primary">
          Add Movie
        </Link>
      </div>

      <DataTable
        title="Movies"
        columns={columns}
        data={movies}
        pagination
        highlightOnHover
        responsive
      />

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the movie{" "}
          <strong>{movieToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => movieToDelete && handleDeleteMovie(movieToDelete.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieTable;

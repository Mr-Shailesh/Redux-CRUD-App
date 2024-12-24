import React, { useEffect, useState } from "react";
import { genres } from "../../utils/Constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, updateMovie } from "../../store/movieSlice";
import { toast } from "react-toastify";

interface MovieFormData {
  title: string;
  year: string;
  genre: string;
}

interface ValidationErrors {
  title: string;
  year: string;
  genre: string;
}

const MovieForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state: any) => state.movies.movies);

  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    year: "",
    genre: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    title: "",
    year: "",
    genre: "",
  });

  useEffect(() => {
    if (id) {
      const movieToEdit = movies.find((movie: any) => movie.id === Number(id));
      if (movieToEdit) {
        setFormData({
          title: movieToEdit.title,
          year: movieToEdit.year.toString(),
          genre: movieToEdit.genre,
        });
      }
    }
  }, [id, movies]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {
      title: "",
      year: "",
      genre: "",
    };

    if (!formData.title) {
      newErrors.title = "Title is required.";
    }
    if (
      !formData.year ||
      isNaN(Number(formData.year)) ||
      Number(formData.year) < 1900 ||
      Number(formData.year) > new Date().getFullYear()
    ) {
      newErrors.year =
        "Please enter a valid year (a number between 1900 and the current year).";
    }
    if (!formData.genre) {
      newErrors.genre = "Please select a genre.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validate()) {
      const newMovie = {
        id: id ? Number(id) : Date.now(),
        title: formData.title,
        year: Number(formData.year),
        genre: formData.genre,
      };

      if (id) {
        dispatch(updateMovie(newMovie));
        toast.success("Movie updated successfully");
      } else {
        dispatch(addMovie(newMovie));
        toast.success("Movie added successfully");
      }
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="my-4">{id ? "Update Movie" : "Add Movie"}</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="number"
            className={`form-control ${errors.year ? "is-invalid" : ""}`}
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          {errors.year && <div className="invalid-feedback">{errors.year}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <select
            className={`form-select ${errors.genre ? "is-invalid" : ""}`}
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <div className="invalid-feedback">{errors.genre}</div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2">
            {id ? "Update Movie" : "Add Movie"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;

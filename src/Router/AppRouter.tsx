import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MovieTable from "../components/Table/MovieTable";
import MovieForm from "../components/Forms/MovieForm";
import NotFoundPage from "../components/NotFound/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MovieTable />} />
          <Route path="/add-movie" element={<MovieForm />} />
          <Route path="/edit-movie/:id" element={<MovieForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;

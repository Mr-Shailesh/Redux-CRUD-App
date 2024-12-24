import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-1 text-danger">404</h1>
              <h2>Page Not Found</h2>
              <p className="lead">The page you're looking for does not exist.</p>
              <a href="/" className="btn btn-primary">Go Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

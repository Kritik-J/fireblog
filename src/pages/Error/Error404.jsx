import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-6xl font-bold">Page not found</h2>
      <Link to="/" className="text-2xl font-bold">
        Go to home
      </Link>
    </div>
  );
};

export default Error404;

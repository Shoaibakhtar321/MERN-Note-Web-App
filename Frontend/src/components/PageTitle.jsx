import React from "react";
import { useSelector } from "react-redux";

const PageTitle = ({ title, count }) => {
  return (
    <div className="mb-4">
      <h2 className="pb-1 text-2xl font-semibold text-text-primary">{title}</h2>

      <p className="text-lg font-medium text-text-secondary">{count}</p>
    </div>
  );
};

export default PageTitle;

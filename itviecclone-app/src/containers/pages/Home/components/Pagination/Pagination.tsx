import React from "react";

const Pagination = (props: {
  jobsPerPage: number;
  totalJobs: number;
  paginate: Function;
  currentPage: number;
}) => {
  const pageNumbers = [];
  const { jobsPerPage, totalJobs, paginate, currentPage } = props;
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={"page-item" + (currentPage === number ? " active" : "")}
          >
            <p onClick={() => paginate(number)} className="page-link">
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

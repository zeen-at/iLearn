import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalCourses,
  coursesPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalCourses: number;
  coursesPerPage: number;
  setCurrentPage: (page: number) => Promise<void>;
  currentPage: number;
}) => {
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      <div className="pagination">
        {pages.map((page: number, index: number) => (
          <button
            key={index}
            onClick={async () => await setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;

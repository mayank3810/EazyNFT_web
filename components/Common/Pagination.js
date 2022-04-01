import React from "react";
import Link from "next/link";

const Pagination = ({ page, lastPage, onChange }) => {
  return (
    <>
      <div className="col-lg-12 col-md-12 text-center">
        <div className="pagination-area">
          {page > 0 && (
            <span
              className="page-numbers"
              aria-current="page"
              role="button"
              onClick={() => onChange(0)}
            >
              <i className="ri-arrow-left-s-line"></i>
            </span>
          )}
          {page > 0 && (
            <span
              className="page-numbers"
              aria-current="page"
              role="button"
              onClick={() => onChange(page - 1)}
            >
              {page}
            </span>
          )}
          <span className="page-numbers current" aria-current="page">
            {page + 1}
          </span>
          {page + 1 < lastPage && (
            <span
              className="page-numbers "
              aria-current="page"
              role="button"
              onClick={() => onChange(page + 1)}
            >
              {page + 2}
            </span>
          )}
          {page + 1 < lastPage && (
            <span
              className="page-numbers "
              aria-current="page"
              role="button"
              onClick={() => onChange(lastPage - 1)}
            >
              <i className="ri-arrow-right-s-line"></i>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;

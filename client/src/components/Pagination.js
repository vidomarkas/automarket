import React, { useContext } from "react";
import PaginationContext from "../context/pagination/paginationContext";

const Pagination = ({ adsPerPage, totalAds }) => {
  const pageNumbers = [];
  const paginationContext = useContext(PaginationContext);
  const { currentPage, setCurrentPage, clearCurrentPage } = paginationContext;

  for (let i = 1; i <= Math.ceil(totalAds / adsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="search-results__pagination">
      <ul className="search-results__pagination__list">
        {pageNumbers.map((number) => (
          <li key={number} className="search-results__pagination__list-item">
            <button
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "activePage" : null}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
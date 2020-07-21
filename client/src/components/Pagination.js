import React, { useContext } from "react";
import GeneralContext from "../context/general/generalContext";

const Pagination = ({ adsPerPage, totalAds }) => {
  const pageNumbers = [];
  const generalContext = useContext(GeneralContext);
  const { currentPage, setCurrentPage } = generalContext;

  for (let i = 1; i <= Math.ceil(totalAds / adsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onChangePage = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="search-results__pagination">
      <ul className="search-results__pagination__list">
        {pageNumbers.map((number) => (
          <li key={number} className="search-results__pagination__list-item">
            <button
              onClick={() => onChangePage(number)}
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

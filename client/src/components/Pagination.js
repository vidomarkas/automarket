import React from "react";

import { connect } from "react-redux";
import { setCurrentPage } from "../actions/generalActions";

const Pagination = ({ adsPerPage, totalAds, setCurrentPage, currentPage }) => {
  const pageNumbers = [];

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

const mapStateToProps = (state) => ({ currentPage: state.general.currentPage });

export default connect(mapStateToProps, { setCurrentPage })(Pagination);

import React, { useContext, useState } from "react";
import AdContext from "../../context/ad/adContext";
import GeneralContext from "../../context/general/generalContext";
import SearchResult from "./SearchResult";
import Spinner from "../layout/Spinner";
import "./SearchResults.scss";
import Pagination from "../Pagination";

// change this component to featured ads
const SearchResults = () => {
  const adContext = useContext(AdContext);
  const { foundAds, loading } = adContext;
  const generalContext = useContext(GeneralContext);
  const { currentPage } = generalContext;

  const [adsPerPage] = useState(10);

  // Get current ads
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = foundAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="search-results__container shadow-md">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="search-results__heading">
            <h2>Search results ({foundAds.length})</h2>
          </div>
          <ul className="search-results__menu">
            <li className="search-results__menu-item search-results__menu-item--make">
              Make
            </li>
            <li className="search-results__menu-item search-results__menu-item--features">
              Features
            </li>
            <li className="search-results__menu-item search-results__menu-item--date">
              Updated
            </li>
            <li className="search-results__menu-item search-results__menu-item--price">
              Price
            </li>
          </ul>
          <div className="search-results__list">
            {foundAds && foundAds.length > 0 ? (
              currentAds.map((ad) => <SearchResult key={ad._id} ad={ad} />)
            ) : (
              <h4 className="search-results__nothing-found">
                No ads found matching your criteria
              </h4>
            )}
          </div>
          {foundAds.length <= adsPerPage ? null : (
            <Pagination adsPerPage={adsPerPage} totalAds={foundAds.length} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;

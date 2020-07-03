import React, { useContext, useState, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import PaginationContext from "../../context/pagination/paginationContext";
import AdItem from "./AdItem";
import Spinner from "../layout/Spinner";
import "./FoundAds.scss";
import Pagination from "../Pagination";

// change this component to featured ads
const FoundAds = () => {
  const adContext = useContext(AdContext);
  const paginationContext = useContext(PaginationContext);
  const { foundAds, loading, setSortedAds, sortedAds } = adContext;
  const { currentPage } = paginationContext;

  useEffect(() => {
    if (sortedAds) {
      setSortedAds(sortedAds);
    } else {
      setSortedAds(foundAds);
    }
  }, [sortedAds, foundAds]);

  const [adsPerPage] = useState(10);

  // Get current ads
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = sortedAds.slice(indexOfFirstAd, indexOfLastAd);

  const sortByPrice = () => {
    console.log("sortbyprice");
    const sorted = [...sortedAds].sort((a, b) => a.price - b.price);
    setSortedAds(sorted);
  };

  if (foundAds === null) {
    return null;
  }

  return (
    <div className="found-ads__container shadow-md">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="found-ads__heading">
            <h2>Search results ({foundAds.length})</h2>
          </div>
          <ul className="found-ads__menu">
            <li className="found-ads__menu-item found-ads__menu-item--make">
              Make
            </li>
            <li className="found-ads__menu-item found-ads__menu-item--features">
              Features
            </li>
            <li className="found-ads__menu-item found-ads__menu-item--date">
              Updated
            </li>
            <li
              className="found-ads__menu-item found-ads__menu-item--price"
              onClick={() => sortByPrice()}
            >
              Price
            </li>
          </ul>
          <div className="found-ads__list">
            {foundAds && foundAds.length > 0 ? (
              currentAds.map((ad) => <AdItem key={ad._id} ad={ad} />)
            ) : (
              <h4>Nothing found matching your criteria</h4>
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

export default FoundAds;

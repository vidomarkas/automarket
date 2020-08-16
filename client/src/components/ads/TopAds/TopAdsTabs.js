import React from "react";

const TopAdsTabs = ({ currentTab, setCurrentTab }) => {
  return (
    <ul className="ad-grid__tabs shadow-min">
      <li
        className={
          currentTab === "featured"
            ? "ad-grid__tab ad-grid__tab--active"
            : "ad-grid__tab"
        }
        onClick={() => {
          setCurrentTab("featured");
        }}
      >
        Featured
      </li>
      <li
        className={
          currentTab === "popular"
            ? "ad-grid__tab ad-grid__tab--active"
            : "ad-grid__tab"
        }
        onClick={() => {
          setCurrentTab("popular");
        }}
      >
        Most popular
      </li>
      <li
        className={
          currentTab === "new"
            ? "ad-grid__tab ad-grid__tab--active"
            : "ad-grid__tab"
        }
        onClick={() => {
          setCurrentTab("new");
        }}
      >
        Brand new
      </li>
      <li
        className={
          currentTab === "expensive"
            ? "ad-grid__tab ad-grid__tab--active"
            : "ad-grid__tab"
        }
        onClick={() => {
          setCurrentTab("expensive");
        }}
      >
        Most expensive
      </li>
    </ul>
  );
};

export default TopAdsTabs;

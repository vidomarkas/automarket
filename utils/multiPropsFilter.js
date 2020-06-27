function removeKeysWithEmptyValues(obj) {
  // remove empty search values
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i];
    if (obj[propName] === "" || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function exactPropsFilter(ads, search) {
  removeKeysWithEmptyValues(search.exactFields);
  const filterArr = Object.keys(search.exactFields);
  return ads.filter((ad) => {
    return filterArr.every((key) => {
      return search.exactFields[key].includes(ad[key]);
    });
  });
}

function rangePropsFilter(ads, search) {
  removeKeysWithEmptyValues(search.rangeFields);
  if (!search.rangeFields.priceFrom) {
    search.rangeFields.priceFrom = 0;
  }
  if (!search.rangeFields.priceTo) {
    search.rangeFields.priceTo = 20000000;
  }
  if (!search.rangeFields.yearFrom) {
    search.rangeFields.yearFrom = 1900;
  }
  if (!search.rangeFields.yearTo) {
    const date = new Date();
    const thisYear = date.getFullYear();
    search.rangeFields.yearTo = thisYear;
  }

  return ads.filter((ad) => {
    return (
      ad.dateManufactured >= search.rangeFields.yearFrom &&
      ad.dateManufactured <= search.rangeFields.yearTo &&
      ad.price >= search.rangeFields.priceFrom &&
      ad.price <= search.rangeFields.priceTo
    );
  });
}

module.exports = function (ads, search) {
  const filteredExact = exactPropsFilter(ads, search);
  const filteredRange = rangePropsFilter(filteredExact, search);

  return filteredRange;
};

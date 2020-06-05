const removeKeysWithEmptyValues = (obj) => {
  // remove empty search values (mutates the object)
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i];
    if (obj[propName] === "" || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};

const exactPropsFilter = (ads, search) => {
  removeKeysWithEmptyValues(search.exactFields);
  const filterArr = Object.keys(search.exactFields);
  return ads.filter((ad) => {
    return filterArr.every((key) => {
      return search.exactFields[key].includes(ad[key]);
    });
  });
};

const rangePropsFilter = (ads, search) => {
  removeKeysWithEmptyValues(search.rangeFields);
  if (!search.rangeFields.priceFrom) {
    search.rangeFields.priceFrom = 0;
  }
  if (!search.rangeFields.priceTo) {
    search.rangeFields.priceTo = 1000000;
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
};

export const multiPropsFilter = (ads, search) => {
  const filteredExact = exactPropsFilter(ads, search);
  rangePropsFilter(filteredExact, search);
};

// const search = {
//   exactFields: {
//     make: "BMW",
//     model: "320",
//     bodyType: "hatchback",
//     fuelType: "petrol",
//     doors: "",
//   },

//   rangeFields: {
//     priceFrom: 3000,
//     priceTo: 20000,
//     yearFrom: 2007,
//     yearTo: 2019,
//   },
// };

// const ads = [
//   {
//     make: "BMW",
//     model: "320",
//     dateManufactured: 2018,
//     bodyType: "hatchback",
//     fuelType: "petrol",
//     price: 20000,
//   },

//   {
//     make: "BMW",
//     model: "320",
//     dateManufactured: 2008,
//     bodyType: "hatchback",
//     fuelType: "petrol",
//     price: 2999,
//   },
//   {
//     make: "BMW",
//     model: "320",
//     dateManufactured: 2016,
//     bodyType: "saloon",
//     fuelType: "diesel",
//     price: 14999,
//   },
//   {
//     make: "BMW",
//     model: "323",
//     dateManufactured: 2010,
//     bodyType: "saloon",
//     fuelType: "petrol",
//     price: 10000,
//   },
// ];

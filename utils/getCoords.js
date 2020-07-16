const axios = require("axios");

const getCoords = async (postcode) => {
  try {
    const response = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    return {
      longitude: response.data.result.longitude,
      latitude: response.data.result.latitude,
      locationName: response.data.result.admin_district,
    };
  } catch (error) {
    console.log("Error getting coordinates from postcode", error);
  }
};

module.exports = getCoords;

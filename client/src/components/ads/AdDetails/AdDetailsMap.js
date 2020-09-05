import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

const AdDetailsMap = ({ coords }) => {
  const position = [coords.latitude, coords.longitude];
  return (
    <>
      <div className="car-details__map shadow-min">
        {coords ? (
          <Map
            center={position}
            zoom={10}
            style={{ width: "100%", height: "400px" }}
          >
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span>coords.locationName</span>
                <br />
                <span>BATTALION: </span>
                <br />
              </Popup>
            </Marker>
          </Map>
        ) : (
          "Data is loading..."
        )}
      </div>
    </>
  );
};

AdDetailsMap.propTypes = {
  coords: PropTypes.object.isRequired,
};

export default AdDetailsMap;

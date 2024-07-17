"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapContainer = () => {
  // 45.820316339498284, 15.977779852192072
  let position = {
    lat: 45.820316339498284,
    lng: 15.977779852192072,
  };

  let apiKey = "AIzaSyAe_GDpqdMEi2xxqhucs62vR81bJnP1bDQ";

  return (
    <APIProvider apiKey={apiKey}>
      <div className="map-container">
        <Map
          mapId={"264befe9355da411"}
          options={{ draggable: true }}
          defaultCenter={position}
          defaultZoom={17}
        >
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapContainer;

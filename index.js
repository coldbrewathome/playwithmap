let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: new google.maps.LatLng(37.42292240075573, -122.08429209566403),
    mapTypeId: "roadmap",
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "/data/bayarea.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
  for (let i = 0; i < results.data.length; i++) {
    const coords = results.data[i].position;
    console.log(coords);
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    new google.maps.Marker({
      position: coords,
      map: map,
    });
  }
};

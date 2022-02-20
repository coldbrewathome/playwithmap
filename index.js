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
    "/playwithmap/data/bayarea.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}

  function createMarker(options, html) {
    var marker = new google.maps.Marker(options);
    const infoWindow = new google.maps.InfoWindow({ });
    if (html) {
      google.maps.event.addListener(marker, "click", function() {
        infoWindow.setContent(html);
        infoWindow.open(options.map, this);
      });
    }
    return marker;
  }

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
  for (let i = 0; i < results.data.length; i++) {
    const coords = results.data[i].position;
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };

    createMarker({
      position: latLng,
      map: map,
      icon: image,
      title: "some title",
    }, "<p>SOME COMPANY</p>");
  }
};

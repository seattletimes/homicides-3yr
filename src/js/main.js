//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var data = require("./three-year.geo.json");
// var data2017 = require("./homicides17.geo.json");
// var data2018 = require("./homicides18.geo.json");

var onEachFeature = function(feature, layer) {

    // layer.on({
    //   mouseover: function(e) {
    //     layer.setStyle({ weight: 3, fillOpacity: .8 });
    //   },
    //   mouseout: function(e) {
    //     layer.setStyle({ weight: 1, fillOpacity: 0.6 });
    //   }
    // });
};

var year = {
  "2016": "#87278f",
  "2017": "#2bb673",
  "2018": "#003369",
}

var toggleLayer = function() {
var checked = $.one(".buttonRow input:checked").id;
  if (checked == "2016") {
    all = "2016";
  } else {
    all = "2017";
  }
  geojson.setStyle(style);
};

function geojsonMarkerOptions(feature) {

  return {
    radius: 7,
    // fillColor: getColor(feature.properties.type),
    fillColor: year[feature.properties.year] || "#f15a29",
    color: "#000000",
    weight: 1,
    opacity: 0.7,
    fillOpacity: 0.7,
  }
};

var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        var marker = L.circleMarker([latlng.lat, latlng.lng]);
      return marker;
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map);

  var controls = document.querySelector(".buttonRow");

  // var onChange = function() {
  // //find the radio button that's currently checked
  // var value = document.querySelector(`input[name="layer-selection"]:checked`).id;
  // all = value;
  // max = Math.max.apply(null, data.features.map(f => f.properties[all]));

 controls.addEventListener("change", onChange);
onChange(); 

map.scrollWheelZoom.disable();

 map.fitBounds(geojson.getBounds());
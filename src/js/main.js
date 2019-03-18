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
};

var all = "year";

var getColor = function(d) {
    var value = d[all];
    console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 2018 ? '#fee391' :
     		value >= 2017 ? '#A6EEFF' :
            value >= 2016 ? '#22E580' :
             '#0073C1' ;
    } else {
      return "gray"
    }
  };

function getStroke(s) {
 return s == "OIS" ? 3 :
                       1
}

function geojsonMarkerOptions(feature) {
	console.log(feature.properties.year)

  return {
    radius: 5,
    className: "leaflet-clickable year-marker " + feature.properties.year,
    fillColor: getColor(feature.properties),
    color: "#000000",
    weight: getStroke(feature.properties.type),
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

var controls = document.querySelector(".radio-block");

var onChange = function() {
  //find the radio button that's currently checked
  var value = document.querySelector(`input[name="year"]:checked`).id;
  element.setAttribute("data-filter", value); 
};

controls.addEventListener("change", onChange);
onChange(); 

var onEachFeature = function(feature, layer) {
};

map.scrollWheelZoom.disable();
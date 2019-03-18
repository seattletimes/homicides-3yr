//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
	layer.bindPopup(ich.popup(feature.properties))
};

var data = require("./three-year.geo.json");
var all = "year";

var getColor = function(d) {
    var value = d[all];
    console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value == "y2018" ? '#006849' :
     		value == "y2017" ? '#446BCC' :
            value == "y2016" ? '#6e016b' :
             '#0073C1' ;
    } else {
      return "gray"
    }
  };

function getStroke(s) {
 return s == "OIS" ? 2 : .2
}

function geojsonMarkerOptions(feature) {
	console.log(feature.properties.year)

  return {
    radius: 6,
    className: "leaflet-clickable year-marker " + feature.properties.year,
    fillColor: getColor(feature.properties),
    color: "#000000",
    weight: getStroke(feature.properties.type),
    opacity: 1,
    fillOpacity: 0.5,
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
	  layer.bindPopup(ich.popup(feature.properties))
};

map.scrollWheelZoom.disable();
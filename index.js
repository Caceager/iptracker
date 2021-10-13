//jshint esversion: 6
var myIcon = L.icon({
    iconUrl: 'public/images/icon-location.svg',
    iconSize: [38, 55]
});
var marker;
var latitud = 0;
var longitud = 0;
var datos;
function obtenerYPRocesar(){

    const dirIp = $("#ip").val();
    const request = "https://geo.ipify.org/api/v2/country,city?apiKey=at_X1JdN3zglHfUwGFoSYVJ9YbGau1b0&ipAddress="+dirIp;
    console.log("REQUEST: "+request);

    fetch(request).then(function(respuesta){
      return respuesta.json();
    }).then(function(respuesta){
        datos = respuesta;
        console.log(datos);
        if (datos.code === 422){
          alert("Please, enter a valid IP Address");
        }
    }).then(function(){
        if (marker == null){
          marker = L.marker([-1, -1], {icon: myIcon}).addTo(map);
        }
        var isp = $(".display-data #displayISP .info");
        var location = $(".display-data #displayLocation .info");
        $(".display-data #displayIP .info").text(datos.ip);
        $(".display-data #displayTimezone .info").text("UTC "+datos.location.timezone);
        location.text(datos.location.region+", "+datos.location.city);
        isp.text(datos.isp);

        if(location.text().length > 35){
          location.css("font-size", "120%");
        }
        if(isp.text().length > 35){
          isp.css("font-size", "120%");
        }
        latitud = parseFloat(datos.location.lat);
        longitud = parseFloat(datos.location.lng);
        map.setView([latitud, longitud], 15);


        marker.setLatLng([latitud, longitud]);

    });
}

$(".send").click(function(){
  obtenerYPRocesar();

});




var map = L.map('map').setView([5.505, -0.09], 15);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    minZoom: 2,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2FjZWFnZXIiLCJhIjoiY2t1cG1pYW02MzRsZDMxdDRsNGkxOHVsMiJ9.Um9WmiWTNXaQL2HAd6cOug'
}).addTo(map);

obtenerYPRocesar();

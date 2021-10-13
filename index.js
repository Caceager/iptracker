//jshint esversion: 6

var datos;
$(".send").click(function(){

  const dirIp = $("#ip").val();
  const request = "https://geo.ipify.org/api/v2/country,city?apiKey=at_X1JdN3zglHfUwGFoSYVJ9YbGau1b0&ipAddress="+dirIp;
  console.log("REQUEST: "+request);

  fetch(request).then(function(respuesta){
    return respuesta.json();
  }).then(function(respuesta){
      datos = respuesta;
      console.log(datos);
  }).then(function(){

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
  });



});

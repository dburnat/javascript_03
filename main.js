var map;
    let data;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 12,
          keyboardShortcuts: false
        });
        marker = new google.maps.Marker({
            position: {lat: -34.397, lng: 150.644} ,
            map: map,
            icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
            animation: google.maps.Animation.DROP
        });
        getLocalization();
        addKeyboardEvent();
        
      }

      function getLocalization() {
          navigator.geolocation.getCurrentPosition(geoOk, geoFail);
      }

      function geoOk(data){
          let coords = {lat: data.coords.latitude, lng: data.coords.longitude}
          map.setCenter(coords);
          marker.setPosition(coords);
      }

      function geoFail(err){
          console.log(err);
      }

      function addKeyboardEvent(){
          window.addEventListener('keydown', moveMarker);
      }

      function moveMarker(key){
          let lat =  marker.getPosition().lat();
          let lng =  marker.getPosition().lng();

          switch(key.code){
            case 'ArrowUp':
                lat += 0.01;
                break;
            case 'ArrowDown':
                lat -= 0.01;
                break;
            case 'ArrowRight':
                lng += 0.01;
                break;
            case 'ArrowLeft':
                lng -= 0.01;
                break;
            default:
                break;
          }
          console.log("lat:" + lat);
          console.log("lng" + lng);

          marker.setPosition({lat,lng});
          if(map.center.lat() + 30 < lat)
            map.setCenter({lat,lng});
          
          
      }
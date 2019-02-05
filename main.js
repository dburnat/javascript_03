var map;
let data;
let img = 0;
// Funkcjonalności:
// 1. Podpięcie się do API Google Maps, DONE
// 2. Wyświetlenie mapy, zlokalizowane środka mapy w geolokalizacji użytkownika (pobieranie geolokalizacji z przeglądarki, reagowanie na sytuacje awaryjne (np. użytkownik nie udostępnij lokalizacji) DONE
// 3. Wyświetlenie na mapie markera w postaci własnego avatara w geolokalizacji użytkownika.
// 4. Kierowanie położeniem markera klawiszami strzałek na klawiaturze DONE
// 5. Spięcie własnego markera z udostępnionym (dane poniżej) serwerem Websocket w celu utworzenia gry w gonienie się po mapie (można przetestować z np. dwóch przeglądarek). 
// 6. Opracowanie protokołu komunikacji filtrującego niechciane komunikaty (np. od innej aplikacji korzystającej z tego samego serwera) - np. prywatne mapy.
// 7. Widoczne okno czatu (możliwość rozmowy z innymi osobami korzystającymi z aplikacji)
document.getElementById('file').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById(img).src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
    }
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        icon: img.src,
        animation: google.maps.Animation.DROP
    });
    marker1 = new google.maps.Marker({
        position: { lat: -30.397, lng: 150.644 },
        map: map,
        icon: img.src,
        animation: google.maps.Animation.DROP
    });
    getLocalization();
    addKeyboardEvent();

}




function getLocalization() {
    navigator.geolocation.getCurrentPosition(geoOk, geoFail);
}

function geoOk(data) {
    let coords = { lat: data.coords.latitude, lng: data.coords.longitude }
    map.setCenter(coords);
    marker.setPosition(coords);
}

function geoFail(err) {
    console.log(err);
}

function addKeyboardEvent() {
    window.addEventListener('keydown', moveMarker);
}

function moveMarker(key) {
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    let bounds = map.getBounds();


    switch (key.code) {
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
    console.log("maplng" + map.center.lng());
    

    marker.setPosition({ lat, lng });
   


}
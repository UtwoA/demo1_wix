const apiKey = "AIzaSyCFyaPOSCk9Yd1ZpSiA4P93ZTSC3WRdwXA";

const mapElementId = "googleMaps2";

const address = "Ulitsa Sobornaya, Saratov, Saratov Oblast, Russia, 410002";

$w.onReady(function () {
    $w('#googleMaps1').hide();
    $w('#buttonMap').onClick(() => {
        if ($w('#googleMaps1').isVisible) {
            $w('#googleMaps1').hide();
        }
        else{
            $w('#googleMaps1').show();
        }
    });
    $w('#buttonContactUs').onClick(() => {
        $w('#footer1').scrollTo();
    });

    $w('#image2').onClick(() => {
        window.location.href = $w('#section7');
    });


    loadGoogleMapsApi(apiKey).then(() => {
        initMap();
    }).catch((err) => {
        console.error('Failed to load Google Maps API:', err);
    });

});


function loadGoogleMapsApi(apiKey) {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
        } else {
            let script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        }
    });
}

function initMap() {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            let mapOptions = {
                zoom: 15,
                center: results[0].geometry.location
            };

            let map = new google.maps.Map($w('#googleMap').$el, mapOptions);

            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}

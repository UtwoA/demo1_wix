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
    let script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${AIzaSyCFyaPOSCk9Yd1ZpSiA4P93ZTSC3WRdwXA}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
});
const apiKey = "AIzaSyCFyaPOSCk9Yd1ZpSiA4P93ZTSC3WRdwXA";

const mapElementId = "googleMaps2";

const address = "Ulitsa Sobornaya, Saratov, Saratov Oblast, Russia, 410002";

function initMap() {
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            let mapOptions = {
                zoom: 15,
                center: results[0].geometry.location
            };

            let map = new google.maps.Map(document.getElementById(mapElementId), mapOptions);

            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}

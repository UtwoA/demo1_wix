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

    const apiKey = "AIzaSyCYh0q0b7UJV5MNMRO_8TwAdowQh8qFjtc";

    const address = "Ulitsa Maksima Gor'kogo, д.16, Saratov, Saratov Oblast, Russia, 410028";

    getCoordinates(apiKey, address)
        .then(location => {
            if (location) {
                setMapLocation(location.lat, location.lng);
            } else {
                console.error('Geocoding failed');
            }
        })
        .catch(err => console.error('Error:', err));

});


function getCoordinates(apiKey, address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                return {
                    lat: location.lat,
                    lng: location.lng
                };
            } else {
                console.error('Geocoding failed:', data.status);
                return null;
            }
        })
        .catch(err => {
            console.error('Fetch error:', err);
            return null;
        });
}

function setMapLocation(lat, lng) {
    const map = $w('#googleMaps2');
    map.location = {
        latitude: lat,
        longitude: lng
    };
    map.markers = [{
        location: {
            latitude: lat,
            longitude: lng
        },
        title: 'Selected Location',
        description: 'This is the selected location'
    }];
    map.zoom = 15;
}
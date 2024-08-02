$w.onReady(function () {
    $w("#googleMaps1").hide();

    $w("#buttonMap").onClick(() => {
        if ($w("#googleMaps1").isVisible) {
            $w("#googleMaps1").hide();
        } else {
            $w("#googleMaps1").show();
        }
    });
});
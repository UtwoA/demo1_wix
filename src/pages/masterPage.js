// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w('#buttonMap').onClick(() => {
        if($w('#googleMaps1').isVisible()) {
            $w('#googleMaps1').hide();
        }
        else{
            $w('#googleMaps1').show();
        }
    });
});

// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w('#googleMaps1').hide(() => {
        $w('#buttonMap').onClick(() => {
            $w('#googleMaps1').show();
        });
})
    $('googleMaps1').show(() => {
        $w('#buttonMap').onClick(() => {
            $w('#googleMaps1').hide();
        });
    })
});

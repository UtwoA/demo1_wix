$w.onReady(function () {
    // Обработчик для кнопки переключения видимости формы
    $w('#buttonMap').onClick(() => {
        toggleForm();
    });
});

function toggleForm() {
    if ($w('#googleMaps1').isVisible()) {
        $w('#googleMaps1').hide();
    } else {
        $w('#googleMaps1').show();
    }
}
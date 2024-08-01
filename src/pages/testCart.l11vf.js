$w.onReady(function () {
    const sampleData = [
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" }
    ];
    console.log('Setting sample data to repeater');
    $w('#repeater1').data = sampleData;
    $w('#repeater1').expand();

    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log('onItemReady called with sample data'); // Отладка: подтверждение вызова onItemReady
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater

        $item('#itemTitle').text = itemData.name || 'No Name'; // Установите название товара
    });
});

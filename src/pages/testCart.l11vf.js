$w.onReady(function () {
    // Установка статических данных для Repeater
    const sampleData = [
        { _id: "1", name: "Item 1" },
        { _id: "2", name: "Item 2" },
        { _id: "3", name: "Item 3" }
    ];
    
    console.log('Setting sample data to repeater');
    $w('#repeater1').data = sampleData;

    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log('onItemReady called'); // Отладка: подтверждение вызова onItemReady
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater

        $item('#itemTitle').text = itemData.name || 'No Name'; // Установите название товара
    });
});

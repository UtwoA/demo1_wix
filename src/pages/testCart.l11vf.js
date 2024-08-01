$w.onReady(function () {
    // Данные, которые вы хотите отобразить
    const products = [
      {
        _id: '1',
        title: 'Product 1',
        price: 29.99,
        image: 'https://example.com/image1.jpg'
      },
      {
        _id: '2',
        title: 'Product 2',
        price: 39.99,
        image: 'https://example.com/image2.jpg'
      }
    ];
  
    // Назначьте данные в Repeater
    $w('#repeater1').data = products;
  
    // Обработка каждого элемента Repeater
    $w('#repeater1').onItemReady(($item, itemData, index) => {
      // Присвойте значения элементам внутри Repeater
      $item('#itemTitle1').text = itemData.title;
      $item('#itemPrice1').text = `$${itemData.price.toFixed(2)}`;
      $item('#itemImage1').src = itemData.image;
    });
  });
  
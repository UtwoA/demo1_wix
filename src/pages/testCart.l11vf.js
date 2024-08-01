import wixStores from 'wix-stores';

$w.onReady(async function () {
    try {
        // Получаем данные корзины
        const cart = await wixStores.cart.getCurrentCart();
        if (!cart || !cart.lineItems) {
            console.log('Нет данных в корзине или структура корзины не правильная');
            return;
        }

        // Извлекаем и форматируем данные товаров
        const products = cart.lineItems.map(item => ({
            _id: item.id,
            title: item.name || 'No Name',
            price: item.price || 0,
            image: item.mediaItem ? item.mediaItem.src : '' // Получаем URL изображения товара
        }));

        console.log('Formatted Products:', products);

        // Вы можете использовать `products` как нужно, например, передать их в Repeater
        // $w('#repeater1').data = products;

    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
    
    const products = [
      { _id: '1', title: 'Product 1', price: 29.99, image: 'https://example.com/image1.jpg' },
      { _id: '2', title: 'Product 2', price: 39.99, image: 'https://example.com/image2.jpg' }
    ];
   console.log('products',products);
    $w('#repeater1').data = products;
  
    $w('#repeater1').onItemReady(($item, itemData, index) => {
      console.log(`Item data:`, itemData); // Вывод данных элемента в консоль
  
      $item('#itemTitle1').text = itemData.title;
      $item('#itemPrice1').text = `$${itemData.price.toFixed(2)}`;
      $item('#itemImage1').src = itemData.image;
    });
  });
  
  


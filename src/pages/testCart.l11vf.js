import wixStores from 'wix-stores';

$w.onReady(async function () {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        if (!cart || !cart.lineItems) {
            console.log('Нет данных в корзине или структура корзины не правильная');
            return;
        }

        // Извлекаем и форматируем данные товаров
        const products = cart.lineItems.map(s => ({
            _id: (s.id + 1).toString(),
            title: s.name,
            price: s.price,
            image: s.mediaItem ? s.mediaItem.src : '' 
        }));

        $w('#repeater1').data = products;
        
        $w('#repeater1').onItemReady(($item, itemData, index) => {
          console.log(`Item data:`, itemData); 
      
          $item('#itemTitle1').text = itemData.title;
          $item('#itemPrice1').text = `$${itemData.price.toFixed(2)}`;
          $item('#itemImage1').src = itemData.image;
          
          $item('#removeItemButton').onClick(() => {
            removeItemFromCart(itemData._id);
            });
        });
        // Рассчитываем и отображаем общую стоимость
        const totalPrice = products.reduce((total, item) => total + (item.price * item.quantity), 0);
        $w('#totalPriceText').text = `Total Price: $${totalPrice.toFixed(2)}`;

        // Обработчик кнопки очистки корзины
        $w('#clearCartButton').onClick(() => {
            clearCart();
        });

        // Обработчик кнопки оформления заказа
        $w('#checkoutButton').onClick(() => {
            //scrollDown
        });

    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }

  });
  
  // Функция для удаления товара из корзины
async function removeItemFromCart(productId) {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        const lineItem = cart.lineItems.find(item => item.id == productId);

        if (lineItem) {
            await wixStores.cart.removeLineItems([lineItem.id]);
            console.log('Item removed from cart');
            $w.onReady();  // Перезагружаем данные корзины
        }
    } catch (err) {
        console.error('Ошибка при удалении товара из корзины:', err);
    }
}

// Функция для очистки корзины
async function clearCart() {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        const lineItems = cart.lineItems.map(item => item.id);

        if (lineItems.length > 0) {
            await wixStores.cart.removeLineItems(lineItems);
            console.log('Cart cleared');
            $w.onReady();  // Перезагружаем данные корзины
        }
    } catch (err) {
        console.error('Ошибка при очистке корзины:', err);
    }
}


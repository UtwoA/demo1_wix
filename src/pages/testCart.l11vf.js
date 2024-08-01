import { local } from 'wix-storage';
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
        updateTotalPrice(cart);

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
function updateTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.productPrice;
    });
    $w('#totalPrice').text = totalPrice.toFixed(2);
}
  // Функция для получения товаров из корзины
function getCart() {
    let cart = local.getItem('cart');
    if (!cart) {
        return [];
    }
    return JSON.parse(cart);
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    local.setItem('cart', JSON.stringify(cart));
}

// Функция для очистки корзины
function clearCart() {
    local.removeItem('cart');
}


import { items } from 'wix-data.v2';
import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems); // Отладка: вывод элементов корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                $w('#repeater1').data = cartItems;

                // Использование forEachItem для обработки элементов Repeater
                $w('#repeater1').forEachItem(($item, itemData) => {
                    console.log('Item Data in forEachItem:', itemData);

                    // Проверьте, что itemData содержит нужные поля и они правильно привязаны
                    if (itemData) {
                        $item('#itemTitle').text = $item.name || 'No Name';
                        
                        if (itemData.mediaItem && itemData.mediaItem.src) {
                            $item('#itemImage').src = itemData.mediaItem.src;
                        } else {
                            $item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
                        }

                        $item('#itemPrice').text = `$${itemData.price || 0}`;

                        if ($item('#removeButton')) {
                            $item('#removeButton').onClick(() => {
                                wixStores.cart.removeProducts([itemData.productId])
                                    .then(() => {
                                        console.log('Товар удален из корзины');
                                        updateCart(); // Обновление содержимого корзины
                                    })
                                    .catch((err) => {
                                        console.log('Ошибка при удалении товара из корзины:', err);
                                    });
                            });
                        }
                    } else {
                        console.log('itemData is undefined or null');
                    }
                });
            } else {
                console.log('Cart is empty or cartItems is not an array');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

// Функция для обновления интерфейса после изменения корзины
function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                $w('#repeater1').data = cartItems;
                $w('#repeater1').forEachItem(($item, itemData) => {
                    console.log('Item Data in updateCart:', itemData);

                    if (itemData) {
                        $item('#itemTitle').text = itemData.name || 'No Name';
                        if (itemData.mediaItem && itemData.mediaItem.src) {
                            $item('#itemImage').src = itemData.mediaItem.src;
                        } else {
                            $item('#itemImage').src = '';
                        }
                        $item('#itemPrice').text = `$${itemData.price || 0}`;
                    }
                });
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

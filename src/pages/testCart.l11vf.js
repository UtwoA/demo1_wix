import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                // Установка данных в Repeater
                $w('#repeater1').data = cartItems;
                console.log('Data set to repeater:', $w('#repeater1').data); // Отладка: проверка установленных данных

                // Обновление элементов Repeater
                updateRepeaterItems();
            } else {
                console.log('Cart is empty or cartItems is not an array');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

// Функция для обновления элементов Repeater
function updateRepeaterItems() {
    const itemsCount = $w('#repeater1').data.length;
    console.log('Number of items in repeater:', itemsCount);

    for (let i = 0; i < itemsCount; i++) {
        $w('#repeater1').getItem(i)
            .then(($item) => {
                const item = $w('#repeater1').data[i];
                console.log('Item Data for index', i, ':', item);

                // Обновление элементов внутри Repeater
                if (item) {
                    $item('#itemTitle').text = item.name || 'No Name';
                    
                    if (item.mediaItem && item.mediaItem.src) {
                        $item('#itemImage').src = item.mediaItem.src;
                    } else {
                        $item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
                    }

                    $item('#itemPrice').text = `$${item.price || 0}`;

                    if ($item('#removeButton')) {
                        $item('#removeButton').onClick(() => {
                            wixStores.cart.removeProducts([item.productId])
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
                    console.log('Item at index', i, 'is undefined or null');
                }
            });
    }
}

// Функция для обновления интерфейса после изменения корзины
function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                $w('#repeater1').data = cartItems;
                console.log('Data set to repeater after update:', $w('#repeater1').data); // Отладка: проверка установленных данных
                updateRepeaterItems(); // Обновление элементов Repeater
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

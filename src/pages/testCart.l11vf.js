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

                // Используем функцию для обновления элементов Repeater
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
    $w('#repeater1').forEachItem(($item, itemData, index) => {
        console.log('Item Data in forEachItem:', itemData);

        // Обновление элементов внутри Repeater
        $item('#itemTitle').text = itemData.name || 'No Name';
        
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
    });
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

import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины при загрузке страницы
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems); // Отладка: вывод данных корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                console.log('Setting data to repeater');
                $w('#repeater1').data = cartItems;

                // Обновление элементов Repeater
                updateRepeaterItems(cartItems);
            } else {
                console.log('Cart is empty or cartItems is not an array');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

// Обновление элементов Repeater напрямую
function updateRepeaterItems(cartItems) {
    $w('#repeater1').forEachItem(($item, itemData, index) => {
        console.log('Updating item:', itemData); // Отладка: вывод данных элемента Repeater

        // Убедитесь, что itemData содержит ожидаемые поля
        $item('#itemTitle').text = itemData.name || 'No Name';
        if ($item('#itemImage')) {
            $item('#itemImage').src = itemData.mediaItem ? itemData.mediaItem.src : '';
        }
        if ($item('#itemPrice')) {
            $item('#itemPrice').text = `$${itemData.price || 0}`;
        }
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

// Обновление интерфейса после изменения корзины
function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems); // Отладка: вывод обновленных данных корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                $w('#repeater1').data = cartItems;
                updateRepeaterItems(cartItems); // Обновляем элементы Repeater после изменения данных
            } else {
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

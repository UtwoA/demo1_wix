import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины при загрузке страницы
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart:', cart); // Отладка: вывод всей корзины
            console.log('Cart Items:', cartItems); // Отладка: вывод элементов корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                console.log('Setting data to repeater');
                $w('#repeater1').data = cartItems;

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

// Обновление элементов Repeater напрямую
function updateRepeaterItems() {
    $w('#repeater1').forEachItem(($item, itemData, index) => {
        console.log('Item Data in updateRepeaterItems:', itemData); // Отладка: вывод данных элемента Repeater

        // Проверьте, что itemData содержит нужные поля и они правильно привязаны
        if (itemData) {
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
        } else {
            console.log('itemData is undefined or null');
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
                updateRepeaterItems(); // Обновляем элементы Repeater после изменения данных
            } else {
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

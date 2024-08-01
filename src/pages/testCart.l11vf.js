import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины при загрузке страницы
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            console.log('Cart:', cart); // Отладка: вывод всей корзины
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems); // Отладка: вывод элементов корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                console.log('Setting data to repeater');
                $w('#repeater1').data = cartItems;
                $w('#repeater1').expand(); // Развернуть Repeater, если он свернут
            } else {
                console.log('Cart is empty or cartItems is not an array');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });

    // Привязка данных к элементам Repeater
    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log('onItemReady called'); // Отладка: подтверждение вызова onItemReady
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater

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
});

// Обновление интерфейса после изменения корзины
function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems); // Отладка: вывод обновленных данных корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                $w('#repeater1').data = cartItems;
            } else {
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

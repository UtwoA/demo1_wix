import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины при загрузке страницы
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems); // Отладка: вывод данных корзины

            if (cartItems.length > 0) {
                console.log('Setting data to repeater');
                $w('#repeater1').data = cartItems;
                $w('#repeater1').expand(); // Развернуть Repeater, если он свернут

                // Обработка каждого элемента Repeater напрямую
                cartItems.forEach((item, index) => {
                    let repeaterItem = $w(`#repeater1`).forItem(item);
                    if (repeaterItem) {
                        console.log(`Processing item ${index}:`, item);
                        repeaterItem('#itemTitle').text = item.name || 'No Name';
                        if (repeaterItem('#itemImage')) {
                            repeaterItem('#itemImage').src = item.mediaItem ? item.mediaItem.src : '';
                        }
                        if (repeaterItem('#itemPrice')) {
                            repeaterItem('#itemPrice').text = `$${item.price || 0}`;
                        }
                        if (repeaterItem('#removeButton')) {
                            repeaterItem('#removeButton').onClick(() => {
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
                        console.log(`Unable to find repeater item for index ${index}`);
                    }
                });
            } else {
                console.log('Cart is empty, collapsing repeater');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

// Обновление интерфейса после изменения корзины
function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems); // Отладка: вывод обновленных данных корзины

            if (cartItems.length > 0) {
                $w('#repeater1').data = cartItems;
            } else {
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

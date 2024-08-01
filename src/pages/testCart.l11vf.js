import wixStores from 'wix-stores';

$w.onReady(function () {
    wixStores.cart.getCurrentCart()
        .then(cart => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                // Установка данных в Repeater после инициализации
                $w('#repeater1').data = cartItems.map(item => ({
                    // Преобразуем каждый item в формат, подходящий для Repeater
                    _id: item.id,
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem ? item.mediaItem.src : '',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0
                }));
                console.log("$w('#repeater1').data:",$w('#repeater1').data);
                // Обновление элементов Repeater
                $w('#repeater1').onItemReady(($item, itemData) => {
                    console.log('Item Data in onItemReady:', itemData);

                    $item('#itemTitle').text = itemData.name || 'No Name';
                    $item('#itemPrice').text = `$${itemData.price || 0}`;
                    $item('#itemQuantity').text = `Quantity: ${itemData.quantity || 1}`;
                    $item('#itemTotalPrice').text = `$${itemData.totalPrice || 0}`;

                    if (itemData.mediaItem) {
                        $item('#itemImage').src = itemData.mediaItem;
                    } else {
                        $item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
                    }

                    // Пример кнопки удаления
                    if ($item('#removeButton')) {
                        $item('#removeButton').onClick(() => {
                            console.log('Удалить товар с ID:', itemData._id);
                            wixStores.cart.removeProducts([itemData._id])
                                .then(() => {
                                    console.log('Товар удален из корзины');
                                    updateCart(); // Обновление содержимого корзины
                                })
                                .catch(err => {
                                    console.log('Ошибка при удалении товара из корзины:', err);
                                });
                        });
                    }
                });
            } else {
                console.log('Корзина пуста или нет данных в cartItems');
                $w('#repeater1').collapse();
            }
        })
        .catch(err => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

function updateCart() {
    wixStores.cart.getCurrentCart()
        .then(cart => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                // Обновляем Repeater с новыми данными
                $w('#repeater1').data = cartItems.map(item => ({
                    _id: item.id,
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem ? item.mediaItem.src : '',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0
                }));
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch(err => {
            console.log('Ошибка при обновлении корзины:', err);
        });
}

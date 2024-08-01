import wixStores from 'wix-stores';
$w.onReady(function () {
    wixStores.cart.getCurrentCart()
        .then(cart => {
            if (!cart || !cart.lineItems) {
                console.log('Нет данных в корзине или структура корзины не правильная');
                return;
            }

            const cartItems = cart.lineItems;

            if (Array.isArray(cartItems)) {
                console.log('Cart Items:', cartItems);

                const formattedItems = cartItems.map(item => ({
                    _id: item.id,
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem ? item.mediaItem.src : '',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0
                }));

                console.log('Formatted Items:', formattedItems);

                $w('#repeater1').data = formattedItems;

                // Проверяем количество элементов
                $w('#repeater1').onReady(() => {
                    const repeaterItems = $w('#repeater1').getItems();
                    console.log('Items in Repeater:', repeaterItems);

                    repeaterItems.forEach((item, index) => {
                        const itemData = formattedItems[index];
                        item('#itemTitle').text = itemData.name || 'No Name';
                        item('#itemPrice').text = `$${itemData.price || 0}`;
                        item('#itemQuantity').text = `Quantity: ${itemData.quantity || 1}`;
                        item('#itemTotalPrice').text = `$${itemData.totalPrice || 0}`;

                        if (itemData.mediaItem) {
                            item('#itemImage').src = itemData.mediaItem;
                        } else {
                            item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
                        }

                        if (item('#removeButton')) {
                            item('#removeButton').onClick(() => {
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
                });
            } else {
                console.log('cartItems не является массивом или он пуст');
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

            if (Array.isArray(cartItems)) {
                const formattedItems = cartItems.map(item => ({
                    _id: item.id,
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem ? item.mediaItem.src : '',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0
                }));

                $w('#repeater1').data = formattedItems;

                $w('#repeater1').onReady(() => {
                    const repeaterItems = $w('#repeater1').getItems();
                    repeaterItems.forEach((item, index) => {
                        const itemData = formattedItems[index];
                        item('#itemTitle').text = itemData.name || 'No Name';
                        item('#itemPrice').text = `$${itemData.price || 0}`;
                        item('#itemQuantity').text = `Quantity: ${itemData.quantity || 1}`;
                        item('#itemTotalPrice').text = `$${itemData.totalPrice || 0}`;

                        if (itemData.mediaItem) {
                            item('#itemImage').src = itemData.mediaItem;
                        } else {
                            item('#itemImage').src = '';
                        }

                        if (item('#removeButton')) {
                            item('#removeButton').onClick(() => {
                                console.log('Удалить товар с ID:', itemData._id);
                                wixStores.cart.removeProducts([itemData._id])
                                    .then(() => {
                                        console.log('Товар удален из корзины');
                                        updateCart();
                                    })
                                    .catch(err => {
                                        console.log('Ошибка при удалении товара из корзины:', err);
                                    });
                            });
                        }
                    });
                });
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch(err => {
            console.log('Ошибка при обновлении корзины:', err);
        });
}

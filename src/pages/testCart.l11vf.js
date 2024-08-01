import wixStores from 'wix-stores';

$w.onReady(function () {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                const formattedItems = cartItems.map(item => ({
                    _id: item.id || item._id,
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem || { src: '' },
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0
                }));

                // Установка данных в Repeater
                $w('#repeater1').data = formattedItems;
                console.log('Formatted Data set to repeater:', formattedItems);

                // Обновление элементов Repeater
                $w('#repeater1').onItemReady(() => {
                    updateRepeaterItems();
                });
            } else {
                console.log('Cart is empty or cartItems is not an array');
                $w('#repeater1').collapse();
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

function updateRepeaterItems() {
    $w('#repeater1').forEachItem(($item, itemData) => {
        console.log('Item Data in forEachItem:', itemData);

        if (itemData) {
            $item('#itemTitle').text = itemData.name || 'No Name';
            
            if (itemData.mediaItem && itemData.mediaItem.src) {
                $item('#itemImage').src = itemData.mediaItem.src;
            } else {
                $item('#itemImage').src = '';
            }

            $item('#itemPrice').text = `$${itemData.price || 0}`;
            
            // Пример кнопки удаления
            if ($item('#removeButton')) {
                $item('#removeButton').onClick(() => {
                    wixStores.cart.removeProducts([itemData._id])
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

function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                const formattedItems = cartItems.map(item => ({
                    _id: item.id || item._id,
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem || { src: '' },
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0
                }));

                $w('#repeater1').data = formattedItems;
                console.log('Formatted Data set to repeater after update:', formattedItems);
                updateRepeaterItems();
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

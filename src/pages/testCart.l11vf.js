import wixStores from 'wix-stores';

$w.onReady(function () {
    wixStores.cart.getCurrentCart()
        .then(cart => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                // Устанавливаем данные в Repeater
                $w('#repeater1').onReady(() => {
                    // Обновляем Repeater с помощью данных из корзины
                    updateRepeaterItems(cartItems);
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

function updateRepeaterItems(cartItems) {
    // Устанавливаем данные вручную для каждого элемента Repeater
    $w('#repeater1').forEachItem(($item, itemData) => {
        // Проверяем, есть ли данные для текущего элемента
        const data = cartItems.find(item => item.id === $item.id);

        if (data) {
            // Устанавливаем значения для текущего элемента
            $item('#itemTitle').text = data.name || 'No Name';
            $item('#itemPrice').text = `$${data.price || 0}`;
            $item('#itemQuantity').text = `Quantity: ${data.quantity || 1}`;
            $item('#itemTotalPrice').text = `$${data.totalPrice || 0}`;

            if (data.mediaItem && data.mediaItem.src) {
                $item('#itemImage').src = data.mediaItem.src;
            } else {
                $item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
            }

            // Пример кнопки удаления
            if ($item('#removeButton')) {
                $item('#removeButton').onClick(() => {
                    console.log('Удалить товар с ID:', data.id);
                    wixStores.cart.removeProducts([data.id])
                        .then(() => {
                            console.log('Товар удален из корзины');
                            updateCart(); // Обновление содержимого корзины
                        })
                        .catch(err => {
                            console.log('Ошибка при удалении товара из корзины:', err);
                        });
                });
            }
        } else {
            console.log('Данные не найдены для элемента с ID:', $item.id);
        }
    });
}

function updateCart() {
    wixStores.cart.getCurrentCart()
        .then(cart => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                updateRepeaterItems(cartItems);
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch(err => {
            console.log('Ошибка при обновлении корзины:', err);
        });
}

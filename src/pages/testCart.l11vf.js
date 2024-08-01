import wixStores from 'wix-stores';

$w.onReady(function () {
    // Получение содержимого корзины
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                // Преобразование данных, если это необходимо
                const formattedItems = cartItems.map(item => ({
                    _id: item.id || item._id, // Проверьте правильный id
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem || { src: '' },
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0,
                    // Добавьте другие поля по необходимости
                }));

                // Установка данных в Repeater
                $w('#repeater1').data = formattedItems;
                console.log('Formatted Data set to repeater:', formattedItems); // Проверка данных перед установкой
                console.log('Data in $w("#repeater1").data:', $w('#repeater1').data);
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
    // Обновление элементов внутри Repeater
    $w('#repeater1').forEachItem(($item, itemData, index) => {
        console.log('Item Data in forEachItem:', itemData);

        // Убедитесь, что itemData содержит правильные данные
        if (itemData) {
            $item('#itemTitle').text = itemData.name || 'No Name';
            
            if (itemData.mediaItem && itemData.mediaItem.src) {
                $item('#itemImage').src = itemData.mediaItem.src;
            } else {
                $item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
            }

            $item('#itemPrice').text = `$${itemData.price || 0}`;

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

// Функция для обновления интерфейса после изменения корзины
function updateCart() {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Updated Cart Items:', cartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                // Преобразование данных, если это необходимо
                const formattedItems = cartItems.map(item => ({
                    _id: item.id || item._id, // Проверьте правильный id
                    name: item.name || 'No Name',
                    mediaItem: item.mediaItem || { src: '' },
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    totalPrice: item.totalPrice || 0,
                    // Добавьте другие поля по необходимости
                }));

                $w('#repeater1').data = formattedItems;
                console.log('Formatted Data set to repeater after update:', formattedItems);
                updateRepeaterItems(); // Обновление элементов Repeater
            } else {
                $w('#repeater1').collapse();
            }
        })
        .catch((err) => {
            console.log('Ошибка при обновлении интерфейса корзины:', err);
        });
}

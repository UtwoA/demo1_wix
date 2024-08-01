import wixStores from 'wix-stores';

$w.onReady(async function () {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        if (!cart || !cart.lineItems) {
            console.log('Нет данных в корзине или структура корзины не правильная');
            return;
        }

        const cartItems = cart.lineItems;
        if (Array.isArray(cartItems) && cartItems.length > 0) {
            console.log('Cart Items:', cartItems);

            // Форматируем данные для Repeater
            const formattedItems = cartItems.map(item => ({
                _id: item.id,
                name: item.name || 'No Name',
                mediaItem: item.mediaItem ? item.mediaItem.src : '',
                price: item.price || 0,
                quantity: item.quantity || 1,
                totalPrice: item.totalPrice || 0
            }));

            console.log('Formatted Items:', formattedItems);

            // Устанавливаем данные в Repeater
            $w('#repeater1').data = formattedItems;

            // Ручное обновление элементов Repeater после установки данных
            setTimeout(() => updateRepeaterElements(formattedItems), 500); // Задержка для асинхронного обновления
        } else {
            console.log('cartItems не является массивом или он пуст');
            $w('#repeater1').collapse();
        }
    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
});

// Функция для обновления данных в Repeater
function updateRepeaterElements(items) {
    const repeater = $w('#repeater1');
    const totalItems = repeater.data.length;

    for (let i = 0; i < totalItems; i++) {
        const itemData = items[i]; // Получаем данные для текущего элемента

        // Получаем элемент Repeater по индексу
        const $item = repeater.getItem(i);

        if ($item) {
            console.log('Updating item:', itemData);

            // Обновляем элементы внутри Repeater
            $item('#itemTitle').text = itemData.name || 'No Name';
            $item('#itemPrice').text = `$${itemData.price || 0}`;
            $item('#itemQuantity').text = `Quantity: ${itemData.quantity || 1}`;
            $item('#itemTotalPrice').text = `$${itemData.totalPrice || 0}`;

            if (itemData.mediaItem) {
                $item('#itemImage').src = itemData.mediaItem;
            } else {
                $item('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
            }

            // Если есть кнопка удаления
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
        }
    }
}

// Функция для обновления данных в Repeater
async function updateCart() {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        const cartItems = cart.lineItems;

        if (Array.isArray(cartItems) && cartItems.length > 0) {
            const formattedItems = cartItems.map(item => ({
                _id: item.id,
                name: item.name || 'No Name',
                mediaItem: item.mediaItem ? item.mediaItem.src : '',
                price: item.price || 0,
                quantity: item.quantity || 1,
                totalPrice: item.totalPrice || 0
            }));

            $w('#repeater1').data = formattedItems;

            // Обновляем данные вручную
            setTimeout(() => updateRepeaterElements(formattedItems), 500); // Задержка для асинхронного обновления
        } else {
            $w('#repeater1').collapse();
        }
    } catch (err) {
        console.log('Ошибка при обновлении корзины:', err);
    }
}

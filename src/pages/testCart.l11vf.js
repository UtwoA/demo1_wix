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
            updateRepeaterElements();
        } else {
            console.log('cartItems не является массивом или он пуст');
            $w('#repeater1').collapse();
        }
    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
});

async function updateRepeaterElements() {
    const items = $w('#repeater1').getItems(); // Получаем элементы Repeater

    for (let i = 0; i < items.length; i++) {
        const itemData = items[i];
        console.log('Updating item:', itemData);

        // Ручное обновление данных элемента
        const itemElement = $w(`#item-${itemData._id}`); // Идентификатор элемента Repeater

        if (itemElement) {
            itemElement('#itemTitle').text = itemData.name || 'No Name';
            itemElement('#itemPrice').text = `$${itemData.price || 0}`;
            itemElement('#itemQuantity').text = `Quantity: ${itemData.quantity || 1}`;
            itemElement('#itemTotalPrice').text = `$${itemData.totalPrice || 0}`;

            if (itemData.mediaItem) {
                itemElement('#itemImage').src = itemData.mediaItem;
            } else {
                itemElement('#itemImage').src = ''; // Путь по умолчанию, если нет изображения
            }

            if (itemElement('#removeButton')) {
                itemElement('#removeButton').onClick(() => {
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
            updateRepeaterElements();
        } else {
            $w('#repeater1').collapse();
        }
    } catch (err) {
        console.log('Ошибка при обновлении корзины:', err);
    }
}

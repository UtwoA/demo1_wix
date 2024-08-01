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
            $w('#repeater1').data = cartItems.map(item => ({
                name: item.name || 'No Name',
                mediaItem: item.mediaItem ? item.mediaItem.src : '',
                price: item.price || 0,
                quantity: item.quantity || 1,
                totalPrice: item.totalPrice || 0
            }));

            console.log('Formatted Items:', cartItems);
            console.log('WE NEED THIS', $w('#repeater1').data);

            // Устанавливаем данные в Repeater

            // Ручное обновление элементов Repeater после установки данных
        } else {
            console.log('cartItems не является массивом или он пуст');
            $w('#repeater1').collapse();
        }
    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
});

import wixStores from 'wix-stores';

$w.onReady(function () {
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems); // Отладка: вывод элементов корзины

            if (Array.isArray(cartItems) && cartItems.length > 0) {
                console.log('Setting data to repeater');
                
                // Проверьте данные перед установкой
                cartItems.forEach(item => console.log('Item Data:', item));

                // Установите данные в Repeater
                $w('#repeater1').data = cartItems;
                console.log($w('#repeater1').data);
            } else {
                console.log('Cart is empty or cartItems is not an array');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
});

import wixStores from 'wix-stores';
import wixLocation from 'wix-location';

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
            } else {
                console.log('Cart is empty, collapsing repeater');
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });

    // Привязка данных к элементам Repeater
    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater

        $item('#itemTitle').text = itemData.name || ''; // Установите название товара
    });
});

// Функция для оформления заказа
export function checkout() {
    wixStores.cart.checkout()
        .then(() => {
            console.log('Чек-аут успешен');
            wixLocation.to('/checkout-success'); // Перенаправление на страницу подтверждения
        })
        .catch((err) => {
            console.log('Ошибка при оформлении заказа:', err);
        });
}

import wixStores from 'wix-stores';
import wixLocation from 'wix-location';

$w.onReady(function () {
    // Получение содержимого корзины при загрузке страницы
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            console.log('Cart Items:', cartItems); // Отладка: вывод данных корзины
            if (cartItems.length > 0) {
                $w('#repeater1').data = cartItems;
            } else {
                $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
            }
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });

    // Обновление интерфейса после изменения корзины
    function updateCart() {
        wixStores.cart.getCurrentCart()
            .then((cart) => {
                const cartItems = cart.lineItems;
                console.log('Updated Cart Items:', cartItems); // Отладка: вывод обновленных данных корзины
                if (cartItems.length > 0) {
                    $w('#repeater1').data = cartItems;
                } else {
                    $w('#repeater1').collapse(); // Скрыть Repeater, если корзина пуста
                }
            })
            .catch((err) => {
                console.log('Ошибка при обновлении интерфейса корзины:', err);
            });
    }

    // Привязка данных к элементам Repeater
    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater
        $item('#itemImage').src = itemData.mediaItem ? itemData.mediaItem.src : ''; // Установите источник изображения
        $item('#itemTitle').text = itemData.name || ''; // Установите название товара
        $item('#itemPrice').text = `$${itemData.price || 0}`; // Установите цену товара

        // Обработка удаления товара из корзины
        $item('#removeButton').onClick(() => {
            wixStores.cart.removeProducts([itemData.productId])
                .then(() => {
                    console.log('Товар удален из корзины');
                    updateCart(); // Обновление содержимого корзины
                })
                .catch((err) => {
                    console.log('Ошибка при удалении товара из корзины:', err);
                });
        });
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

import wixStores from 'wix-stores';
import wixLocation from 'wix-location';

$w.onReady(function () {
    // Получение содержимого корзины при загрузке страницы
    updateCart();
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
    $w('#container1').onItemReady(($item, itemData) => {
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater

        if (itemData.mediaItem) {
            //$item('#itemImage').src = itemData.mediaItem.src; // Установите источник изображения
        } else {
            console.log('No mediaItem found');
        }
        
        $item('#itemTitle').text = itemData.name || ''; // Установите название товара
        //$item('#itemPrice').text = `$${itemData.price || 0}`; // Установите цену товара

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
});
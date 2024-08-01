import wixStores from 'wix-stores';

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
        console.log('onItemReady called'); // Отладка: подтверждение вызова onItemReady
        console.log('Item Data in onItemReady:', itemData); // Отладка: вывод данных элемента Repeater

        $item('#itemTitle').text = itemData.name || 'No Name'; // Установите название товара
        // Добавьте дополнительную отладку для других элементов
        if ($item('#itemImage')) {
            console.log('Image element exists');
            $item('#itemImage').src = itemData.mediaItem ? itemData.mediaItem.src : '';
        } else {
            console.log('Image element does not exist');
        }
        
        if ($item('#itemPrice')) {
            console.log('Price element exists');
            $item('#itemPrice').text = `$${itemData.price || 0}`;
        } else {
            console.log('Price element does not exist');
        }

        if ($item('#removeButton')) {
            console.log('Remove button exists');
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
        } else {
            console.log('Remove button does not exist');
        }
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

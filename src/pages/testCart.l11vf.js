import wixStores from 'wix-stores';

$w.onReady(async function () {
    $w('#loadingIndicator').hide();
    try {
        const cart = await wixStores.cart.getCurrentCart();
        if (!cart || !cart.lineItems) {
            console.log('Нет данных в корзине или структура корзины не правильная');
            return;
        }

        // Извлекаем и форматируем данные товаров
        const products = cart.lineItems.map((s, index) => ({
            _id: (index + 1).toString(),
            id: s.id,
            title: s.name,
            price: s.price,
            image: s.mediaItem ? s.mediaItem.src : '' 
        }));

        $w('#repeater1').data = products;

        $w('#repeater1').onItemReady(($item, itemData, index) => {
            console.log(`Item data:`, itemData); 
      
            $item('#itemTitle1').text = itemData.title;
            $item('#itemPrice1').text = `$${itemData.price.toFixed(2)}`;
            $item('#itemImage1').src = itemData.image;

            $item('#removeItemButton').onClick(async () => {
                $w('#loadingIndicator').show();
                try {
                    await wixStores.cart.removeProduct(itemData.id);
                    const updatedData = $w('#repeater1').data.filter(product => product.id != itemData.id);
                    $w('#repeater1').data = updatedData;
                    updateTotalPrice(updatedData);
                } catch (err) {
                    console.log('Ошибка при удалении товара из корзины:', err);
                } finally {
                    $w('#loadingIndicator').hide();
                }
            });
        });

        $w('#clearCartButton').onClick(async () => {
            $w('#loadingIndicator').show();
            try {
                for (let item of products) {
                    await wixStores.cart.removeProduct(item.id);
                }
                $w('#repeater1').data = [];
                updateTotalPrice([]);
            } catch (err) {
                console.log('Ошибка при очищении корзины:', err);
            } finally {
                $w('#loadingIndicator').hide();
            }
        });

        $w('#placeOrderButton').onClick(() => {
            //wixStores.cart.checkout();
        });

        function updateTotalPrice(data) {
            const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
            $w('#totalPrice').text = `$${totalPrice.toFixed(2)}`;
        }

        updateTotalPrice(products);

    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
});

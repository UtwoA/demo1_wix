import wixStores from 'wix-stores';
$w.onReady(async function () {

    // Пример других обработчиков событий
    $w('#buttonContactUs').onClick(() => {
        $w('#footer1').scrollTo();
    });

    $w('#closeSecondFormButton').onClick(() => {
        $w('#submitButton').show();
        $w('#form15').hide();
    });
    $w('#submitButton').onClick(async () => {
        let userName = $w('#inputName').value;
        let userEmail = $w('#inputEmail').value;
        let userLastName = $w('#inputLastName').value;
        let userPhone = $w('#inputPhone').value;
        let userMessage = $w('#inputMessage').value;

        let cart = await wixStores.cart.getCurrentCart();
        let products = cart.lineItems.map(item => item.name).join(', ');

        if (userPhone && userEmail && products) {
            $w('#secondFormUserName').value = userName;
            $w('#secondFormUserEmail').value = userEmail;
            $w('#secondFormUserLastName').value = userLastName;
            $w('#secondFormUserPhone').value = userPhone;
            $w('#secondFormUserMessage').value = userMessage;
            $w('#secondFormProductName').value = products;

            $w('#form15').show();
            $w('#submitButton').hide();
        } 
    });

    $w('#button20').onClick(() => {
        let userName = $w('#secondFormUserName').value;
        let userLastName = $w('#secondFormUserLastName').value;
        let userPhone = $w('#secondFormUserPhone').value;
        let userEmail = $w('#secondFormUserEmail').value;
        let userMessage = $w('#secondFormUserMessage').value;
        let products = $w('#secondFormProductName').value;

    });
    $w('#loadingIndicator').hide();
    try {
        const cart = await wixStores.cart.getCurrentCart();
        if (!cart || !cart.lineItems || (cart.lineItems.length == 0)) {
            emptyCart();
            
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
            } finally {
                $w('#loadingIndicator').hide();
                emptyCart();
            }

        });

        $w('#placeOrderButton').onClick(() => {
            $w('#form14').scrollTo();
        });

        function updateTotalPrice(data) {
            const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
            $w('#totalPrice').text = `$${totalPrice.toFixed(2)}`;
        }
        updateTotalPrice(products);

        function emptyCart(){
            $w('#toProducts').show();
            $w('#emptyCartMessage').show();
            $w('#totalPrice').hide();
            $w('#clearCartButton').hide();
            $w('#placeOrderButton').hide();
        }
    }
    catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
});


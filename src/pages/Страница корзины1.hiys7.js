import wixStores from 'wix-stores';

$w.onReady(async function () {
    await loadCart();

    $w('#buttonContactUs').onClick(async () => {
        $w('#footer1').scrollTo();
    });

    $w('#closeSecondFormButton').onClick(async () => {
        $w('#submitButton').show();
        $w('#form15').hide();
    });

    $w('#checkoutButton').onClick(async () => {
        $w('#form14').scrollTo();
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
        } else {
            console.log("Пожалуйста, заполните все поля.");
        }
    });

    $w('#button20').onClick(() => {
        let userName = $w('#secondFormUserName').value;
        let userLastName = $w('#secondFormUserLastName').value;
        let userPhone = $w('#secondFormUserPhone').value;
        let userEmail = $w('#secondFormUserEmail').value;
        let userMessage = $w('#secondFormUserMessage').value;
        let products = $w('#secondFormProductName').value;

        console.log("Данные второй формы отправлены:", userName, userEmail);
    });
});

async function loadCart() {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        console.log("Содержимое корзины:", cart);

        const cartItems = cart.lineItems.map(item => {
            console.log("Товар в корзине:", item);
            return {
                _id: item.id,
                name: item.name || 'Неизвестный товар',
                price: item.totalPrice ? `${item.totalPrice} ${cart.currency.symbol}` : 'Цена не указана',
                quantity: item.quantity,
                image: item.mediaItem ? item.mediaItem.src : 'https://via.placeholder.com/150'
            };
        });

        console.log("Картированные товары:", cartItems);

        $w('#repeater1').data = cartItems;
        console.log("Данные переданы в репитер");
        setupRepeaterItems();
    } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
    }
}

function setupRepeaterItems() {
    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log("Данные элемента:", itemData);

        // Присвоение данных элементам репитера
        $item('#productName').text = itemData.name;
        $item('#productPrice').text = itemData.price;
        $item('#productImage').src = itemData.image;

        // Обработчик для кнопки удаления
        $item('#removeFromCartButton').onClick(() => {
            removeFromCart(itemData._id);
        });
    });
}

// Функция для удаления товара из корзины
async function removeFromCart(cartItemId) {
    try {
        await wixStores.cart.removeProduct(cartItemId);
        await loadCart(); // Перезагрузить корзину после удаления
    } catch (error) {
        console.error("Ошибка удаления из корзины:", error);
    }
}

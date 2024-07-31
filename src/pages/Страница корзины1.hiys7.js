import wixData from 'wix-data';
import wixStores from 'wix-stores';
import wixWindow from 'wix-window';

$w.onReady(function () {
    loadCart();
    $w('#buttonContactUs').onClick(async() => {
        $w('#footer1').scrollTo();
    });
    // @ts-ignore
    $w('#closeSecondFormButton').onClick(async() => {
        $w('#submitButton').show();
        $w('#form15').hide();
    });

    $w('#checkoutButton').onClick(async() => {
        $w('#form14').scrollTo();
    });
    // Обработчик нажатия на кнопку "Отправить форму" первой формы
    $w('#submitButton').onClick(async() => {
        // Получаем значения из полей первой формы
        let userName = $w('#inputName').value;
        let userEmail = $w('#inputEmail').value;
        let userLastName = $w('#inputLastName').value;
        let userPhone = $w('#inputPhone').value;
        let userMessage = $w('#inputMessage').value;

        let cart = await wixStores.cart.getCurrentCart();

        let products = cart.lineItems.map(item => item.name).join(', ');

        let orderDetails = {
            userName: userName,
            userEmail: userEmail,
            userLastName: userLastName,
            userPhone: userPhone,
            userMessage: userMessage,
            productName: products
        };
        
        // Проверка, что поля не пустые
        if (userPhone && userEmail && products) {
            // Заполняем вторую форму данными из первой формы
                $w('#secondFormUserName').value = userName;
                $w('#secondFormUserEmail').value = userEmail;
                $w('#secondFormUserLastName').value = userLastName;
                $w('#secondFormUserPhone').value = userPhone;
                $w('#secondFormUserMessage').value = userMessage;

                $w('#secondFormProductName').value = products;

            // Скрыть первую форму и показать вторую
            $w('#form15').show();
            $w('#submitButton').hide();
        } else {
            // Если поля пустые, можно показать сообщение об ошибке
            console.log("Пожалуйста, заполните все поля.");
        }
    });

    // Обработчик нажатия на кнопку "Отправить" второй формы
    $w('#button20').onClick(() => {
        // Логика отправки данных второй формы
        let userName = $w('#secondFormUserName').value;
        let userLastName = $w('#secondFormUserLastName').value;
        let userPhone = $w('#secondFormUserPhone').value;
        let userEmail = $w('#secondFormUserEmail').value;
        let userMessage = $w('#secondFormUserMessage').value;

        let products = $w('#secondFormProductName').value;

        // Здесь можно добавить логику для обработки данных второй формы
        console.log("Данные второй формы отправлены:", userName, userEmail);
    });
});

async function loadCart() {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        console.log("Cart contents:", cart); // Проверьте содержимое корзины
        
        // Обработка данных корзины
        const cartItems = cart.lineItems.map(item => ({
            _id: item._id, // Убедитесь, что это свойство доступно и правильно используется
            name: item.name || 'Неизвестный товар', // Используйте корректное свойство
            price: item.price.formatted || 'Цена не указана',
            quantity: item.quantity,
            image: item.mediaItem.url || 'URL изображения не указан'
        }));

        console.log("Mapped cart items:", cartItems); // Проверьте отформатированные данные

        $w('#repeater1').data = cartItems;
        setupRepeaterItems();
    } catch (error) {
        console.error("Error loading cart:", error);
    }
}


function setupRepeaterItems() {
    $w('#repeater1').forEachItem(($item, itemData) => {
        console.log("ItemData:", itemData); // Проверьте данные для каждого элемента
        $item('#productName').text = itemData.name;
        $item('#productPrice').text = itemData.price;
        $item('#productImage').src = itemData.image;

        $item('#removeFromCartButton').onClick(() => {
            removeFromCart(itemData._id);
        });
    });
}
// Функция для удаления товара из корзины
async function removeFromCart(cartItemId) {
    try {
        await wixStores.cart.removeProduct(cartItemId);
        loadCart(); // Перезагрузить корзину после удаления
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
}

$w('#repeater1').data = [
    {
        _id: "1",
        name: "Test Product",
        price: "$100",
        quantity: 1,
        image: "https://via.placeholder.com/150"
    }
];

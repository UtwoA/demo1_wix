import wixData from 'wix-data';
import wixStores from 'wix-stores';
import { cart } from 'wix-stores';

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
function loadCart() {
    cart.getCurrentCart()
        .then((cartData) => {
            $w('#cartRepeater').data = cartData.lineItems.map(item => ({
                _id: item._id,
                name: item.name,
                price: item.priceData.totalPrice,
                quantity: item.quantity,
                image: item.mediaItems[0].src
            }));
        })
        .catch((error) => {
            console.error(error);
        });
}
$w('#cartRepeater').onItemReady(($item, itemData) => {
    $item('#productName').text = itemData.name;
    $item('#productPrice').text = `$${itemData.price.formatted}`;
    $item('#productImage').src = itemData.image;

    $item('#removeFromCartButton').onClick(() => {
        removeFromCart(itemData._id);
    });
});

function removeFromCart(cartItemId) {
    cart.removeProduct(cartItemId)
        .then(() => {
            loadCart();
        })
        .catch((error) => {
            console.error(error);
        });
}
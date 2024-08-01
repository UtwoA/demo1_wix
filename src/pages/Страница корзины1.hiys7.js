import wixStores from 'wix-stores';
import { getCart, removeFromCart, clearCart } from 'backend/cart.jsw';


$w.onReady(async function () {

    // Пример других обработчиков событий
    $w('#buttonContactUs').onClick(() => {
        $w('#footer1').scrollTo();
    });

    $w('#closeSecondFormButton').onClick(() => {
        $w('#submitButton').show();
        $w('#form15').hide();
    });

    $w('#checkoutButton').onClick(() => {
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
    
    const cart = getCart();
    $w('#cartRepeater').data = cart;

    $w('#cartRepeater').onItemReady(($item, itemData, index) => {
        $item('#productName').text = itemData.productName;
        $item('#productPrice').text = itemData.productPrice.toString();
        $item('#productQuantity').text = itemData.quantity.toString();

        $item('#removeButton').onClick(() => {
            removeFromCart(itemData.productId);
            $w('#cartRepeater').data = getCart();
        });
    });

    $w('#clearCartButton').onClick(() => {
        clearCart();
        $w('#cartRepeater').data = [];
    });
});



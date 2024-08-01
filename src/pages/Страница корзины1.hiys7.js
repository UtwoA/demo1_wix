import wixStores from 'wix-stores';
import wixLocation from 'wix-location';

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
    









    console.log('CART');


    // Получение содержимого корзины при загрузке страницы
    wixStores.cart.getCurrentCart()
        .then((cart) => {
            const cartItems = cart.lineItems;
            $w('#repeater1').data = cartItems;
        })
        .catch((err) => {
            console.log('Ошибка при получении содержимого корзины:', err);
        });
    
    // Обновление интерфейса после изменения корзины
    function updateCart() {
        wixStores.cart.getCurrentCart()
            .then((cart) => {
                const cartItems = cart.lineItems;
                $w('#repeater1').data = cartItems;
            })
            .catch((err) => {
                console.log('Ошибка при обновлении интерфейса корзины:', err);
            });
    }

    // Привязка данных к элементам Repeater
    console.log('1');
    $w('#repeater1').onItemReady(($item, itemData) => {
        console.log('2');
        $item('#productImage').src = itemData.product.image; // Изображение товара
        $item('#productName').text = 'TESTNAME'; // Название товара
        $item('#productPrice').text = `$${itemData.product.price}`; // Цена товара

        // Обработка удаления товара из корзины
        $item('#removeButton').onClick(() => {
            wixStores.cart.removeProduct([itemData.product._id])
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


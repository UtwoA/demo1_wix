import { addToCart } from 'backend/cart.jsw';
$w.onReady(function () {
    $w('#buttonContactUs').onClick(async() => {
        $w('#footer1').scrollTo();
    });

    $w('#addToCartButton').onClick(() => {
        const product = {
            productId: $w('#productId').text, // предположим, у вас есть скрытое поле с ID продукта
            productName: $w('#productName').text,
            productPrice: parseFloat($w('#productPrice').text),
        };
        addToCart(product);
        console.log('Товар добавлен в корзину');
    });
});

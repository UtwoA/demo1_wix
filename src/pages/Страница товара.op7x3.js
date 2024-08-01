import wixData from 'wix-data';
$w.onReady(function () {
    $w('#buttonContactUs').onClick(async() => {
        $w('#footer1').scrollTo();
    });
});
export function addToCartButton_click(event) {
    // Получение данных товара из контекста кнопки
    const productId = event.context.item._id;
    const productName = event.context.item.productName;
    const productPrice = event.context.item.productPrice;

    // Проверка, есть ли товар уже в корзине
    wixData.query('cart')
        .eq('productId', productId)
        .find()
        .then((results) => {
            if (results.items.length > 0) {
                // Товар уже есть в корзине, увеличиваем количество
                let item = results.items[0];
                item.quantity += 1;
                wixData.update('cart', item);
            } else {
                // Товара нет в корзине, добавляем новый элемент
                wixData.insert('cart', {
                    productId: productId,
                    productName: productName,
                    productPrice: productPrice,
                    quantity: 1
                });
            }
        });
}

import wixStores from 'wix-stores';

wixStores.cart.getCurrentCart()
.then((cart) => {
    const cartItems = cart.lineItems;
    console.log(`Item data:`, cartItems);
})

$w.onReady(function () {
    const products = [
      { _id: '1', title: 'Product 1', price: 29.99, image: 'https://example.com/image1.jpg' },
      { _id: '2', title: 'Product 2', price: 39.99, image: 'https://example.com/image2.jpg' }
    ];
  
    $w('#repeater1').data = products;
  
    $w('#repeater1').onItemReady(($item, itemData, index) => {
      console.log(`Item data:`, itemData); // Вывод данных элемента в консоль
  
      $item('#itemTitle1').text = itemData.title;
      $item('#itemPrice1').text = `$${itemData.price.toFixed(2)}`;
      $item('#itemImage1').src = itemData.image;
    });
  });
  
  


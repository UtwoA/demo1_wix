import { local } from 'wix-storage';
import wixStores, { cart } from 'wix-stores';

$w.onReady(async function () {
    try {
        const cart = await wixStores.cart.getCurrentCart();
        if (!cart || !cart.lineItems) {
            console.log('Нет данных в корзине или структура корзины не правильная');
            return;
        }

        // Извлекаем и форматируем данные товаров
        const products = cart.lineItems.map(s => ({
            _id: (s.id + 1).toString(),
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
          
          $item('#removeItemButton').onClick(() => {
            removeItemFromCart(itemData._id);
            });
        });

    } catch (err) {
        console.log('Ошибка при получении содержимого корзины:', err);
    }
  });

  function removeItemFromCart(id){
    local.removeItem(id);
  }
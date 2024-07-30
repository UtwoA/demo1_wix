// Справочник по API: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {

	// Напишите свой код Javascript, используя API фреймворка Velo

	// Вывести Привет мир:
	// console.log(«Привет мир!»);

	// Вызовите функции на элементах страницы, напр.:
	// $w("#button1").label = «Кликнуть!»;

	// Кликнете «Запустить», или «Предпросмотр сайта», чтобы запустить код

});
import wixData from 'wix-data';
import wixStores from 'wix-stores';  // Убедитесь, что модуль доступен

$w.onReady(function () {
    $w("#submitButton").onClick(async () => {
        // Получаем данные из формы
        const formData = {
            name: $w("#nameInput").value,
            email: $w("#emailInput").value,
            // добавьте другие поля формы, если нужно
        };

        try {
            // Получаем данные из корзины
            const cart = await wixStores.cart.getCurrentCart();
            formData.items = cart.lineItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }));

            // Сохраняем данные в коллекцию
            await wixData.insert("FormSubmissions", formData);
            console.log("Data saved");

            // Отправляем уведомление по email
            sendFormSubmissionNotification(formData);
        } catch (err) {
            console.error("Error:", err);
        }
    });
});

// Функция для отправки уведомления по email через Wix
function sendFormSubmissionNotification(formData) {
    // Настройте внутреннее уведомление через Wix
    $w("#notification").show(); // Предполагается, что у вас есть элемент для отображения уведомлений
}

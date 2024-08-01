// Справочник по API: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
    $w('#buttonContactUs').onClick(async() => {
        $w('#footer1').scrollTo();
    });
    const elements = $w('#Страница категории.tdl3g.js').children; // Получение всех дочерних элементов страницы
  elements.forEach(el => {
    console.log(`Element: ${el.id}, Type: ${el.type}`);
  });
});
  

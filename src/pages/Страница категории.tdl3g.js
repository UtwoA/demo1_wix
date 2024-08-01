// Справочник по API: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
    $w('#buttonContactUs').onClick(async() => {
        $w('#footer1').scrollTo();
    });
    $w('#repeaterID').onItemReady(($item, itemData, index) => {
    console.log(`Item ID: ${$item.id}`);
    console.log(`Item Type: ${$item.type}`);
  });
});
  

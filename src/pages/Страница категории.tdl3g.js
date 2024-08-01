// Справочник по API: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
    $w('#buttonContactUs').onClick(async() => {
        $w('#footer1').scrollTo();
    });
    $w('#button1').onClick(async() => {
        console.log('find');
    });
});
  

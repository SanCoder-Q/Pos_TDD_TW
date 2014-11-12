function printInventory(barcodeList) {
  allItems = loadAllItems();

  var shoppingCart = [];
  var sumPrice = 0.0;

  allItems.forEach(function(item){
    barcodeList.forEach(function(barcode){
      if(barcode === item.barcode){
        shoppingCart.push({itemInfo:item, amount:1});
        sumPrice += item.price;
      }
    });
  });

  var itemsOutput = "";

  // var comma = "，";

  shoppingCart.forEach(function(item){
    itemsOutput += "名称：" + item.itemInfo.name + "，" +
    "数量：" + item.amount + item.itemInfo.unit + "，" +
    "单价：" + item.itemInfo.price.toFixed(2) + "(元)，" +
    "小计：" + (item.itemInfo.price * item.amount).toFixed(2) + "(元)\n";
  });


  var expectText =
    '***<没钱赚商店>购物清单***\n' +
    itemsOutput +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    '----------------------\n' +
    '总计：' + sumPrice.toFixed(2) + '(元)\n' +
    '节省：0.00(元)\n' +
    '**********************';

  console.log(expectText);
}

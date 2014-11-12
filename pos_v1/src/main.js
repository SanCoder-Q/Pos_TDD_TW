function printInventory(barcodeList) {
  allItems = loadAllItems();

  var shoppingCart = new ShoppintCart();
  var sumPrice = 0.0;

  barcodeList.forEach(function(barcode){
    allItems.forEach(function(item){
      if (barcode === item.barcode){
        shoppingCart.addItem(item);
        sumPrice += item.price;
      }
    });
  });

  var itemsOutput = "";

  var comma = "，";
  var seperator  = "----------------------\n";
  var borderline = "**********************";
  shoppingCart.shoppingList.forEach(function(item){
    itemsOutput += "名称：" + item.itemInfo.name + comma +
    "数量：" + item.amount + item.itemInfo.unit + comma +
    "单价：" + item.itemInfo.price.toFixed(2) + "(元)" + comma +
    "小计：" + (item.itemInfo.price * item.amount).toFixed(2) + "(元)\n";
  });


  var expectText =
    '***<没钱赚商店>购物清单***\n' + itemsOutput + seperator +
    '挥泪赠送商品：\n' + seperator + '总计：' + sumPrice.toFixed(2) + '(元)\n' +
    '节省：0.00(元)\n' + borderline;

  console.log(expectText);
}

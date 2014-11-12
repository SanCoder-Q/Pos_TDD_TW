function printInventory(barcodeList) {
  allItems = loadAllItems();

  var shoppingCart = new ShoppintCart();
  var sumPrice = 0.0;

  objectifyBarcodeList(barcodeList).forEach(function(barcodeInfo){

    allItems.forEach(function(item){
      if (barcodeInfo.barcode === item.barcode){
        shoppingCart.addItem(item, barcodeInfo.amount);
        sumPrice += item.price * barcodeInfo.amount;
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

function objectifyBarcodeList(barcodeList){
  var objectifyBarcodeList = [];
  barcodeList.forEach(function(barcodeInfo){
    var barcodeSplitResult = barcodeInfo.split("-");
    objectifyBarcodeList.push({
      barcode: barcodeSplitResult[0],
      amount: parseInt(barcodeSplitResult[1] || 1)
    });
  });
  return objectifyBarcodeList;
}

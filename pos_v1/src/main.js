function Promotion(){
  var promotionList = loadPromotions()[0];

  this.hasItem = function (item){
    for (var i in promotionList.barcodes){
      if (promotionList.barcodes[i] === item.barcode)
        return true;
    }
    return false;
  };

}

function printInventory(barcodeList) {
  allItems = loadAllItems();

  var shoppingCart = new ShoppintCart();


  objectifyBarcodeList(barcodeList).forEach(function(barcodeInfo){

    allItems.forEach(function(item){
      if (barcodeInfo.barcode === item.barcode){
        shoppingCart.addItem(item, barcodeInfo.amount);

      }
    });
  });


  var sumPrice = 0.0,
      sumDiscount = 0.0,
      promotion = new Promotion();

  shoppingCart.shoppingList.forEach(function(item){
    if (promotion.hasItem(item.itemInfo)){
      var discountAmount = Math.floor(item.amount / 3);
      item.kindredPrice = item.itemInfo.price * (item.amount - discountAmount);
      if (discountAmount != 0){
        shoppingCart.discountList.push({
          itemInfo: item.itemInfo,
          amount: discountAmount
        });
        sumDiscount += item.itemInfo.price * discountAmount;
      }
    }
    else {
      item.kindredPrice = item.itemInfo.price * item.amount;
    }
    sumPrice += item.kindredPrice;
  });


  var itemsOutput = "";

  var comma = "，";
  var seperator  = "----------------------\n";
  var borderline = "**********************";

  shoppingCart.shoppingList.forEach(function(item){
    itemsOutput += "名称：" + item.itemInfo.name + comma +
    "数量：" + item.amount + item.itemInfo.unit + comma +
    "单价：" + item.itemInfo.price.toFixed(2) + "(元)" + comma +
    "小计：" + item.kindredPrice.toFixed(2) + "(元)\n";
  });

  var discountOutput = "";
  shoppingCart.discountList.forEach(function(item){
    discountOutput += "名称：" + item.itemInfo.name + comma +
    "数量：" + item.amount + item.itemInfo.unit + "\n";
  });

  var expectText =
    '***<没钱赚商店>购物清单***\n' + itemsOutput + seperator +
    '挥泪赠送商品：\n' + discountOutput + seperator + '总计：' + sumPrice.toFixed(2) + '(元)\n' +
    '节省：' + sumDiscount.toFixed(2) + '(元)\n' + borderline;

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

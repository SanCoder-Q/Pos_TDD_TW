function Inventory(shoppingCart) {
  var comma = "，";
  var seperator  = "----------------------\n";
  var borderline = "**********************";

  var itemsOutput = "";
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

  var expectText = '***<没钱赚商店>购物清单***\n' + itemsOutput + seperator +
                   '挥泪赠送商品：\n' + discountOutput + seperator +
                   '总计：' + shoppingCart.sumPrice.toFixed(2) + '(元)\n' +
                   '节省：' + shoppingCart.sumDiscount.toFixed(2) + '(元)\n' +
                   borderline;

  this.getOutput = function(){return expectText;};
}

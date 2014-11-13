function ShoppintCart(){
  this.shoppingList = [];
  this.discountList = [];
  this.sumPrice = 0.0;
  this.sumDiscount = 0.0;

  this.selectItem = function(item){
    for (var i in this.shoppingList){
      if (this.shoppingList[i].itemInfo.barcode === item.barcode)
        return this.shoppingList[i];
    }
    return null;
  };

  this.addItem = function(item, amount){
    var cartItem = this.selectItem(item);
    if (cartItem === null) {
      this.shoppingList.push({ itemInfo: item, amount: amount });
    }
    else {
      cartItem.amount += amount || 1;
    }
  };

  this.updateByPromotion = function(promotion) {
    var shoppingCart = this;
    this.shoppingList.forEach(function(item){
      if (promotion.hasItem(item.itemInfo)){
        var discountAmount = Math.floor(item.amount / 3);
        item.kindredPrice = item.itemInfo.price * (item.amount - discountAmount);
        if (discountAmount !== 0){
          shoppingCart.discountList.push({
            itemInfo: item.itemInfo,
            amount: discountAmount
          });
          shoppingCart.sumDiscount += item.itemInfo.price * discountAmount;
        }
      }
      else {
        item.kindredPrice = item.itemInfo.price * item.amount;
      }
      shoppingCart.sumPrice += item.kindredPrice;
    });
  };
}

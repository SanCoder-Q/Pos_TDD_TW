function ShoppintCart(){
  this.shoppingList = [];

  this.selectItem = function(item){
    for (var i in this.shoppingList){
      if (this.shoppingList[i].itemInfo.barcode === item.barcode)
        return this.shoppingList[i];
    }
    return null;
  };

  this.addItem = function(item){
    var cartItem = this.selectItem(item);
    if (cartItem == null) {
      this.shoppingList.push({ itemInfo: item, amount: 1 });
    }
    else {
      cartItem.amount += 1;
    }
  };
}
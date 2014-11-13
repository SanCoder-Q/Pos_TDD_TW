function POS(barcodeList) {
  var barcodeObjList = objectifyBarcodeList(barcodeList);
  var shoppingCart = new ShoppintCart();
  var allItems = loadAllItems();

  barcodeObjList.forEach(function(barcodeInfo){
    allItems.forEach(function(item){
      if (barcodeInfo.barcode === item.barcode){
        shoppingCart.addItem(item, barcodeInfo.amount);
      }
    });
  });

  shoppingCart.updateByPromotion(new Promotion());

  var inventory = new Inventory(shoppingCart);

  this.getInventory = function(){
    return inventory.getOutput();
  };

  function objectifyBarcodeList(barcodeList){
    var barcodeObjList = [];
    barcodeList.forEach(function(barcodeInfo){
      var barcodeSplitResult = barcodeInfo.split("-");
      barcodeObjList.push({
        barcode: barcodeSplitResult[0],
        amount: parseInt(barcodeSplitResult[1] || 1)
      });
    });
    return barcodeObjList;
  }
}

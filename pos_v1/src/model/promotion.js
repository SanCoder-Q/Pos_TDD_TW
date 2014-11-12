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

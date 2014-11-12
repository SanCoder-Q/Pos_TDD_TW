function printInventory(barcodeList) {
  var pos = new POS(barcodeList);
  console.log(pos.getInventory());
}

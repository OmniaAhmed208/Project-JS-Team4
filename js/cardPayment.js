        // ============= count items added to card ===========

// catching main container for generated products items, to catch "Add to Card" elements
let container = document.querySelector('.products .info');

// giving window storage a name to change it easity
var myStorage = sessionStorage;

// catching "counter" element
if (document.getElementById("counter")) {
	document.getElementById("counter").innerHTML = myStorage.clickcount;
}
// counting every item added to card
function itemToCardCounter() {
  if (typeof(Storage) !== "undefined") {
    if (myStorage.clickcount) {
      myStorage.clickcount = Number(myStorage.clickcount) + 1;
    } else {
      myStorage.clickcount = 1;
    }
    document.getElementById("counter").innerHTML = myStorage.clickcount;
  }else {
    document.getElementById("counter").innerHTML = "not supported web storage";
  }
  return myStorage.clickcount;
}

// subtracting every item deleted from card
function delItemFromCardCounter(){
  myStorage.clickcount -= 1 ;
  if (myStorage.clickcount <= 0){
    myStorage.clickcount = 0
  }
  document.getElementById("counter").innerHTML = myStorage.clickcount;
}

// reset counter by >>Create Account<< button, but now we will do it by "loginBtn" button
function resetCounter(){
  if (myStorage.clickcount) {
	  myStorage.clickcount = 0;
  }
  document.getElementById("counter").innerHTML = 0;
}
if (document.getElementById("loginBtn")) {
	document.getElementById("loginBtn").onclick = resetCounter;
	window.onload = resetCounter;
}

        // ============= Display counted items in the card ===========

// Capturing added item's data as an object array
var itemDataArr, itemIndex;

function itemDatastoring(itemIndex){
  itemDataArr = arr[itemIndex];
  return itemIndex;
}

// Add user name and email to card header after login is accepted
let displayUserData = () => {
  let cardHeaderContent = ``;
  let cardHeader = document.querySelector('.cardHeaderUserData, .billHeaderUserData');
  cardHeaderContent = `<div class='container flex-row'>
                          <span class='d-flex'>Card Holder: ${localStorage.name}</span>
                          <span class='d-flex'>E-mail: ${localStorage.email}</span>
                        </div>`;
  cardHeader.innerHTML = cardHeaderContent;
}
if(loginAccepted = true){   // loginAccepted should be a boolean in login function
  displayUserData();
}

// Adding items data after clicking "Add to Card" button
let cardBody = ``;
// let cardArr = [];
displayCard = () => {
  if(!itemDataArr || !loginAccepted){return;}
  // let cardBody = ``;
  let card = document.getElementById('card');
  cardBody += `<div class='container row justify-content-around mb-4' data-id='${itemDataArr.id}'>
                <img class='col-4' id='image' src='${itemDataArr.image}'>
                <div class='col-7'>
                  <p class='fs-4' id='title'>${itemDataArr.title}</p>
                  <div class="d-flex flex-row justify-content-around">
                    <p> <span class='fw-bold'>Price </span><span id='price'>${itemDataArr.price} LE </span></p>
                    <div class="d-flex flex-row justify-content-between">
                      <i class="toCheckout btn" id="toCheckout" onclick="addItemToBill(${itemDataArr.id}); displayBill();">Confirm</i>
                      <i class="toTrash btn" id="toTrash" onclick="delItemFromCardCounter(); delItemFromCard(${itemDataArr.id});">Delete</i>
                    </div>
                  </div>
                </div>
              </div>`;
  card.innerHTML = cardBody;
  //  // For localstorage
  // cardArr.push(cardBody);
  // localStorage.setItem('itemsInCard', cardArr);
  return cardBody;
}

// Delete item from shopping card
function delItemFromCard(eleId){
  let toBeDeleted = document.querySelector(`[data-id="${eleId}"]`);
  toBeDeleted.remove();
}

// Delete all items in shopping card
function clearCard(){
  card.innerHTML = '';
  return;
}

        // ============= Filling Bill ===========

// Add item to bill page
var itemContainer, itemImg, itemTitle, itemPrice;
// var itemIdArr = [];
// localStorage.setItem('itemIdArr', '');
localStorage.setItem('itemImageInBill', '');
localStorage.setItem('itemTitleInBill', '');
localStorage.setItem('itemPriceInBill', '');

function addItemToBill(eleId){
  itemContainer = document.querySelector(`[data-id="${eleId}"]`);
  itemImg = itemContainer.querySelector("#image").src;
  itemTitle = itemContainer.querySelector("#title").innerHTML;
  itemPrice = itemContainer.querySelector("#price").innerHTML;
  // itemIdArr.push(eleId);
  // localStorage.itemIdArr = itemIdArr;
  localStorage.itemImageInBill = itemImg;
  localStorage.itemTitleInBill = itemTitle;
  localStorage.itemPriceInBill = itemPrice;
  console.log(localStorage.itemImageInBill, localStorage.itemTitleInBill, localStorage.itemPriceInBill);
  return itemImg, itemTitle, itemPrice;
}

var cardArr = [];
var bill = document.getElementById('tbody');
// localStorage.getItem('itemsInCard', '');
// if (window.onload) {
//   localStorage.itemsInCard = '';
// }

// Adding items data to bill table after clicking "Confirm" button in the card popup
let billBody = ``;
displayBill = () => {
  if(!itemContainer || !loginAccepted){return;}
  // let billBody = ``;
  billBody += `<tr class='billRecord'>
                <td class='itemCell'>
                  <img class='itemImgSm' src='${itemImg}'>
                  <span class='itemTitle'>${itemTitle}</span>
                </td>
                <td class='unitPriceCell'>${itemPrice}</td>
                <td class='qtyCell'>
                  <span id='itemQty>1</span>
                  <div>
                    <button id='plus' onclick="plusItem()">&plus;</button>
                    <button id='minus' onclick="minusItem()">&minus;</button>
                  </div>
                </td>
                <td class='priceCell'></td>
              </tr>`;
  // cardArr.push(billBody);
  // localStorage.itemsInCard = itemIdArr;
  if(bill){
    // for (let i = 0; i < localStorage.itemsInCard.length; i++) {
    //   bill.innerHTML += localStorage.itemsInCard[i];
    // }
    bill.innerHTML = billBody;
  }
  // // For localstorage
  // localStorage.itemsInCard = JSON.stringify(cardArr || []);

  return billBody, bill, cardArr;
}
// if (window.onload) {
//   displayBill();
// }

// // Table cells equations  // //

// increase the number of items for the same product
function plusItem(){
  let item = document.getElementById("itemQty");
  item.innerHTML += 1;
  return item.innerHTML;
}

// decrease the number of items for the same product
function minusItem(){
  let item = document.getElementById("itemQty");
  item.innerHTML -= 1;
  return item.innerHTML;
}

// price calculation after adding item number (itemQty)
function priceCalc(){
  let priceCell = document.getElementById("priceCell"); 
  for(let i = 0; i < cardArr.length; i++){
    let tableRow = cardArr[i];
    let unitPriceCell = tableRow.cells[1].innerHTML;
    let itemQty = tableRow.cells[2].ElementChild.innerHTML;
    var priceCellValue = unitPriceCell * itemQty;
  }
  if (priceCellValue) {
	priceCell.innerHTML = priceCellValue;
}
  return priceCellValue;
}
if(cardArr){
  priceCalc();
}

// Total price Calculations
function totalPriceEqu(){
  var total = document.getElementById("totalPrice");
  let totalVal = 0;
  for(var i = 0; i < bill.rows.legnth; i++){
    totalVal += Number(bill.rows[i].cells[3].innerHTML)
  }
  total.innerHTML = totalVal + ' LE';
  return total.innerHTML;
}
if(bill){
  totalPriceEqu();
}

function checkoutReceipt(){
  alert(`Hello mr/mrs ${localStorage.name} \n
         Total items number: ${cardArr.length} \n
         Cash: ${total.innerHTML} \n
         Thank you for your time!
      `);
      
  localStorage.itemIdArr = '';
}

// // Add item to bill page
// var itemContainer, itemImg, itemTitle, itemPrice;
// var itemIdArr = [];

// function addItemToBill(eleId){
//   itemContainer = document.querySelector(`[data-id="${eleId}"]`);
// //   itemContainer = document.querySelector(`#id${eleId}`);
//   for(let i = 0; i < arr.length; i++){
//     if(eleId === arr[i].id){
//         itemImg = arr[i].image;
//         itemTitle = arr[i].title;
//         itemPrice = arr[i].price;
//     }else{
//         return;
//     }
//     itemIdArr.push(arr[i].id);
//   }
//   console.log(itemIdArr);
//   return itemImg, itemTitle, itemPrice, itemIdArr;
// }

// var cardArr = [];
// var bill = document.querySelector('#tbody');

// // Adding items data to bill table after clicking "Confirm" button in the card popup
// let billBody = ``;
// displayBill = () => {
//   if(!itemContainer || !loginAccepted){return;}
//   for (let itemId in itemIdArr) {
//     billBody += `<tr class='billRecord'>
//                   <td class='itemCell'>
//                     <img class='itemImgSm' src='${itemImg}'>
//                     <span class='itemTitle'>${itemTitle}</span>
//                   </td>
//                   <td class='unitPriceCell'>${itemPrice}</td>
//                   <td class='qtyCell'>
//                     <span id='itemQty>1</span>
//                     <div>
//                       <button id='plus' onclick="plusItem()">&plus;</button>
//                       <button id='minus' onclick="minusItem()">&minus;</button>
//                     </div>
//                   </td>
//                   <td class='priceCell'></td>
//                 </tr>`;
//     if(bill){
//       bill.innerHTML += billBody;
//     }
//   }
//   return billBody, bill, cardArr;
// }
        // ============= count items added to card ===========

// catching main container for generated products items, to catch "Add to Card" elements
let container = document.querySelector('.products .info');

// giving window storage a name to change it easity
var myStorage = sessionStorage;

// catching "counter" element
// try { myStorage.clickcoun == null } catch(e) { console.log(e); }
document.getElementById("counter").innerHTML = myStorage.clickcount;

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
/* // catching every "Add to Card" button attached to their products   // this is archived
container.addEventListener("click", function(e){
  if(e.target.classList.contains("addToCardCounter")){
    var addCounter = document.querySelectorAll(".addToCardCounter");
    for(let i = 0; i < addCounter.length; i++){
      addCounter[i].addEventListener("click", itemToCardCounter);
    }
  }
}); */



// subtracting every item deleted from card
function delItemFromCardCounter(){
  myStorage.clickcount -= 1 ;
  if (myStorage.clickcount <= 0){
    myStorage.clickcount = 0
  }
  document.getElementById("counter").innerHTML = myStorage.clickcount;
}
/* // catching every "Delete from Card" button attached to their products on shopping card   // this is archived
container.addEventListener("click", function(e){
  if(e.target.classList.contains("addToCardCounter")){
    var delCounter = document.querySelectorAll(".delFromCardCounter");
    for(let i = 0; i < delCounter.length; i++){
      delCounter[i].addEventListener("click", delItemFromCard);
    }
  }
}); */

// reset counter by >>Create Account<< button, but now we will do it by "loginBtn" button
document.getElementById("loginBtn").onclick = function(){
  if (myStorage.clickcount) {
	  myStorage.removeItem("clickcount");
  }
  document.getElementById("counter").innerHTML = 0;
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
  let cardHeader = document.getElementById('cardHeaderUserData');
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
                <img class='col-4' src='${itemDataArr.image}'>
                <div class='col-7'>
                  <p class='fs-4' id='title'>${itemDataArr.title}</p>
                  <div class="d-flex flex-row justify-content-around">
                    <p> <span class='fw-bold'>Price </span><span id='price'>${itemDataArr.price} LE </span></p>
                    <div class="d-flex flex-row justify-content-between">
                      <i class="toCheckout btn" onclick="addItemToBill(${itemDataArr.id})">Confirm</i>
                      <i class="toTrash btn" id="toTrash" onclick="delItemFromCardCounter(); delItemFromCard(${itemDataArr.id});">Delete</i>
                    </div>
                  </div>
                </div>
              </div>`;
  card.innerHTML = cardBody;
  // For localstorage ============================
  // cardArr.push(cardBody);
  // localStorage.setItem('itemsInCard', cardArr);
  return cardBody;
}

// Add item to bill page
function addItemToBill(eleId){
  let itemContainer = document.querySelector(`[data-id="${eleId}"]`);
  var itemTitle = itemContainer.querySelector("#title").innerHTML;
  var itemPrice = itemContainer.querySelector("#price").innerHTML;
  return itemTitle, itemPrice;
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
  // It worked too   ===================================
  // let clearBtn = document.getElementById("clearBtn");
  // clearBtn.onclick = () => {
  //   const myNode = document.getElementById("card");
  //   while (myNode.lastElementChild) {
  //     myNode.removeChild(myNode.lastElementChild);
  //   }
  // }
}
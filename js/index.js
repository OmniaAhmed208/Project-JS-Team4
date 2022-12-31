var arr;
let data = function(apiLink){
            return new Promise((res,rej)=>{
                let myReq = new XMLHttpRequest();
                myReq.onload = function(){
                    if(this.readyState === 4 && this.status === 200){
                        res(JSON.parse(this.responseText));
                    }
                    else{
                        rej(Error("No Data"));
                    }
                }
                myReq.open("Get",apiLink);
                myReq.send();
            })
        }


        function displayData() {data("https://fakestoreapi.com/products").then(
            (fullData)=> {
                let items = ``;
                var requestedData = fullData;
                var result = [];
                if (document.getElementById("searchK")) {
	                var searchKey = document.getElementById("searchK").value;
                }
                // console.log(searchKey)
                var condition = searchKey == ''
                // console.log(condition)

                if (condition){
                    result = requestedData;
                    // console.log(result)
                }

                else if (!condition){
                    result = requestedData.filter(element => element.category == searchKey)
                    // console.log(result)
                }
                
                // console.log(result);

                for(let i=0; i < result.length ; i++){
                    // let col = document.getElementById('col')
                    items += `<div class="col-lg-4 col-md-6" id='item' onclick='display(${i})' data-bs-toggle="modal" data-bs-target="#popUp">
                                        <div class="items text-center">
                                            <img class='w-75' src='${result[i].image}'>
                                            <div class='layout'>                                            </div>

                                                <div class='inner-div'>
                                                <span class='title'>${result[i].title}</span>
                                                </div>
                                        </div>
                                    </div>
                               `;
                    if (document.getElementById('rowDiv')) {
                        document.getElementById('rowDiv').innerHTML = items;
                    }               
                } 
               arr = result;
               }
        )};
        displayData();

        // Display product in the modal
        let display = (index) => {
            let modalBody = ``;
            let modal = document.getElementById('modal');
                modalBody += `<div class='container row justify-content-around mb-4'>
                                <img class='col-4' src='${arr[index].image}'>
                                <div class='col-7'>
                                    <p class='fs-4'>${arr[index].title}</p>
                                    <p>${arr[index].description}</p>
                                    <p> <span class='fw-bold'>Price </span>${arr[index].price} LE</p>
                                    <button class='btn btn-outline-dark w-100' id='addToCardBtn' onclick='itemDatastoring(${index})'> 
                                        <p class='fw-light my-auto py-3'><i class="fa fa-cart-plus fs-5" aria-hidden="true"></i><span class='fs-6'> ADD TO CART</span></p>
                                    </button>

                                </div>
                              </div>`;
                modal.innerHTML = modalBody;
        }

       // ============= scroll to top ===========

    let scrollBtn = document.querySelector('.scroll');
    
    if(scrollBtn){
        window.onscroll = function(){

            // scroll top
            if(window.scrollY >= 1000){
                scrollBtn.style.display = 'block';
            }
            else{
                scrollBtn.style.display = 'none';
            }
            scrollBtn.onclick = function(){
                window.scrollTo ({
                    top:0,
                    left:0,
                    behavior:"smooth"
                })
            }
        };
    }
    // Popup code


        // ============= Display counted items in the card ===========

// catching main container for generated products items, to catch "Add to Card" elements
let container = document.querySelector('.products .info');

// Capturing added item's data as an object array
const itemDataArr = [];
var itemIndex;

function itemDatastoring(itemIndex){
  if(itemDataArr.includes(arr[itemIndex])) {
    counting = false;
    return;
  }
  itemDataArr.push(arr[itemIndex]);
  // catching "counter" element
  document.getElementById("counter").innerHTML = itemDataArr.length;
  return itemIndex, itemDataArr;
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
displayCard = () => {
  if(!itemDataArr || !loginAccepted){return;}
  let card = document.getElementById('card');
  for (let i = 0; i < itemDataArr.length; i++) {
    const itemDataArrObj = itemDataArr[i];
    cardBody += `<div class='container row justify-content-around mb-4' data-id='${itemDataArrObj.id}'>
                    <img class='col-4' id='image' src='${itemDataArrObj.image}'>
                    <div class='col-7'>
                      <p class='fs-4' id='title'>${itemDataArrObj.title}</p>
                      <div class="d-flex flex-row justify-content-around">
                        <p> <span class='fw-bold'>Price </span><span id='price'>${itemDataArrObj.price} LE </span></p>
                          <i class="toTrash btn" id="toTrash" onclick="delItemFromCard(${itemDataArrObj.id});">Delete</i>
                      </div>
                    </div>
                  </div>`;
      card.innerHTML = cardBody;
  }
  return cardBody;
}

// Delete item from shopping card
function delItemFromCard(eleId){
  let toBeDeleted = document.querySelector(`[data-id="${eleId}"]`);
  for (let i = 0; i < itemDataArr.length; i++) {
      if (eleId == itemDataArr[i].id) {
        itemDataArr.splice(i, 1);
      }
  }
  // catching "counter" element
  document.getElementById("counter").innerHTML = itemDataArr.length;
  toBeDeleted.remove();
  return itemDataArr;
}

// Delete all items in shopping card
function clearCard(){
  card.innerHTML = '';
  itemDataArr.length = 0;
  localStorage.billBodyArr = '';
  return;
}

        // ============= Filling Bill ===========

function saveItemDataArr() {
	localStorage.setItem('itemDataArr', JSON.stringify(itemDataArr));
  if (JSON.parse(localStorage.getItem('itemDataArr'))) {
    const itemDataArrLocal = JSON.parse(window.localStorage.getItem('itemDataArr'));
    return itemDataArrLocal;
  }
}

if(window.onload){
  localStorage.itemDataArr = '';
}

const cardArr = [];
var bill = document.querySelector('#tbody');

// Adding items data to bill table after clicking "Confirm" button in the card popup
let billBody = ``;
function displayBill(){
  if(!itemDataArr || !JSON.parse(localStorage.itemDataArr) || !loginAccepted){return;}
  for (let i = 0; i < JSON.parse(localStorage.itemDataArr).length; i++) {
    billBody = `<tr>
                  <span class='itemTitle'><strong>Item ${i}:</strong><small>${JSON.parse(localStorage.itemDataArr)[i].title}.</small></span>
                  </tr><tr class='billRecord w-100'>
                  <td class='col' id='itemCell'>
                    <img class='itemImgSm' src='${JSON.parse(localStorage.itemDataArr)[i].image}'>
                  </td>
                  <td class='col' id='unitPriceCell_${i}'>${JSON.parse(localStorage.itemDataArr)[i].price}</td>
                  <td class='col' id='qtyCell'>
                    <button class='incDec' id='plus' onclick="plusItem(${i}); priceCalc(${i});">&plus;</button>
                    <input class='itemQty' id='itemQty_${i}' type='number' value='1' min='0'>
                    <button class='incDec' id='minus' onclick="minusItem(${i}); priceCalc(${i});">&minus;</button>
                  </td>
                  <td class='priceCell col' id='priceCell_${i}'></td>
                </tr>`;
    bill.innerHTML += billBody;
  }
  return billBody, bill;
}

// // Table cells equations  // //

// increase the number of items for the same product
function plusItem(id){
  var value = parseInt(document.getElementById(`itemQty_${id}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById(`itemQty_${id}`).value = value;
}
// decrease the number of items for the same product
function minusItem(id){
  var value = parseInt(document.getElementById(`itemQty_${id}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById(`itemQty_${id}`).value = value;
}

const priceArr = [];
// price calculation after adding item number (itemQty)
function priceCalc(i){
  // for (i = 0; i < JSON.parse(localStorage.billBodyArr).length; i++) {
    let priceCell = document.querySelector(`#priceCell_${i}`);
    let unitPrice = Number(document.querySelector(`#unitPriceCell_${i}`).innerHTML);
    let itemQty = Number(document.querySelector(`#itemQty_${i}`).value);
    var priceCellValue = unitPrice * itemQty;
    priceCell.innerHTML = priceCellValue;
    return priceCellValue;
  // }
  priceArr.push(priceCellValue);
  // for (i = 0; i < JSON.parse(localStorage.billBodyArr).length; i++) {
  //   let priceCell = document.querySelector(`#priceCell_${i}`);
  //   let unitPrice = Number(document.querySelector(`#unitPriceCell_${i}`).innerHTML);
  //   let itemQty = Number(document.querySelector(`#itemQty_${i}`).value);
  //   var priceCellValue = unitPrice * itemQty;
  //   priceCell.innerHTML = priceCellValue;
  //   return priceCellValue;
  // }
  // priceArr.push(priceCellValue);
  // for(let j = 0; j < priceArr.length; j++){
  //   let itemsBillContainer = document.querySelector(".tbody");
  //   let itemRows = itemsBillContainer.querySelector(".billRecord");
  //   let priceCell = document.querySelector(`#priceCell_${j}`);
  //   priceCell.innerHTML = priceCellValue;
  // }
}

// Total price Calculations
function totalPriceEqu(){
  let total = document.getElementById("totalPrice");
  let priceCells = document.getElementsByClassName("priceCell");
  var totalVal = 0;
  for (let i = 0; i < priceCells.length; i++) {
    totalVal += parseFloat(priceCells[i].innerHTML);
  }
  total.innerHTML = totalVal + ' LE';
  return total.innerHTML;
}

if(window.location.href.match('bill.html')){
  displayBill();
  priceCalc();
  totalPriceEqu();
}

function checkoutReceipt(){
  alert(`Hello mr/mrs ${localStorage.name} \n
         Total items number: ${JSON.parse(localStorage.itemDataArr).length} \n
         Cash: ${total.innerHTML} \n
         Thank you for your purchase!
      `);
  localStorage.itemIdArr = '';
}

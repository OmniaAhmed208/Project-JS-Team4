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
        data("https://fakestoreapi.com/products").then(
            (result)=> {
                let items = ``;
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
        );

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
                        <div class="d-flex flex-row justify-content-between">
                          <i class="toCheckout btn" id="toCheckout" onclick="addItemToBill(${itemDataArrObj.id})">Confirm</i>
                          <i class="toTrash btn" id="toTrash" onclick="delItemFromCard(${itemDataArrObj.id});">Delete</i>
                        </div>
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
}

// Delete all items in shopping card
function clearCard(){
  card.innerHTML = '';
  itemDataArr.length = 0;
  billBodyArr.length = 0;
  localStorage.billBodyArr = '';
  return;
}

        // ============= Filling Bill ===========

// Add item to bill page
const billBodyArr = [];

function addItemToBill(eleId){
  for(let i = 0; i < itemDataArr.length; i++){
    if(eleId === itemDataArr[i].id){
      if(billBodyArr.includes(itemDataArr[i])) {
        return;
      }
      billBodyArr.push(itemDataArr[i]);
      return itemDataArr[i];
    }
  }
  return billBodyArr;
}

function saveConfirmedITems() {
	localStorage.setItem('billBodyArr', JSON.stringify(billBodyArr));
  if (JSON.parse(localStorage.getItem('billBodyArr'))) {
    const billBodyArrLocal = JSON.parse(window.localStorage.getItem('billBodyArr'));
    return billBodyArrLocal;
  }
}

if(window.onload){
  localStorage.billBodyArr = '';
}

const cardArr = [];
var bill = document.querySelector('#tbody');

// Adding items data to bill table after clicking "Confirm" button in the card popup
let billBody = ``;
function displayBill(){
  if(!billBodyArr || !JSON.parse(localStorage.billBodyArr) || !loginAccepted){return;}
  for (let i = 0; i < JSON.parse(localStorage.billBodyArr).length; i++) {
    billBody = `<tr class='billRecord w-100'>
                  <td class='col' id='itemCell'>
                    <img class='itemImgSm' src='${JSON.parse(localStorage.billBodyArr)[i].image}'>
                    <span class='itemTitle'><small>${JSON.parse(localStorage.billBodyArr)[i].title}</small></span>
                  </td>
                  <td class='col' id='unitPriceCell_${i}'>${JSON.parse(localStorage.billBodyArr)[i].price}</td>
                  <td class='col' id='qtyCell'>
                    <button class='incDec' id='plus' onclick="plusItem(${i})">&plus;</button>
                    <input class='itemQty' id='itemQty_${i}' type='number' value='1' min='0'>
                    <button class='incDec' id='minus' onclick="minusItem(${i})">&minus;</button>
                  </td>
                  <td class='col' id='priceCell_${i}'></td>
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
function priceCalc(){
  for (let i = 0; i < JSON.parse(localStorage.billBodyArr).length; i++) {
    let priceCell = document.querySelector(`#priceCell_${i}`);
    let unitPrice = Number(document.querySelector(`#unitPriceCell_${i}`).innerHTML);
    let itemQty = Number(document.querySelector(`#itemQty_${i}`).innerHTML);
    let priceCellValue = unitPrice * itemQty;
    priceCell.innerHTML = priceCellValue;
    return priceCellValue;
  }
  priceArr.push(priceCellValue);
}

// Total price Calculations
function totalPriceEqu(){
  let total = document.getElementById("totalPrice");
  var totalVal = 0;
  for (let i = 0; i < priceArr.length; i++) {
    totalVal += priceArr[i];
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
         Total items number: ${JSON.parse(localStorage.billBodyArr).length} \n
         Cash: ${total.innerHTML} \n
         Thank you for your time!
      `);
  localStorage.itemIdArr = '';
}














// var arr;
// let div = document.querySelector('.products .info');

//         let data = function(apiLink){
//             return new Promise((res,rej)=>{
//                 let myReq = new XMLHttpRequest();
//                 myReq.onload = function(){
//                     if(this.readyState === 4 && this.status === 200){
//                         res(JSON.parse(this.responseText));
//                     }
//                     else{
//                         rej(Error("No Data"));
//                     }
//                 }
//                 myReq.open("Get",apiLink);
//                 myReq.send();
//             })
//         }

//         function display() {data("https://fakestoreapi.com/products").then(
//             (fullData)=> {
//                 console.log(fullData);
//                 var requestedData = fullData;
//                 var productsSelected = [];
//                 var searchKey = document.getElementById("searchK").value;
//                 // console.log(searchKey)
//                 var condition = searchKey == ''
//                 // console.log(condition)

//                 if (condition){
//                     productsSelected = requestedData;
//                     // console.log(productsSelected)
//                 }

//                 else if (!condition){
//                     productsSelected = requestedData.filter(element => element.category == searchKey)
//                     // console.log(productsSelected)
//                 }
                
//                 // console.log(productsSelected);
//                 products(productsSelected)
                
//                }
//          )};
//          display()

//         function products(result){
//             let toBeRemoved = document.getElementsByClassName('pr')
//             console.log(toBeRemoved)
//             for(let i=0; i < toBeRemoved.length ; i++){
//                 let current = toBeRemoved[0];
//                 console.log(current)
//                 // var y = current.childNodes() 
//                 current.remove();    
//             } 
            

//             let row = document.createElement('div');
//             row.className = 'row pr';

//             div.appendChild(row);

//             for(let i=0; i < result.length ; i++){
                
//                 let col = document.createElement('div');
//                 col.className = 'col-lg-4 col-md-6';
                
//                 let items = document.createElement('div');
//                 items.className = 'items';
//                 items.setAttribute('id', "item");
//                 items.setAttribute('click', `displayModal(${i})`);
//                 items.setAttribute('data-bs-toggle', "modal");
//                 items.setAttribute('data-bs-target', "#popUp");

//                 let image = document.createElement('img');
//                 image.src = result[i].image;

//                 let layout = document.createElement('div');
//                 layout.className = 'layout';

//                 let inner =  document.createElement('div');
//                 inner.className = 'inner-div';

//                 let span = document.createElement('span');
//                 span.className = 'title';

//                 textSpan = document.createTextNode(result[i].title);

//                 row.appendChild(col);
//                 col.appendChild(items);
//                 items.appendChild(image);
//                 items.appendChild(layout);
//                 items.appendChild(inner);
//                 inner.appendChild(span);
//                 span.appendChild(textSpan);
//             }
//             arr = result;
//         }

//         // ============= Display product in the modal ===========
//         let displayModal = (index) => {
//             let modalBody = ``;
//             let modal = document.getElementById('modal');
//                 modalBody += `<div class='container row justify-content-around mb-4'>
//                                 <img class='col-4' src='${arr[index].image}'>
//                                 <div class='col-7'>
//                                     <p class='fs-4'>${arr[index].title}</p>
//                                     <p>${arr[index].description}</p>
//                                     <p> <span class='fw-bold'>Price </span>${arr[index].price} LE</p>
//                                     <button class='btn btn-outline-dark w-100' id='addToCardCounter' onclick='itemToCardCounter();itemDatastoring(${arr[index]})'> 
//                                         <p class='fw-light my-auto py-3'><i class="fa fa-cart-plus fs-5" aria-hidden="true"></i><span class='fs-6'> ADD TO CART</span></p>
//                                     </button>

//                                 </div>
//                               </div>`;
//                 modal.innerHTML = modalBody;
//         }


//         // ============= scroll to top ===========

//     let scrollBtn = document.querySelector('.scroll');
    
//     window.onscroll = function(){

//         // scroll top
//         if(window.scrollY >= 1000){
//             scrollBtn.style.display = 'block';
//         }
//         else{
//             scrollBtn.style.display = 'none';
//         }
//         scrollBtn.onclick = function(){
//             window.scrollTo ({
//                 top:0,
//                 left:0,
//                 behavior:"smooth"
//             })
//         }
//     };
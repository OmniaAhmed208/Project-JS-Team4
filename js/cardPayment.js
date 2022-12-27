        // ============= count items added to card ===========

// catching main container for generated products items, to catch "Add to Card" elements
let container = document.querySelector('.products .info');

// catching "counter" element
document.getElementById("counter").innerHTML = localStorage.clickcount;

// counting every item added to card
function itemToCardCounter() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("counter").innerHTML = localStorage.clickcount;
  }else {
    document.getElementById("counter").innerHTML = "not supported web storage";
  }
  return localStorage.clickcount;
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
function delItemFromCard(){
  localStorage.clickcount -= 1 ;
  document.getElementById("counter").innerHTML = localStorage.clickcount;
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
  localStorage.removeItem("clickcount");
  document.getElementById("counter").innerHTML = 0;
}


        // ============= Display counted items in the card ===========

// Capturing added item's data as an object array
var itemDataArr, itemData;
function itemDatastoring(itemData){
  console.log(itemData);
  return itemData;
}

function openCard(){

  let displayUserData = () => {
    let cardHeaderContent = ``;
    let cardHeader = document.getElementById('cardHeader');
    cardHeaderContent = `<div class 'container row justify-content-around mb-4>
                            <h4>Shopping Card</h4>
                            <p>Card Holder: ${localStorage.name}</p>
                            <p>E-mail: ${localStorage.email}</p>
                          </div>`;
    cardHeader.innerHTML = cardHeaderContent;
  }

  let displayCard = (index) => {
    let cardBody = ``;
    let card = document.getElementById('card');
    cardBody += `<div class='container row justify-content-around mb-4'>
                  <img class='col-4' src='${itemDataArr[index].image}'>
                  <div class='col-7'>
                    <p class='fs-4'>${itemDataArr[index].title}</p>
                    <div class="d-flex flex-row justify-content-around">
                      <p> <span class='fw-bold'>Price </span>${itemDataArr[index].price} LE</p>
                      <div class="d-flex flex-row justify-content-around">
                        <i class="toCheckout btn glyphicon glyphicon-shopping-cart" onclick='delItemFromCard()></i>
                        <i class="toTrash btn glyphicon glyphicon-trash"></i>
                      </div>
                    </div>
                  </div>
                </div>`;
    card.innerHTML = cardBody;
  }

}

let cardImg = document.getElementById("addToCard");
cardImg.addEventListener("click", openCard);


function addTask(){
  // Capture the task name text
  var taskNameCapture = document.getElementById("taskField").value;
   
  // Saving task name in local storage
  localStorage.setItem("taskName", taskNameCapture);
  console.log(localStorage);

  // Creating a div as a container to hold: task name, done btn, del btn
  var taskInList = document.createElement("div");
  // Giving that dit an Id tor styling
  taskInList.setAttribute("id", "taskContainerId");

  document.getElementById("list").append(taskInList);
  taskInList.append(taskNameCapture);
  // Creating a div as a container for done btn, and del btn
  var taskStatus = document.createElement("div");
  taskStatus.setAttribute("id", "taskStatusId");

  var taskDone = document.createElement("button");
  taskDone.setAttribute("id", "taskDoneId");
  taskDone.insertAdjacentHTML('afterbegin', "Done?");
  taskDone.addEventListener('click', () => {
    taskInList.textContent = `${taskNameCapture.value} is Done`;
    taskInList.style.backgroundColor = "rgba(93, 180, 81, 0.2)";
  });

  var taskDel = document.createElement("button");
  taskDel.setAttribute("id", "taskDelId");
  taskDel.insertAdjacentHTML('beforeend', "Delete?");
  taskDel.addEventListener('click', () => {
    taskInList.remove();
  });

  taskStatus.append(taskDone);
  taskStatus.append(taskDel);
  taskInList.append(taskStatus);

  listArr.push(taskInList);
  return taskInList;
  // return false;
}
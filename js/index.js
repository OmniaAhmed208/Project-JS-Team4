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
                    document.getElementById('rowDiv').innerHTML = items;
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
                                    <button class='btn btn-outline-dark w-100' id='addToCardCounter' onclick='itemToCardCounter();itemDatastoring(${arr[index]})'> 
                                        <p class='fw-light my-auto py-3'><i class="fa fa-cart-plus fs-5" aria-hidden="true"></i><span class='fs-6'> ADD TO CART</span></p>
                                    </button>

                                </div>
                              </div>`;
                modal.innerHTML = modalBody;
        }

        // ============= scroll to top ===========

    let scrollBtn = document.querySelector('.scroll');
    
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
    // Popup code




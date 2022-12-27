let div = document.querySelector('.products .info');

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

        function display() {data("https://fakestoreapi.com/products").then(
            (fullData)=> {
                console.log(fullData);
                var requestedData = fullData;
                var productsSelected = [];
                var searchKey = document.getElementById("searchK").value;
                // console.log(searchKey)
                var condition = searchKey == ''
                // console.log(condition)

                if (condition){
                    productsSelected = requestedData;
                    // console.log(productsSelected)
                }

                else if (!condition){
                    productsSelected = requestedData.filter(element => element.category == searchKey)
                    // console.log(productsSelected)
                }
                
                // console.log(productsSelected);
                products(productsSelected)
                
               }
         )};
         display()

        function products(result){
            let toBeRemoved = document.getElementsByClassName('pr')
            console.log(toBeRemoved)
            for(let i=0; i < toBeRemoved.length ; i++){
                let current = toBeRemoved[0];
                console.log(current)
                // var y = current.childNodes() 
                current.remove();    
            } 
            

            let row = document.createElement('div');
            row.className = 'row pr';

            div.appendChild(row);

            for(let i=0; i < result.length ; i++){
                
                let col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6';
                let items = document.createElement('div');
                items.className = 'items';

                let image = document.createElement('img');
                image.src = result[i].image;

                let layout = document.createElement('div');
                layout.className = 'layout';

                let inner =  document.createElement('div');
                inner.className = 'inner-div';

                let span = document.createElement('span');
                span.className = 'title';

                textSpan = document.createTextNode(result[i].title);

                row.appendChild(col);
                col.appendChild(items);
                items.appendChild(image);
                items.appendChild(layout);
                items.appendChild(inner);
                inner.appendChild(span);
                span.appendChild(textSpan);
            }
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
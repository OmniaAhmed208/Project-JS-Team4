
// show hide password
 const pwshowhide = document.querySelectorAll(".eye-icon");
 pwshowhide.forEach(eyeicon =>{
    eyeicon.addEventListener("click",()=>{
        let pwfiled = eyeicon.parentElement.parentElement.querySelectorAll(".password");
        pwfiled.forEach(password =>{
            if(password.type==="password"){
                password.type="text";
                eyeicon.classList.replace("bx-hide" , "bx-show");
                return;
            }
            password.type="password";
            eyeicon.classList.replace( "bx-show",  "bx-hide");
        })
    })

 })

//  storing data
function store(){

    let dataShopify = {
        name:localStorage.getItem('name')
    }    
    localStorage.setItem('dataShopify', JSON.stringify(dataShopify));

    if(localStorage.getItem('dataShopify')){
        console.log(true)
    }
    else{console.log(false)}

    var name = document.getElementById('name').value;
    var mail = document.getElementById('mail').value;
    var password = document.getElementById('password').value;
        localStorage.setItem('name', name);
        localStorage.setItem('Email', mail);
        localStorage.setItem('password', password);
}

//checking

function getStorage(){

    let dataShopify = {
        name:localStorage.getItem('name')
    }    
    localStorage.setItem('dataShopify', JSON.stringify(dataShopify));

    if(localStorage.getItem('dataShopify')){
        console.log(true)
    }
    else{console.log(false)}
    
    var storedEmail = localStorage.getItem('Email');
    var storedpass = localStorage.getItem('password');
    var erremf = document.querySelector(".error-contain");
    var errpwf = document.querySelector(".error-pass");
    var umail = document.getElementById('usermail');
    var upass = document.getElementById('userPw');
    var userRemember = document.getElementById("check");
     if(umail.value !== storedEmail  ) {
        // alert ("login falid");
        erremf.classList.add("invalid");
        event.preventDefault();
        return false ;
    }

   else if (upass.value !== storedpass){
        errpwf.classList.add("invalid");
        event.preventDefault();
        return false ;
    }
    else{
        console.log("ture");
    }
        // alert('login in passed'); 
        erremf.classList.remove("invalid");
        errpwf.classList.remove("invalid");  
        return true ;
    }

// forget pass
    function forgetpass() {

        let dataShopify = {
            name:localStorage.getItem('name')
        }    
        localStorage.setItem('dataShopify', JSON.stringify(dataShopify));
    
        if(localStorage.getItem('dataShopify')){
            console.log(true);
        }
        else{console.log(false)}

        
        var redirect = false;
        var localmail =localStorage.getItem('Email');
        var forgetpas = document.getElementById('fpass');
     var fmail =  document.getElementById('userfmail');
     var fmaileror = document.querySelector('.error-fmail');
     if(fmail.value != localmail){
        fmaileror.classList.add("invalid");
     }
     else{
        fmaileror.classList.remove("invalid");
        document.querySelector('.Forget').style.display ="block";
        document.getElementById("mySubmit").value = "Change Password"; 
        localStorage.setItem('password', forgetpas.value);
        
     }

    }

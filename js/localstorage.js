
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

    var name = document.getElementById('name').value;
    var mail = document.getElementById('mail').value;
    var password = document.getElementById('password').value;
        localStorage.setItem('name', name);
        localStorage.setItem('Email', mail);
        localStorage.setItem('password', password);
}

//checking

function getStorage(){
    var storedEmail = localStorage.getItem('Email');
    var storedpass = localStorage.getItem('password');
    var erremf = document.querySelector(".error-contain");
    var errpwf = document.querySelector(".error-pass");
    var umail = document.getElementById('usermail');
    var upass = document.getElementById('userPw');
    var userRemember = document.getElementById("check");
     if(umail.value !== storedEmail && upass.value !== storedpass) {
        // alert ("login falid");
        erremf.classList.add("invalid");
        errpwf.classList.add("invalid");
        event.preventDefault();
        return false ;
       
    }
        // alert('login in passed'); 
        erremf.classList.remove("invalid");
        errpwf.classList.remove("invalid");  
        return true ;
    }


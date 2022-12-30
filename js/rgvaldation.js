const form = document.querySelector(".formt"),
userfild = document.querySelector (".use-fild "),
username = document.querySelector (".user"),
emailfild = document.querySelector (".em-fild "),
email = document.querySelector (".em"),
passfild = document.querySelector (".pass-fild "),
pass = document.querySelector(".pw"),
cpassfild = document.querySelector (".cpass-fild "),
cpass = document.querySelector(".cpw");

// name validation
function usevalidation(){
    const usreix =/^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!username.value.match(usreix)){
        return userfild.classList.add("invalid");
    }
    return userfild.classList.remove("invalid");
}

//  password validation
function passvail(){
const passreix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
if(!pass.value.match(passreix)){
return passfild.classList.add("invalid");
}
return passfild.classList.remove("invalid");
}

// confirm pass validation
function cpassvalide(){
    if(pass.value!==cpass.value || cpass.value==="" ){
        return cpassfild.classList.add("invalid");
    }
    return cpassfild.classList.remove("invalid");
}





// email validation

function checkemail(){
    const emailrex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!email.value.match(emailrex)){
        return emailfild.classList.add("invalid");
    }
    return emailfild.classList.remove("invalid");
}

  


// calling fun for supmit buttun
form.addEventListener("submit" , (e)=>{
    e.preventDefault();    
    usevalidation();
    checkemail();
    passvail();
    cpassvalide();
    // calling fun in key up
    username.addEventListener("keyup",usevalidation()); 
    email.addEventListener("keyup",checkemail()); 
    pass.addEventListener("keyup",passvail());
    cpass.addEventListener("keyup",cpassvalide());
if(
    !userfild.classList.contains("invalid")&&
    !emailfild.classList.contains("invalid")&&
    !passfild.classList.contains("invalid")&&
    !cpassfild.classList.contains("invalid")
) {
    location.href= form.getAttribute("action")
}

});

const eyeLock = document.getElementsByClassName("eye-lock")
const eyeOn = document.getElementsByClassName("eye-on")
const inputPass = document.getElementById("password")


eyeLock[0].style.display = "none"


eyeOn[0].addEventListener("click", ()=>{
    eyeOn[0].style.display = "none"
    eyeLock[0].style.display = "block"
    inputPass.type = "text"
    inputPass.style.borderRight = "none"
})

eyeLock[0].addEventListener("click", ()=>{
    eyeLock[0].style.display = "none"
    eyeOn[0].style.display = "block"
    inputPass.type = "password"
    
})

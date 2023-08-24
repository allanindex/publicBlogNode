const icone = document.querySelector(".menu-icon")
const icone_close = document.querySelector(".close-menu-icon")
const logo =  document.querySelector(".logo")
const menu_list = document.querySelector(".list")
const list = document.getElementsByTagName("ul")
const nav = document.querySelector(".nav")

icone.addEventListener("click", ()=>{
    icone.style.display = "none"
    icone_close.style.display = "block"
    menu_list.style.display = "block"
    list[0].style.display = "block"
    nav.style.minHeight = "35vh"
    nav.style.maxHeight = "40vh"
    nav.style.display = "flex"
    nav.style.alignItems = "flex-start"
    nav.style.paddingTop = "30px"
    nav.style.paddingBottom = "20px"
})

icone_close.addEventListener("click", ()=>{
    icone.style.display = "block"
    icone_close.style.display = "none"
    menu_list.style.display = "none"
    nav.style.minHeight = "10vh"
    nav.style.display = "flex"
    nav.style.alignItems = "center"
    nav.style.justfyContent = "center"
    nav.style.paddingTop = "30px"
    nav.style.paddingBottom = "20px"
})
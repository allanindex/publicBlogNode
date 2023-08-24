const checkDelete = document.querySelector("#deleteCategoria")
const checkboxs  = document.getElementsByName("checkbox")
checkDelete.addEventListener("click", ()=>{
    for(let i = 0; i < checkboxs.length; i++){
        checkboxs[i].checked = false
    }
})
for(let j = 0; j < checkboxs.length; j++){
    checkboxs[j].addEventListener("click", ()=>{
        checkDelete.checked = false
    })
}

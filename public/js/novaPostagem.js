const texto1 = document.querySelector("#texto1");
const texto2 = document.querySelector("#texto2");
const texto3 = document.querySelector("#texto3");

    texto1.addEventListener('focus', ()=>{
        texto1.classList.add("input-focus")
    })
    texto1.addEventListener('blur', ()=>{
       texto1.classList.remove("input-focus")
    })

    texto2.addEventListener('focus', ()=>{
        texto2.classList.add("input-focus")
    })
    texto2.addEventListener('blur', ()=>{
       texto2.classList.remove("input-focus")
    })

    texto3.addEventListener('focus', ()=>{
        texto3.classList.add("input-focus")
    })
    texto3.addEventListener('blur', ()=>{
       texto3.classList.remove("input-focus")
    })

    const fileInput1 = document.getElementById('fileInput1');
    const fileLabel1 = document.getElementById('fileLabel1');
    const fileNameSpan1 = document.getElementById('fileName1');

    fileInput1.addEventListener('change', () => {
        const fileName1 = fileInput1.value.split('\\').pop();
        fileNameSpan1.textContent = fileName1;
        fileLabel1.classList.remove('labelImg');
        fileLabel1.classList.add('file-selected');
        
    });

    const fileInput2 = document.getElementById('fileInput2');
    const fileLabel2 = document.getElementById('fileLabel2');
    const fileNameSpan2 = document.getElementById('fileName2');

    fileInput2.addEventListener('change', () => {
        const fileName2 = fileInput2.value.split('\\').pop();
        fileNameSpan2.textContent = fileName2;
        fileLabel2.classList.remove('labelImg');
        fileLabel2.classList.add('file-selected');
        
    });

    const fileInput3 = document.getElementById('fileInput3');
    const fileLabel3 = document.getElementById('fileLabel3');
    const fileNameSpan3 = document.getElementById('fileName3');

    fileInput3.addEventListener('change', () => {
        const fileName3 = fileInput3.value.split('\\').pop();
        fileNameSpan3.textContent = fileName3;
        fileLabel3.classList.remove('labelImg');
        fileLabel3.classList.add('file-selected');
        
    });
    
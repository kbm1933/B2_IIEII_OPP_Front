const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']


const fileInput = document.getElementById("file")

const handleFiles = (e) => {
    const fileReader = new FileReader()
    const selectedFile = fileInput.files;
    fileReader.readAsDataURL(selectedFile[0])
    fileReader.onload = function(){
        document.getElementById("previewImg").src = fileReader.result
    }
}
fileInput.addEventListener("change", handleFiles)

function checkOnlyOne(element){
    const checkboxes = document.getElementsByName("dnn-models")

    checkboxes.forEach((cb) => {
        cb.checked = false
    })
    element.checked=true
}

async function handleuploadimg(){

    const img = document.querySelector('#file')
    
    const checks = document.getElementsByName('dnn-models').length
    for (var i=0; i<checks; i++){
        if (document.getElementsByName('dnn-models')[i].checked == true){
            dnn_num = document.getElementsByName('dnn-models')[i].value
            console.log(dnn_num)
        }
    }
    
    const formdata = new FormData()
    console.log(dnn_num)
    formdata.append('input_image',img.files[0])
    formdata.append('number', dnn_num)

    const response = await fetch('http://127.0.0.1:8000/articles/imgtoop/', {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access')
        },
        method: 'POST',
        body: formdata
    }
    )
}
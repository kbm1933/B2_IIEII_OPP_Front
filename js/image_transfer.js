const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

// 사진 미리보기
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

// 체크한 사진 보기
function checkedImgView(element){
    const modelnum = element.value
    var intmodelnum = parseInt(modelnum)
    switch(intmodelnum){
        case 1:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/mosaic.jpg'
            break
        case 2:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/candy.jpg'
            break
        case 3:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/feathers.jpg'
            break
        case 4:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/starrynight.jpg'
            break
        case 5:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/lamuse.jpg'
            break
        case 6:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/scream.jpg'
            break
        case 7:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/udnie.jpg'
            break
        case 8:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/composition7.jpg'
            break
        case 9:
            $img = document.querySelector(".checked-Img-box>img")
            $img.src = '../images/models_original/thewave.jpg'
            break
    }
}

// 중복 체크 불가
function checkOnlyOne(element){
    const checkboxes = document.getElementsByName("dnn-models")

    checkboxes.forEach((cb) => {
        cb.checked = false
    })
    element.checked=true
}

// 이미지 업로드 함수
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
    ).then(window.location.replace('article_create.html'))
}
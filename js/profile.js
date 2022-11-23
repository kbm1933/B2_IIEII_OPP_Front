const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const username = personObj['username']

console.log('profile 불러옴')


window.onload = async function loaduseruploadimg(){
    const response = await fetch (`http://127.0.0.1:8000/users/${userId}/profile/`, {method:"GET"})

    response_json = await response.json()
    console.log(response_json)

    // 로딩시 user 이름 가져오기
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const user_name = document.getElementById('user_name')
    user_name.innerText = payload_parse.username

}

async function oilpaintingimglist(){
    const oilpainting_img = document.getElementById('oilpainting_img')

    response_json.forEach(element => {

        const img = document.createElement("IMG")
        img.setAttribute("src", element.profile_img)
        
        oilpainting_img.appendChild(img)
    });
}



async function imgupload(){
        
    const profile_img = document.querySelector('#file')
    console.log(profile_img)
    
    const formdata = new FormData()
    
    formdata.append('input_img',profile_img.files[0])


    const response = await fetch(`http://127.0.0.1:8000/users/${userId}/profile/`,{
        headers: { 
                    'Authorization': 'Bearer '+ localStorage.getItem('access')
                },
        method: 'POST',
        body: formdata

    })

}


// basetool을 위한 로그아웃 기능
function handleLogout(){
    localStorage.clear()
    window.location.replace("login.html")
}
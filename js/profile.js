const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const username = personObj['username']

console.log('profile 불러옴')

// 로딩 될때 user 이름과 프로필 사진을 불러옴
window.onload = async function loaduseruploadimg(){
    const response = await fetch (`http://127.0.0.1:8000/users/${userId}/profile/`, {method:"GET"})

    response_json = await response.json()
    console.log(response_json)

    // 로딩시 user 이름 가져오기
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const user_name = document.getElementById('user_name')
    user_name.innerText = payload_parse.username

    const user_profile_img = response_json['profile_img']
    console.log(user_profile_img)

    const img = document.getElementById('user_profile_img')
    img.setAttribute('src', `http://127.0.0.1:8000${user_profile_img}`)


}


// 프로필 사진 업로드 및 수정 하기
async function userProfileUpload(){
    const img = document.querySelector('#file')
    
    const formdata = new FormData()
    formdata.append('profile_img',img.files[0])

    const response = await fetch(`http://127.0.0.1:8000/users/${userId}/profile/`, {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access')
        },
        method: 'PUT',
        body: formdata
    }
    )
}



// 이건 전체 이미지 (main과 동일)
async function oilpaintingimglist(){

    const response = await fetch ('http://127.0.0.1:8000/articles/',{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const img_box = document.getElementById('img_box')
    response_json.filter(element => {
        const img_tag = document.createElement('a')
        img_tag.href = '/html/article_detail.html'
        img_tag.onclick = function() {
            localStorage.setItem("article_id", element.id)
        }

        const article_img = document.createElement('img')
        article_img.src = `http://127.0.0.1:8000${element.img.output_image}`
        article_img.style.width = '250px';
        article_img.style.height = '250px';
        article_img.style.margin = '10px 15px';
        article_img.style.borderRadius = '15%'
        article_img.onmouseover = function() { 
            article_img.src = `http://127.0.0.1:8000${element.img.input_image}`
        }
        article_img.onmouseout = function() { 
            article_img.src = `http://127.0.0.1:8000${element.img.output_image}`
        }

        img_tag.appendChild(article_img)
        img_box.appendChild(img_tag)

    })    

}



// basetool을 위한 로그아웃 기능
function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}
const main_url = "http://127.0.0.1:8000"
const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const username = personObj['username']

console.log('profile 불러옴')

window.onload = () => {
    loaduseruploadimg();
    load_follow_list();
}


// 로딩 될때 user 이름과 프로필 사진을 불러옴
async function loaduseruploadimg(){
    const response = await fetch (`${main_url}/users/${userId}/profile/`, {method:"GET"})

    response_json = await response.json()

    // 로딩시 user 이름 가져오기
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const user_name = document.getElementById('user_name')
    user_name.innerText = payload_parse.username

    const user_profile_img = response_json['profile_img']

    const img = document.getElementById('user_profile_img')
    img.setAttribute('src', `${main_url}${user_profile_img}`)

        // 사진 미리보기
    const fileInput = document.getElementById("file")
    const handleFiles = (e) => {
        const fileReader = new FileReader()
        const selectedFile = fileInput.files;
        fileReader.readAsDataURL(selectedFile[0])
        fileReader.onload = function(){
            document.getElementById("user_profile_img").src = fileReader.result
        }
    }
    fileInput.addEventListener("change", handleFiles)

}


// 프로필 사진 업로드 및 수정 하기
async function userProfileUpload(){
    const img = document.querySelector('#file')
    
    const formdata = new FormData()
    formdata.append('profile_img',img.files[0])

    const response = await fetch(`${main_url}/users/${userId}/profile/`, {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access')
        },
        method: 'PUT',
        body: formdata
    }
    )
}


// user와 같은 id값을 가진 게시글만 가져오기
async function oilpaintingimglist(){
    const payload = localStorage.getItem('payload')
    const personObj = JSON.parse(payload)
    const userId = personObj['user_id']

    const response = await fetch (`${main_url}/articles/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()


    // user와 같은 id값을 가진 게시글만 가져올 수 있게 걸러주는 함수
    var my_articles = new Array
    response_json.forEach(element => {
        if (element.article_user == userId){
            my_articles.push(element)
        }
    })
    

    const img_box = document.getElementById('img_box')
    my_articles.forEach(element => {
        const img_tag = document.createElement('a')
        img_tag.href = '/html/article_detail.html'
        img_tag.onclick = function() {
            localStorage.setItem("article_id", element.id)
        }

        const article_img = document.createElement('img')
        article_img.src = `${main_url}${element.img.output_image}`
        article_img.style.width = '250px';
        article_img.style.height = '250px';
        article_img.style.margin = '10px 15px';
        article_img.style.borderRadius = '15%'
        article_img.onmouseover = function() { 
            article_img.src = `${main_url}${element.img.input_image}`
        }
        article_img.onmouseout = function() { 
            article_img.src = `${main_url}${element.img.output_image}`
        }

        img_tag.appendChild(article_img)
        img_box.appendChild(img_tag)

    })    
}


// basetool을 위한 로그아웃 기능
function handleSignout(){
    const response = fetch (`${main_url}/users/signout/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'POST',
    })
    localStorage.clear()
    window.location.replace("signin.html")
}


// 팔로우
async function load_follow_list(){
    const payload = localStorage.getItem('payload')
    const personObj = JSON.parse(payload)
    const userId = personObj['user_id']

    const response = await fetch (`${main_url}/users/${userId}/follow/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })
    response_json = await response.json()

    console.log(response_json)
    
    // 나의 팔로우 목록
    var my_followings = new Array
    response_json.forEach(element => {
        if (element.id == userId){
            my_followings = element.followings
        }
    })
    var my_followings_id = new Array
    my_followings.forEach(element => {
        my_followings_id.push(element['id'])
    })


    // 팔로우 박스
    const follow_box = document.getElementById('follow-box')
    response_json.forEach(element => {
        // 본인 건너뛰기
        if (element.id == userId){
            return;
        }

        const username = document.createElement('h4')
        username.innerText = element.username
        const follow = document.createElement('p')
        follow.innerText = element.follower + ' follower  ' + element.following + ' following'
        const hr = document.createElement('hr')

        const pro_img = document.createElement('img')
        pro_img.src = `${main_url}${element.profile_img}`
        pro_img.style.width = '50px';
        pro_img.style.height = '50px';
        
        // 팔로우 버튼
        const follow_btn = document.createElement('button')
        follow_btn.style.width = '100px'
        follow_btn.style.height = '30px'

        if (my_followings_id.includes(element.id)) {
            follow_btn.style.backgroundColor = 'lightgray'
            follow_btn.innerText = '언팔로우'
        } else {
            follow_btn.style.backgroundColor = 'lightblue'
            follow_btn.innerText = '팔로우'
        }
        
        follow_btn.onclick = async function() {
            const response = await fetch(`${main_url}/users/${element.id}/follow/`,{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access'),
                },
                method : 'POST',
                body:{}
            })
            window.location.reload()
        }
        
        follow_box.append(pro_img)
        follow_box.append(username)
        follow_box.append(follow)
        follow_box.append(follow_btn)
        follow_box.append(hr)
        
    })
}


function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}
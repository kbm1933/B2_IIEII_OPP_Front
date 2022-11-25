const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

window.onload = () => {
    load_follow_list();
}

async function load_follow_list(){
    const payload = localStorage.getItem('payload')
    const personObj = JSON.parse(payload)
    const userId = personObj['user_id']

    const response = await fetch (`http://127.0.0.1:8000/users/${userId}/follow/`,{
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
            const response = await fetch(`http://127.0.0.1:8000/users/${element.id}/follow/`,{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access'),
                },
                method : 'POST',
                body:{}
            })
            window.location.reload()
        }
        
        follow_box.append(username)
        follow_box.append(follow)
        follow_box.append(follow_btn)
        follow_box.append(hr)
        
    })
}
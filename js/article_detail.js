const main_url = "http://127.0.0.1:8000"

window.onload = () => {
    load_detail();
}

const articleId = localStorage.getItem('article_id')
const commentId = localStorage.getItem('comment_id')
const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

async function load_detail(){

    const response = await fetch (`${main_url}/articles/${articleId}/detail/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const title = document.getElementById('detail_title')
    title.innerText = response_json.title
    const content = document.getElementById('detail_content')
    content.innerText = response_json.content

    const user = document.getElementById('username')
    user.innerText = '작성자 : ' + response_json.article_user

    const img = document.getElementById('detail_img')
    img.src = `${main_url}${response_json.img.output_image}`
    img.onmouseover = function() { 
        img.src = `${main_url}${response_json.img.input_image}`
    }
    img.onmouseout = function() { 
        img.src = `${main_url}${response_json.img.output_image}`
    } 

    const like = document.getElementById('btn_img')

    const dislike_img = 'https://cdn-icons-png.flaticon.com/512/3669/3669713.png'
    const like_img = 'https://cdn-icons-png.flaticon.com/512/3670/3670159.png'

    if(response_json.likes.includes(userId)){
        like.src = like_img
    } else {
        like.src = dislike_img

    }
        
    const like_count = document.getElementById('like_cnt')
    like_count.innerText = 'likes' + response_json.likes_count

    like_btn.onclick = async function() {
        
        const response = await fetch(`${main_url}/articles/${response_json.id}/likes/`,{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            },
            method : 'POST',
            body:{}
        })
            if(like.src == dislike_img){
                like.src = like_img
            } else {
                like.src = dislike_img
            }
            location.reload()
    }

    
    const comment_list = document.getElementById('comment_list')
    let output = ''

    response_json.comment_set.reverse().forEach(element => {
        output += `
        <input class="form-control" type="text" value="${element.content}           -${element.article_user}" readonly>
        `
    })
    comment_list.innerHTML = output
}

async function handleDelete(){

    const response = await fetch(`${main_url}/articles/${articleId}/detail/`, {
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'DELETE',
        body : {}
    })
    window.location.replace('main.html')
    
}

async function handleAddItem(){
    const itemInput = document.getElementById('input_comment').value

    const response = await fetch(`${main_url}/articles/${articleId}/comment/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "content":itemInput
        })
    })
    window.location.reload()
}

async function handleEditComment(){
    const comment_input = document.getElementById('input_comment')

    const response = await fetch(`${main_url}/articles/${articleId}/comment/${commentId}/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'PUT',
        body : JSON.stringify({
            "content":comment_input
        })
    })
    window.location.reload()

}

async function handleDeleteComment(){

    const response = await fetch(`${main_url}/articles/${articleId}/comment/${commentId}/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'DELETE',
        body : {}
    })
    window.location.replace('article_detail.html')
    window.console.log('delete')
}

function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}

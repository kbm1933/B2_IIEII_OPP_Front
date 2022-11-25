window.onload = () => {
    load_detail();
}

const articleId = localStorage.getItem('article_id')
async function load_detail(){

    const response = await fetch (`http://127.0.0.1:8000/articles/${articleId}/detail/`,{
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

    // 이름으로 변경해야함
    const user = document.getElementById('username')
    user.innerText = '작성자 : ' + response_json.article_user

    const img = document.getElementById('detail_img')
    img.src = `http://127.0.0.1:8000${response_json.img.output_image}`
    img.onmouseover = function() { 
        img.src = `http://127.0.0.1:8000${response_json.img.input_image}`
    }
    img.onmouseout = function() { 
        img.src = `http://127.0.0.1:8000${response_json.img.output_image}`
    } 
}

async function handleDelete(){

    const response = await fetch(`http://127.0.0.1:8000/articles/${articleId}/detail/`, {
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'DELETE',
        body : {}
    })
    window.location.replace('main.html')
    
}

function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}

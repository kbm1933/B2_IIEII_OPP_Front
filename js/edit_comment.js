const main_url = "http://127.0.0.1:8000"

window.onload = () => {
    load_detail();
}
const articleId = localStorage.getItem('article_id')
async function load_edit(){

    const response = await fetch(`http://127.0.0.1:8000/articles/${articleId}/comment/detail/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const img = document.createElement('img')
    img.src = `${main_url}${response_json.img.output_image}` 
    img.style.display = 'flex';
    img.style.width = '400px';
    img.style.height = '400px'
    img.style.margin = '20px';
    img.style.borderRadius='15%'

    const img_div = document.getElementById('output_img_tag')
    img_div.appendChild(img)
    
    const pre_content = document.getElementById('comment_list')
    pre_content.value = response_json.content

}

async function handleEditComment(){
    const comment_input = document.getElementById('comment_list')

    const response = await fetch(`http://127.0.0.1:8000/articles/${articleId}/comment/detail/`,{
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

    const response = await fetch(`http://127.0.0.1:8000/articles/${articleId}/comment/detail/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'DELETE',
        body : {}
    })
    window.location.replace('article_detail.html')
    
}
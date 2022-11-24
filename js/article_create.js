window.onload = () => {
    setTimeout(() => load_article(), 2000)
}

async function load_article(){
    const response = await fetch ('http://127.0.0.1:8000/articles/imgtoop/2/',{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const img = document.createElement('img')
    img.src = `http://127.0.0.1:8000${response_json.output_image}` 
    img.style.display = 'flex';
    img.style.width = '300px';
    img.style.margin = '20px';

    const img_div = document.getElementById('output_img_tag')
    img_div.appendChild(img)

}

async function create_article(){
        
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    console.log(title, content, response_json.id)

    const response = await fetch ('http://127.0.0.1:8000/articles/imgtoop/2/',{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "title":title,
            "content":content,
            "img":response_json.id
        })
    })
    window.location.replace('main.html')
}


function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}

const main_url = "http://127.0.0.1:8000"

window.onload = () => {
    setTimeout(() => load_article(), 3000)
}

async function load_article(){
    const response = await fetch (`${main_url}/articles/imgtoop/2/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const img = document.createElement('img')
    img.src = `${main_url}${response_json.output_image}` 
    img.style.display = 'flex';
    img.style.width = '400px';
    img.style.height = '400px'
    img.style.margin = '20px';
    img.style.borderRadius='15%'

    const img_div = document.getElementById('output_img_tag')
    img_div.appendChild(img)

}

async function create_article(){
        
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    console.log(title, content, response_json.id)

    const response = await fetch (`${main_url}/articles/imgtoop/2/`,{
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

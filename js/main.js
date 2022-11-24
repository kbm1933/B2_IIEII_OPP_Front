window.onload = () => {
    load_main();
}

async function load_main(){
    const response = await fetch ('http://127.0.0.1:8000/articles/',{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })
    response_json = await response.json()
    console.log(response_json)
   
    const op_btn = document.getElementById('op_btn')
    op_btn.onclick = function(){
        window.location.replace('image_transfer.html')
    }

    const img_box = document.getElementById('img_box')
    response_json.forEach(element => {
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
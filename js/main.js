const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

window.onload = () => {
    load_main();
}

async function load_main(){
    const payload = localStorage.getItem('payload')
    const personObj = JSON.parse(payload)
    const userId = personObj['user_id']

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
    
    response_json.forEach(element => {
        
        const main_img = document.createElement('div')
        main_img.style.display = 'flex'
        main_img.style.flexDirection = 'column'
        
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

        const dislike_img = 'https://cdn-icons-png.flaticon.com/512/3669/3669713.png'
        const like_img = 'https://cdn-icons-png.flaticon.com/512/3670/3670159.png'
        
        const like = document.createElement('img') //좋아요버튼 이미지
        like.style.width = '30px'

        if(element.likes.includes(userId)){
            like.src = like_img
        } else {
            like.src = dislike_img
            
        }
        
        const like_count = document.createElement('p')
        like_count.innerText = 'likes' + element.likes_count

        const like_btn = document.createElement('button')
        like_btn.style.backgroundColor = 'transparent'
        like_btn.style.border = '0'

        like_btn.onclick = async function() {
            if( like.src == like_img){
            const response = await fetch(`http://127.0.0.1:8000/articles/${element.id}/likes/`,{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access'),
                },
                method : 'POST',
                body:{}
            })
                like.src = dislike_img
                location.reload()
            }
            else{
                const response = await fetch(`http://127.0.0.1:8000/articles/${element.id}/likes/`,{
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('access'),
                    },
                    method : 'POST',
                    body:{}
                })
                    like.src = like_img
                    location.reload()
                }
            
        }

        img_tag.appendChild(article_img)
        main_img.appendChild(img_tag)
        like_btn.appendChild(like)
        like_btn.appendChild(like_count)
        main_img.appendChild(like_btn)
        img_box.appendChild(main_img)

    })    


}


function handleSignout(){
    const response = fetch ('http://127.0.0.1:8000/users/signout/',{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'POST',
    })
    localStorage.clear()
    window.location.replace("signin.html")
}

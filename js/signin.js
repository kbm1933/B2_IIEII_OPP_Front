
window.onload = async function signincheck(){
    const payload = localStorage.getItem('payload')

    if (payload){
    const response = await fetch (`http://127.0.0.1:8000/users/signin/`, {
        headers : {
            Authorization : localStorage.getItem('access')
        },
        method:"GET"
    })
    window.location.replace("main.html")
    }
} 

async function handleSignin(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    const response = await fetch(`http://127.0.0.1:8000/users/signin/`, {
        headers: {
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "username" : username,
            "password": password
        })
    })
    if (response.status == 400){
        response_json = await response.json()
        let addHtml = response_json.message;
        document.getElementById('signin_message').innerHTML = addHtml;
        setTimeout(() => {
            document.getElementById('signin_message').remove()
        }, 2000)
        var username = document.getElementById("username")
        var password = document.getElementById("password")
    
        username.value = null;
        password.value = null;
    }
    else{
        // id, email 등등 jwt.io 정보를 로컬스토리지에 저장하는 코드
        const response_json = await response.json()
        console.log(response_json)

        localStorage.setItem('access',response_json.access);
        localStorage.setItem('refresh', response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
            return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        localStorage.setItem('payload', jsonPayload);

        window.location.replace("main.html")
    }
}


function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}
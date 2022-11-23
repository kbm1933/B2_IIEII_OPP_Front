
function password_valid(password, password2) {
    if (password != password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }
    else {
        return true;
    }
}

async function handleSignup(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    console.log(email, password)

    if (password_valid(password, password2)) {
        const response = await fetch('http://127.0.0.1:8000/users/signup/', {
            headers:{
                'content-type' : 'application/json',
            },
            method:'POST',
            body: JSON.stringify({
                "username":username,
                "password":password,
            })
        }).then(window.location.replace("login.html"))
        alert("가입되었습니다!")
        console.log(response)
    }
    else {
        console.log("제출하지 않음")
        window.location.reload()
    }
}

async function handleLogin(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch("http://127.0.0.1:8000/users/api/token/",{
        headers: {
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "username" : username,
            "password": password
        })
    })
    alert("로그인 성공");

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
    window.location.replace("image_transfer.html")
}


function handleLogout(){
    localStorage.clear()
    window.location.replace("login.html")
}

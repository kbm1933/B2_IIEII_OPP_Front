function password_valid(password, password2) {
    if (password != password2) {
        return false;
    }
    else {
        return true;
    }
}

async function handleSignup(){    
    
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var password1 = document.getElementById("password1").value

    if (password_valid(password, password1)) {
        const response = await fetch('http://127.0.0.1:8000/users/signup/', {
            headers:{
                'content-type' : 'application/json',
            },
            method:'POST',
            body: JSON.stringify({
                "username":username,
                "password":password,
                "password1":password1,
            })
        })
        if (response.status == 400){
            response_json = await response.json()
            let addHtml = response_json.message;
            document.getElementById('signup_message').innerHTML = addHtml;
            setTimeout(() => {
                document.getElementById('signup_message').remove()
            }, 2000)
            var username = document.getElementById("username")
            var password = document.getElementById("password")
            var password1 = document.getElementById("password1")
        
            username.value = null;
            password.value = null;
            password1.value = null;
        }
        else{
            window.location.replace("signin.html")
        }
        
    }
    else {
        console.log("제출하지 않음")
        window.location.reload()
    }
}
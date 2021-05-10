var loginBtn = document.getElementById('sign_in')
loginBtn.addEventListener('click', async(e) => {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var res = await fetch('/login', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    var json = await res.json()
    if (json.statusCode == 200) {
        if (json.message == "Logged in!") {
            window.location.replace("/")
        } else {
            alert(json.message)
        }
    }
})
function validate() {
    var pass = document.querySelector("#password").value;
    var conf_pass = document.querySelector("#confirm_password").value;
    if (pass != conf_pass) {
        alert("Password doesn't match");
    }
}
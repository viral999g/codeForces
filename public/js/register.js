function sign_up() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "";
    document.querySelectorAll('.ul_tabs > li')[1].className = "active";

    for (var i = 0; i < inputs.length; i++) {
        if (i == 2) {

        } else {
            document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
        }
    }

    setTimeout(function() {
        for (var d = 0; d < inputs.length; d++) {
            document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block active_inp";
        }


    }, 100);
    document.querySelector('.link_forgot_pass').style.opacity = "0";
    document.querySelector('.link_forgot_pass').style.top = "-5px";

    setTimeout(function() {

        document.querySelector('.terms_and_cons').style.opacity = "0";
        document.querySelector('.terms_and_cons').style.top = "-5px";

    }, 500);
    setTimeout(function() {
        document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none";
        document.querySelector('.terms_and_cons').className = "terms_and_cons d_block";
    }, 150);
    document.querySelector('#SIGN_IN').style.display = "none";
    document.querySelector('#SIGN_UP').style.display = "block";
    document.querySelector('#SEND_MAIL').style.display = "none";

}



function sign_in() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "active";
    document.querySelectorAll('.ul_tabs > li')[1].className = "";

    for (var i = 0; i < inputs.length; i++) {
        switch (i) {
            case 1:
                console.log(inputs[i].name);
                break;
            case 3:
                console.log(inputs[i].name);
            default:
                document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
        }
    }

    setTimeout(function() {
        for (var d = 0; d < inputs.length; d++) {
            switch (d) {
                case 1:
                    console.log(inputs[d].name);
                    break;
                case 3:
                    console.log(inputs[d].name);

                default:
                    document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";
                    document.querySelectorAll('.input_form_sign')[3].className = "input_form_sign d_block active_inp";

            }
        }
    }, 100);

    document.querySelector('.terms_and_cons').style.opacity = "0";
    document.querySelector('.terms_and_cons').style.top = "-5px";

    setTimeout(function() {
        document.querySelector('.terms_and_cons').className = "terms_and_cons d_none";
        document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_block";

    }, 500);

    setTimeout(function() {

        document.querySelector('.link_forgot_pass').style.opacity = "1";
        document.querySelector('.link_forgot_pass').style.top = "5px";


        for (var d = 0; d < inputs.length; d++) {

            switch (d) {
                case 1:
                    console.log(inputs[d].name);
                    break;
                case 3:
                    console.log(inputs[d].name);

                    break;
                default:
                    document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign";
            }
        }
    }, 150);
    document.querySelector('#SIGN_IN').style.display = "inline";
    document.querySelector('#SIGN_UP').style.display = "none";
    document.querySelector('#SEND_MAIL').style.display = "none";

}




function forgetPassword() {
    var inputs = document.querySelectorAll('.input_form_sign');
    document.querySelectorAll('.ul_tabs > li')[0].className = "";
    document.querySelectorAll('.ul_tabs > li')[1].className = "";

    for (var i = 0; i < inputs.length; i++) {
        switch (i) {
            case 1:
                document.querySelectorAll('.input_form_sign')[1].className = "input_form_sign d_block active_inp";
                break;
            case 2:
                console.log(inputs[i].name);
            default:
                document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
        }
    }

    setTimeout(function() {
        for (var d = 0; d < inputs.length; d++) {
            switch (d) {
                case 1:
                    document.querySelectorAll('.input_form_sign')[1].className = "input_form_sign d_block active_inp";
                    break;
                case 2:
                    console.log(inputs[d].name);

                default:
                    document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";


            }
        }
    }, 100);

    document.querySelector('.link_forgot_pass').style.opacity = "0";
    document.querySelector('.link_forgot_pass').style.top = "-5px";

    setTimeout(function() {

        document.querySelector('.terms_and_cons').style.opacity = "0";
        document.querySelector('.terms_and_cons').style.top = "-5px";

    }, 500);

    document.querySelector('#SIGN_IN').style.display = "none";
    document.querySelector('#SIGN_UP').style.display = "none";
    document.querySelector('#SEND_MAIL').style.display = "block";
}

window.onload = function() {
    document.querySelector('.cont_centrar').className = "cont_centrar cent_active";

}

function Validation() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("cpassword").value;
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}
//     if(pass_validation(upass,ucpass,4,12))
//             {

//             }
//         }
// function pass_validation(pass,cpass,mx,my)
// {
//     var passid_len = pass.value.length;
//     if (passid_len == 0 ||passid_len >= my || passid_len < mx)
//     {
//         alert("Password should not be empty / length be between "+mx+" to "+my);
//         pass.focus();
//     }
//     if(pass!=cpass)
//     {  
//         alert("Password must be same!");  
//     }  
//     console.log(cpass);
// }


const registerCF = async() => {
    var fname = document.getElementById('fname').value
    var lname = document.getElementById('lname').value
    var email = document.getElementById('email').value
    var cf_handle = document.getElementById('cf_handle').value

    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("cpassword").value;
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    var res = await fetch('/register', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            email: email,
            cf_handle: cf_handle,
            password: password
        })
    })

    var text = await res.text()
    alert(text)
}

var regBtn = document.getElementById('sign_up')
regBtn.addEventListener('click', (e) => {
    registerCF()
})
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
    // document.querySelector('.btn_sign').name = "SIGN UP";
    document.querySelector('#SIGN_IN').style.opacity = "0";
    document.querySelector('#SIGN_UP').style.opacity = "1";
    // document.querySelector('#SIGN_UP').style.left = "-7vw";
    document.querySelector('#SEND_MAIL').style.opacity = "0";
    setTimeout(function() {

        document.querySelector('.terms_and_cons').style.opacity = "0";
        document.querySelector('.terms_and_cons').style.top = "-5px";

    }, 500);
    setTimeout(function() {
        document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none";
        document.querySelector('.terms_and_cons').className = "terms_and_cons d_block";
    }, 150);

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
    document.querySelector('#SIGN_IN').style.opacity = "1";
    document.querySelector('#SIGN_UP').style.opacity = "0";
    document.querySelector('#SEND_MAIL').style.opacity = "0";
    // document.querySelector('.btn_sign').name = "SIGN IN";
    // document.querySelector('.btn_sign').innerHTML = "SIGN IN";
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

    document.querySelector('#SIGN_IN').style.opacity = "0";
    document.querySelector('#SIGN_UP').style.opacity = "0";
    // document.querySelector('#SEND_MAIL').style.left = "-15vw";
    document.querySelector('#SEND_MAIL').style.opacity = "1";
}

window.onload = function() {
    document.querySelector('.cont_centrar').className = "cont_centrar cent_active";

}

function Validation() {
    var uname = document.querySelector("#name");
    var uhandle = document.querySelector("#cf_handle");
    var upass = document.querySelector("#password");
    var ucpass = document.querySelector("#confirm_password");
    if (allLetter(uname, 4, 12)) {
        if (pass_validation(upass, ucpass, 4, 12)) {
            if (handleVerification(uhandle)) {

            }
        }
    }
    return false;
}

function handleVerification(uhandle) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (uhandle.value.match(letters)) {
        return true;
    } else {
        alert('User address must have alphanumeric characters only');
        uhandle.focus();
        return false;
    }
}

function allLetter(uname) {
    var letters = /^[A-Za-z]+$/;
    if (uname.value.match(letters)) {
        return true;
    } else {
        alert('Username must have alphabet characters only');
        uname.focus();
        return false;
    }
}

function pass_validation(pass, cpass, mx, my) {
    var passid_len = pass.value.length;
    if (passid_len == 0 || passid_len >= my || passid_len < mx) {
        alert("Password should not be empty / length be between " + mx + " to " + my);
        pass.focus();
        return false;
    }
    if (pass == cpass) {
        return true;
    } else {
        alert("password must be same!");
        return false;
    }
    return true;
}
mapbox_token = "pk.eyJ1IjoidmlyYWw5OTlnIiwiYSI6ImNqeWloejNuYTA5c3IzY3FpbTRsMDNhNzUifQ.kC5CsBwOOiw7nvzyppoZkQ";

$.fn.dataTable.ext.type.order['difficulty-pre'] = function(d) {
    switch (d) {
        case 'Easy':
            return 1;
        case 'Medium':
            return 2;
        case 'Hard':
            return 3;
    }
    return 0;
};
$(document).ready(function() {
    $('#styled-table').DataTable({
        // autoWidth: false,
        // columnDefs: [
        //     // {
        //     //     targets: ['_all'],
        //     //     // className: 'mdc-data-table__cell'
        //     // },
        //     { orderable: false, targets: [0,2] },
        //     { type: "difficulty", targets: 1 }
        // ]
    });
});

const ele = document.getElementById("styled-table");
const trs = ele.getElementsByTagName("tr");

for (let tr of trs) {
    const tds = tr.children;
    if (tds[1].textContent === "Easy") {
        tds[1].style.color = "green";
    } else if (tds[1].textContent === "Medium") {
        tds[1].style.color = "orangered";
    } else if (tds[1].textContent === "Hard") {
        tds[1].style.color = "red";
    }
}

const updateLocation = (e) => {
    e.preventDefault();
    ele_city = document.getElementById("profile-edit-city");
    ele_country = document.getElementById("profile-edit-country");

    let lat = 0
    let long = 0
    let resp;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            console.log(position.coords.latitude, position.coords.longitude)
            lat = await position.coords.latitude
            long = await position.coords.longitude

            let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long}, ${lat}.json?access_token=${mapbox_token}`

            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);
            xhttp.send();

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json' //,
                },
                beforeSend: function() {

                },
                error: function(xhr, textStatus, errorThrown) {
                    alert('An error occurred!');
                },
                success: function(response) {
                    if (response) {
                        features = response['features'];

                        features.forEach(f => {
                            type = f['place_type'][0];
                            if (type === 'locality') { street = f['text']; } else if (type === 'place') { city = f['text']; } else if (type === 'region') { state = f['text']; } else if (type === 'country') { country = f['text']; } else if (type === 'poi') { addr = f['place_name']; }
                        });

                        ele_city.value = city;
                        ele_country.value = country;
                    } else {
                        alert('An error occurred!');
                    }
                }
            });

        })
    }
}

const updateProfile = async(e) => {
    ele_handle = document.getElementById("profile-edit-handle").value;
    ele_city = document.getElementById("profile-edit-city").value;
    ele_country = document.getElementById("profile-edit-country").value;
    ele_fname = document.getElementById("profile-edit-fname").value;
    ele_lname = document.getElementById("profile-edit-lname").value;
    var res = await fetch('/updateUser', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
            handle: ele_handle,
            city: ele_city,
            country: ele_country,
            firstName: ele_fname,
            lastName: ele_lname
        })
    })

    var json = await res.json()
    if (json.statusCode == 200) {
        if (json.message == "Profile Updated") {
            alert("Profile Updated Successfully")
            window.location.replace('/myProfile')
        } else {
            alert(json.message)
        }
    }
}
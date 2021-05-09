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
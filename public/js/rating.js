const element = document.getElementById("styled-table");
const trs = element.getElementsByTagName("tr");
for (let tr of trs) {
    const tds = tr.children;
    if (parseInt(tds[2].textContent) >= 2400) {
        tds[2].style.color = "red";
    } else if (parseInt(tds[2].textContent) >= 2100) {
        tds[2].style.color = "orange";
    } else if (parseInt(tds[2].textContent) >= 1900) {
        tds[2].style.color = "violet";
    } else if (parseInt(tds[2].textContent) >= 1600) {
        tds[2].style.color = "blue";
    } else if (parseInt(tds[2].textContent) >= 1400) {
        tds[2].style.color = "cyan";
    } else if (parseInt(tds[2].textContent) >= 1200) {
        tds[2].style.color = "green";
    } else if (parseInt(tds[2].textContent) <= 1199) {
        tds[2].style.color = "grey";
    }
}
$(document).ready(function() {
    $('#styled-table').DataTable();
});
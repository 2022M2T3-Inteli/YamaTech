var getActiveEmpsDiv = "#empList";


function getEmpPage() {
    getEmpList();
}

function getEmpList(){
    var url = "http://127.0.0.1:3000/employees/";
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);
    resFull = JSON.stringify(res) 
    
    for (i=0; i < res.length; i++) {
        $(getActiveEmpsDiv).append(`<ul><li><div class="emp-item-1">${res[i].id}</div><div class="emp-item-2">${res[i].full_name}</div><div class="emp-item-3">${res[i].position}</div><div class="emp-item-4">${res[i].local}</div><button class="edit-btn"><span class="icon"><ion-icon name="create-outline"></ion-icon></span></button></li></ul>`);
    }
}

function postEmp() {
    var full_name = document.getElementById("full_name").value;
    var position = document.getElementById("position").value;
    var legal_hours = document.getElementById("legal_hours").value;
    var total_hours = document.getElementById("total_hours").value;
    var allocated_hours = document.getElementById("allocated_hours").value;
    var outsourced = parseInt(document.getElementById("outsourced").value);
    var local = document.getElementById("local").value;
    var isActive = 1;

    var url = "http://127.0.0.1:3000/employees/";

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "full_name": full_name,
                "position": position,
                "legal_hours": legal_hours,
                "total_hours": total_hours,
                "allocated_hours": allocated_hours,
                "outsourced": outsourced,
                "local": local,
                "isActive": isActive
            }
        )
    });
}
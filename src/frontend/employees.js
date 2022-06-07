var getActiveEmpDiv = "#empList";


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
    
    for (i=0; i < res.length; i++) {
        $(getActiveEmpDiv).append(`<ul><li><div class="emp-item-1">${res[i].id}</div><div class="emp-item-2">${res[i].full_name}</div><div class="emp-item-3">${res[i].position}</div><div class="emp-item-4">${res[i].local}</div><div class="edit-btn"><button onclick=patchEmp(${res[i].id})><span class="icon"><ion-icon name="create-outline"></ion-icon></span></button></div><div class="del-btn"><button onclick=delEmp(${res[i].id})><span class="icon"><ion-icon name="trash-outline"></ion-icon></span></button></div></li></ul>`);
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

    getEmpPage();
}

function delEmp(id) {
    var url = `http://127.0.0.1:3000/employees/${id}`;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    window.location.href = window.location.href;
}

function patchEmp(id) {
    document.getElementById("id").placeholder = id;

    var url = `http://127.0.0.1:3000/employees/${id}`;
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);

    document.getElementById("id").value = id;
    document.getElementById("full_name").value = res[0].full_name;
    document.getElementById("position").value = res[0].position;
    document.getElementById("legal_hours").value = res[0].legal_hours;
    document.getElementById("total_hours").value = res[0].total_hours;
    document.getElementById("allocated_hours").value = res[0].allocated_hours;
    document.getElementById("outsourced").value = res[0].outsourced;
    document.getElementById("local").value = res[0].local;

    document.getElementById("addBtn-Add").style.display = "none";
    document.getElementById("patchBtn-Patch").style.display = "block";

    document.getElementById("addBtn").setAttribute( "onClick", "javascript: patchEmpII();" );
}

function patchEmpII() {
    var id = document.getElementById("id").value;
    var full_name = document.getElementById("full_name").value;
    var position = document.getElementById("position").value;
    var legal_hours = document.getElementById("legal_hours").value;
    var total_hours = document.getElementById("total_hours").value;
    var allocated_hours = document.getElementById("allocated_hours").value;
    var outsourced = parseInt(document.getElementById("outsourced").value);
    var local = document.getElementById("local").value;

    console.log(id);
    console.log(full_name);
    console.log(position);
    console.log(legal_hours);
    console.log(total_hours);
    console.log(allocated_hours);
    console.log(outsourced);

    var url = `http://127.0.0.1:3000/employees/${id}`;

    console.log("a");
    $.ajax({
        type: "PATCH",
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
                "local": local
            }
        )
    })
    console.log("b");
    //document.getElementById("addBtn") = "postEmp()";
    //getEmpPage();
}
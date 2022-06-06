<<<<<<< Updated upstream
function getEmployees() {
    let tableData = []
    let url = "/employees"
    let xhttp = new XMLHttpRequest()
    xhttp.open("get", url, false)
    xhttp.send()
    let data = JSON.parse(xhttp.responseText)
    data.forEach((element, index) => {
        tableData.push(element)
        tableData[index].delete = `
            <button id="${element.id}" onclick="deleteEmployee(this.id)"><ion-icon name="trash-outline"></ion-icon></button>
        `
    });
    return tableData
}

// Delete employee
function deleteEmployee(id) {
    let url = `/employees/${id}`
    let xhttp = new XMLHttpRequest()
    
    addListener(xhttp) //Get a return, when there is a change in database

    xhttp.open("delete", url, true)
    xhttp.send()
}

function editEmployee(id) {
    let url = `/employees/${id}`
    let xhttp = new XMLHttpRequest()
    
    addListener(xhttp)

    xhttp.open("patch", url, true)
    xhttp.send()
}
// function createEmployee() {
    //     let url = "/employees"
    //     let xhttp = new XMLHttpRequest()
    //     xhttp.open("post", url, false, name?)
    //     xhttp.send()
    // }
    
function updateTable() {
    $(function() {
        $('#table').bootstrapTable("destroy"); //Bootstrap table function to destroy the table
        $('#table').bootstrapTable({
            data: getEmployees()
        });
    })
}
updateTable()

function addListener(http) {
    http.addEventListener('load', updateTable)
}
    // getEmployees(data)
// getEmployees(data)
// $('#filter-job').change(function() {
//     $('#table').bootstrapTable('filterBy', {
//         job: "Ux designer"
//       })
// })
let jobSelected
let specialitySelected
let table = document.getElementById('table')
function filterJob(job) {
    jobSelected = job
    if(jobSelected != "all") {
        $('#table').bootstrapTable('filterBy', {
            job: jobSelected
        })
    }
    else {
        $('#table').bootstrapTable('filterBy', {})
    }
=======
var getActiveEmpsDiv = "#empList";


function getEmpPage() {
    getEmpList();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
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
    })
>>>>>>> Stashed changes
}
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
}
function filterSpeciality(specialty) {
    specialitySelected = specialty
    if(specialitySelected != "all") {
        $('#table').bootstrapTable('filterBy', {
            specialty: specialitySelected
        })
    }
    else {
        $('#table').bootstrapTable('filterBy', {})
    }
}
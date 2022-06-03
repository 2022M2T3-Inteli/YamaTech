let tableData = []
function getEmployees() {
    let url = "/employees"
    let xhttp = new XMLHttpRequest()
    xhttp.open("get", url, false)
    xhttp.send()
    let data = JSON.parse(xhttp.responseText)
    data.forEach((element, index) => {
        tableData.push(element)
        tableData[index].delete = `
            <button id="${element.id}" onclick="console.log(this.id)"><ion-icon name="trash-outline"></ion-icon></button>
        `
    });
}
// function createEmployee() {
//     let url = "/employees"
//     let xhttp = new XMLHttpRequest()
//     xhttp.open("post", url, false, name?)
//     xhttp.send()
// }
 
$(function() {
    $(function() {
        $('#table').bootstrapTable({
            data: tableData
        });
    })
})
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


getEmployees()
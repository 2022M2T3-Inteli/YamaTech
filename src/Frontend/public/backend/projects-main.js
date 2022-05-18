const projects = require("../csv_parser/projects.json")

//calculate how many MONTHS the project is expected to take
function projectDuration(projectData) {
    let start = projectData["begin_date"];
    let end = projectData["finish_date"];

    let startDate = start.split("-");
    let endDate = end.split("-");

    var d0 = new Date();
    d0.setFullYear(startDate[1], startDate[0]-1, 1);

    var dn = new Date();
    dn.setFullYear(endDate[1], endDate[0]-1, 1)

    return monthDiff(d0, dn)
}

//calculate difference in MONTHS between two dates
function monthDiff(start, end) {
    return end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
   }

//calculate length in HOURS of a given project
function projectLength(projectData) {
    var projLength = projectData["employees_allocated_hours"];
    projLength = projLength.replace(/;/g, ",").replace("(", "").replace(")", "").replace(" ", "");
    projLength = Array.from(projLength.split(","));

    totalLength = 0;
    for (i=0; i<projLength.length; i++) {
        totalLength += parseInt(projLength[i]);
    }

    return totalLength;
}

console.log(projects[0]);
console.log("Duração: " + projectDuration(projects[0]) + " meses");
console.log("Horas totais do projeto: " + projectLength(projects[0]) + " horas");
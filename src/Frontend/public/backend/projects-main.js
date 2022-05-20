const projects = require("../csv_parser/projects.json")


console.log(projects[0]);
console.log(projects[1]);


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
console.log("\nMeses - Projeto 1: " + projectDuration(projects[0]));
console.log("Meses - Projeto 2: " + projectDuration(projects[1]));


//calculate difference in MONTHS between two dates
function monthDiff(start, end) {
    return 1 + end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
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
console.log("\nHoras totais - Projeto 1: " + projectLength(projects[0]));
console.log("Horas totais - Projeto 2: " + projectLength(projects[1]));


//calculate the distribution of hours per month according to DURATION and LENGTH
function projLinearDistr(projectData) {
    let start = projectData["begin_date"];
    let startDate = start.split("-");
    var d = new Date();
    d.setFullYear(startDate[1], startDate[0]-1, 1);
    
    let monthsUsed = projectDuration(projectData);
    let monthlyAlloc = projectLength(projectData) / monthsUsed;

    let projDistrDict = {};

    projDistrDict[d] = monthlyAlloc;
    for (i=1; i<monthsUsed; i++) {
        projDistrDict[new Date(d.setMonth(d.getMonth()+1))] = monthlyAlloc;
    }
        
    return projDistrDict;
}
console.log("\nDistribuicao Linear do Projeto 1: ");
console.log(projLinearDistr(projects[0]));
console.log("\nDistribuicao Linear do Projeto 2: ");
console.log(projLinearDistr(projects[1]));


//TODO
function projSkewedDistr(projectData) {
    let start = projectData["begin_date"];
    let startDate = start.split("-");
    var d = new Date();
    d.setFullYear(startDate[1], startDate[0]-1, 1);
    
    let monthsUsed = projectDuration(projectData);
    let projDistrDict = {};

    projDistrDict[d] = monthlyAlloc;
    for (i=1; i<monthsUsed; i++) {
        projDistrDict[new Date(d.setMonth(d.getMonth()+1))] = monthlyAlloc;
    }
        
    return projDistrDict;
}


//add demanded hours of two projects, allocating monthly schedule
function projGrandTtl(currentProj, nextProj) {
    let projGrandTtl = {};
    for (i in currentProj) {
        if (i in nextProj) {
            projGrandTtl[i] = currentProj[i] + nextProj[i];
        } else {
            projGrandTtl[i] = currentProj[i];
        }
    }

    for (i in nextProj) {
        if (!(i in currentProj)) {
            projGrandTtl[i] = nextProj[i];
        }
    }

    return projGrandTtl;
}
var p0 = projLinearDistr(projects[0]);
var p1 = projLinearDistr(projects[1]);
console.log("\nCheck do calculo - distribuição linear:");
console.log(projGrandTtl(p0, p1));


//calculates FULL PIPELINE of projects, considering monthly allocations
function projCapacity(projects) {
    var requiredCapacity;

    for (let i=0; i<projects.length-1; i++) {
        if (i===0) {
            requiredCapacity = projGrandTtl(projLinearDistr(projects[i]), projLinearDistr(projects[i+1]));
        } else {
            requiredCapacity = projGrandTtl(requiredCapacity, projLinearDistr(projects[i+1]));
        }
    }

    return requiredCapacity;
}
console.log("\nCheck do calculo - pipeline completo:");
console.log("-- mais informacoes em sum_hours.py");
console.log(projCapacity(projects));


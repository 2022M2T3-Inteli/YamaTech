export const getProjectDistr = (req, res) => {
    let capacity = projCapacity(projects);
    res.send(capacity);
}


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
    return 1 + end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
   }


//calculate length in HOURS of a given project
function projectLength(projectData) {
    var projLength = projectData["employees_allocated_hours"];
    projLength = projLength.replace(/;/g, ",").replace("(", "").replace(")", "").replace(" ", "");
    projLength = Array.from(projLength.split(","));

    let totalLength = 0;
    for (let i=0; i<projLength.length; i++) {
        totalLength += parseInt(projLength[i]);
    }

    return totalLength;
}


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
    for (let i=1; i<monthsUsed; i++) {
        projDistrDict[new Date(d.setMonth(d.getMonth()+1))] = monthlyAlloc;
    }
        
    return projDistrDict;
}


//calculate the distribution of hours per month according to non-linear duration
function projSkewedDistr(projectData) {
    let start = projectData["begin_date"];
    let startDate = start.split("-");
    var d = new Date();
    d.setFullYear(startDate[1], startDate[0]-1, 1);
    
    let monthlyDistr;
    let monthsUsed = projectDuration(projectData);
    let hoursUsed = projectLength(projectData);

    if (monthsUsed == 1) {monthlyDistr = [1];}
    if (monthsUsed == 2) {monthlyDistr = [0.4, 0.6];}
    if (monthsUsed == 3) {monthlyDistr = [0.2, 0.35, 0.45];}
    if (monthsUsed == 4) {monthlyDistr = [0.1, 0.25, 0.35, 0.3];}
    if (monthsUsed == 5) {monthlyDistr = [0.1, 0.2, 0.25, 0.25, 0.2];}
    if (monthsUsed == 6) {monthlyDistr = [0.1, 0.15, 0.15, 0.2, 0.225, 0.175];}
    if (monthsUsed == 7) {monthlyDistr = [0.05, 0.1, 0.1, 0.15, 0.25, 0.2, 0.15];}
    if (monthsUsed == 8) {monthlyDistr = [0.05, 0.1, 0.1, 0.15, 0.15, 0.2, 0.15, 0.1];}
    if (monthsUsed == 9) {monthlyDistr = [0.05, 0.075, 0.1, 0.1, 0.125, 0.125, 0.15, 0.15, 0.125];}
    if (monthsUsed == 10) {monthlyDistr = [0.05, 0.05, 0.075, 0.075, 0.1, 0.125, 0.125, 0.15, 0.15, 0.1];}
    if (monthsUsed == 11) {monthlyDistr = [0.05, 0.05, 0.075, 0.075, 0.1, 0.1, 0.125, 0.125, 0.125, 0.1, 0.075];}
    if (monthsUsed == 12) {monthlyDistr = [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.125, 0.125, 0.1, 0.1, 0.075, 0.075];}

    let projDistrDict = {};

    projDistrDict[d] = hoursUsed * monthlyDistr[0];
    for (let i=1; i<monthsUsed; i++) {

        if (i < 13) {
            projDistrDict[new Date(d.setMonth(d.getMonth()+1))] = hoursUsed * monthlyDistr[i];
        } else {
            projDistrDict[new Date(d.setMonth(d.getMonth()+1))] = hoursUsed / monthsUsed;
        }

        
    }
        
    return projDistrDict;
}


//allocate distribution of hours per month according to manager inputs
function projMngmtDistr(projectData) {
    let start = projectData["begin_date"];
    let startDate = start.split("-");
    var d = new Date();
    d.setFullYear(startDate[1], startDate[0]-1, 1);
    
    let monthsUsed = projectDuration(projectData);

    let projDistrDict = {};

    let tempArray = mngmtDistrArray(projectData);

    projDistrDict[d] = tempArray[0];
    for (let i=1; i<monthsUsed; i++) {
        projDistrDict[new Date(d.setMonth(d.getMonth()+1))] = tempArray[i];
    }
        
    return projDistrDict;
}


function mngmtDistrArray(projectData) {
    var c = JSON.parse(projectData["monthlyAlloc"]);

    var d = Object.keys(c).length;

    for (let i=0; i< d-1; i++) {
        if (i===0) {
            var m = sumArrays(c[0], c[1]);
        } else {
        m = sumArrays(m, c[i+1]);
        }
    }
    return m;
}


function sumArrays(array1, array2) {
    return array1.map((num, idx) => num + array2[idx]);
}


//add demanded hours of two projects, allocating monthly schedule
function projGrandTtl(currentProj, nextProj) {
    let projGrandTtl = {};
    for (let i in currentProj) {
        if (i in nextProj) {
            projGrandTtl[i] = currentProj[i] + nextProj[i];
        } else {
            projGrandTtl[i] = currentProj[i];
        }
    }

    for (let i in nextProj) {
        if (!(i in currentProj)) {
            projGrandTtl[i] = nextProj[i];
        }
    }

    return projGrandTtl;
}


//calculate FULL PIPELINE of projects, considering monthly allocations
function projCapacity(projects) {
    var requiredCapacity;

    for (let i=0; i<projects.length-1; i++) {
        if (i===0) {

            let proj1 = projects[i]["timeDistribution"];
            if (proj1 === '1') {
                proj1 = projLinearDistr(projects[i]);
            } else if (proj1 === '2') {
                proj1 = projSkewedDistr(projects[i]);
            } else {
                proj1 = projMngmtDistr(projects[i]);
            }

            let proj2 = projects[i+1]["timeDistribution"];
            if (proj2 === '1') {
                proj2 = projLinearDistr(projects[i+1]);
            } else if (proj2 === '2') {
                proj2 = projSkewedDistr(projects[i+1]);
            } else {
                proj2 = projMngmtDistr(projects[i+1]);
            }
    
            requiredCapacity = projGrandTtl(proj1, proj2);
        } else {

            let proj = projects[i+1]["timeDistribution"];
            if (proj === '1') {
                proj = projLinearDistr(projects[i+1]);
            } else if (proj === '2') {
                proj = projSkewedDistr(projects[i+1]);
            } else {
                proj = projMngmtDistr(projects[i+1]);
            }

            requiredCapacity = projGrandTtl(requiredCapacity, proj);
        }
    }

    return requiredCapacity;
}

let projects = [{"id": "201", "project_name": "Oasis", "owner": "Geison", "begin_date": "07-2022", "finish_date": "12-2022", "id_employees": "(14; 28; 9) ", "employees_allocated_hours": "(40; 20; 30)", "local": "(AM)", "timeDistribution": "2", "monthlyAlloc": "0"}, {"id": "202", "project_name": "Red Wines ", "owner": "Geison", "begin_date": "09-2022", "finish_date": "04-2023", "id_employees": "(28; 9; 31) ", "employees_allocated_hours": "(10; 20; 25) ", "local": "(SP)", "timeDistribution": "2", "monthlyAlloc": "0"}, {"id": "203", "project_name": "Anthem ", "owner": "Geison", "begin_date": "11-2022", "finish_date": "05-2023", "id_employees": "(9; 31; 25) ", "employees_allocated_hours": "(22; 40; 60) ", "local": "(SP)", "timeDistribution": "2", "monthlyAlloc": "0"}, {"id": "204", "project_name": "Royal ", "owner": "Geison", "begin_date": "07-2022", "finish_date": "01-2023", "id_employees": "(31; 25; 78) ", "employees_allocated_hours": "(20; 40; 60) ", "local": "(AM; SP)", "timeDistribution": "3", "monthlyAlloc": "[[5, 5, 5, 5, 0, 0, 0], [5, 5, 10, 10, 10, 0, 0], [0, 10, 10, 10, 10, 10, 10]]"}, {"id": "205", "project_name": "Magenta ", "owner": "Geison", "begin_date": "06-2022", "finish_date": "11-2022", "id_employees": "(25; 78; 93) ", "employees_allocated_hours": "(23; 32; 56)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "206", "project_name": "Rosalia", "owner": "Geison", "begin_date": "04-2022", "finish_date": "08-2022", "id_employees": "(78; 93)", "employees_allocated_hours": "(20; 20)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "207", "project_name": "Luna", "owner": "Geison", "begin_date": "08-2022", "finish_date": "04-2023", "id_employees": "(93; 119; 104) ", "employees_allocated_hours": "(12;18;22)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "208", "project_name": "Pho", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(119; 104; 26) ", "employees_allocated_hours": "(7;7;7)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "209", "project_name": "Yora", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(104; 26) ", "employees_allocated_hours": "(12; 20)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "210", "project_name": "Latch", "owner": "Geison", "begin_date": "12-2022", "finish_date": "01-2023", "id_employees": "(26; 76) ", "employees_allocated_hours": "(30; 60) ", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "211", "project_name": "Eclipse ", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(76; 45; 37)", "employees_allocated_hours": "(10; 49; 35) ", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "212", "project_name": "Locke", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(18; 28; 98) ", "employees_allocated_hours": "(11; 26; 70) ", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "213", "project_name": "Barthy", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(14; 19; 20)", "employees_allocated_hours": "(26; 70; 86) ", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "214", "project_name": "Embrace", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(10; 30; 50) ", "employees_allocated_hours": "(40; 50; 80) ", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "215", "project_name": "Sinka", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(30; 50; 76) ", "employees_allocated_hours": "(80; 50; 25) ", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "216", "project_name": "Wavers", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(28; 76; 87) ", "employees_allocated_hours": "(30; 70; 14)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "217", "project_name": "Snape", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(30; 89; 0)", "employees_allocated_hours": "(20; 56) ", "local": "(AM) ", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "218", "project_name": "Levitico", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(7; 17; 0)", "employees_allocated_hours": "(12; 35) ", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "219", "project_name": "Numeros", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(11; 25) ", "employees_allocated_hours": "(35; 76) ", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "220", "project_name": "Garrix", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(13; 37) ", "employees_allocated_hours": "(87; 93)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "221", "project_name": "Deut", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(40; 20; 30)", "employees_allocated_hours": "(67;65;30)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "222", "project_name": "Esdras", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(34; 40; 20)", "employees_allocated_hours": "(15;15;25)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "223", "project_name": "Neemias", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(21; 31; 40)", "employees_allocated_hours": "(10;40;32)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "224", "project_name": "Potter", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(19; 55; 56)", "employees_allocated_hours": "(25;30;35)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "225", "project_name": "Malfoy", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(22; 45; 76)", "employees_allocated_hours": "(10;10;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "226", "project_name": "Lovegood", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(47; 78; 98)", "employees_allocated_hours": "(5;5;11)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "227", "project_name": "Lestrange", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(56; 78; 90)", "employees_allocated_hours": "(12;12;18)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "228", "project_name": "Granger", "owner": "Geison", "begin_date": "07-2022", "finish_date": "12-2022", "id_employees": "(47; 45; 69)", "employees_allocated_hours": "(23; 32; 56)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "229", "project_name": "Severus", "owner": "Geison", "begin_date": "09-2022", "finish_date": "04-2023", "id_employees": "(49; 11; 22)", "employees_allocated_hours": "(20;14;18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "230", "project_name": "Dobby", "owner": "Geison", "begin_date": "03-2022", "finish_date": "05-2023", "id_employees": "(39; 54; 68)", "employees_allocated_hours": "(12;18;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "231", "project_name": "Voldemort", "owner": "Geison", "begin_date": "07-2022", "finish_date": "01-2023", "id_employees": "(45; 45; 38)", "employees_allocated_hours": "(7;7;7)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "232", "project_name": "Weasley", "owner": "Geison", "begin_date": "06-2022", "finish_date": "11-2022", "id_employees": "(31; 37; 58)", "employees_allocated_hours": "(12; 20;30)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "233", "project_name": "Grindenwald", "owner": "Geison", "begin_date": "04-2022", "finish_date": "08-2022", "id_employees": "(45; 46; 47)", "employees_allocated_hours": "(10; 10; 9)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "234", "project_name": "Longbottom", "owner": "Geison", "begin_date": "08-2022", "finish_date": "04-2023", "id_employees": "(69; 84; 19)", "employees_allocated_hours": "(2; 2; 4)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "235", "project_name": "Albus", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(98; 46; 64)", "employees_allocated_hours": "(20; 20; 36)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "236", "project_name": "Dumbledore", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(78; 45; 67)", "employees_allocated_hours": "(10; 15; 18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "237", "project_name": "Hagrid", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(30;68;86)", "employees_allocated_hours": "(20; 20; 21)", "local": "(AM) ", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "238", "project_name": "Minerva", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(51; 59; 11)", "employees_allocated_hours": "(25; 25; 36)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "239", "project_name": "McGonagall", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(80; 101; 50)", "employees_allocated_hours": "(12; 20; 24)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "240", "project_name": "Sirius", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(51; 43; 12)", "employees_allocated_hours": "(5;5;5)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "241", "project_name": "Desert", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(70; 32; 9)", "employees_allocated_hours": "(20;20;40)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "242", "project_name": "Thompson", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(51; 43; 12)", "employees_allocated_hours": "(15;15;25)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "243", "project_name": "Magnum", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(51; 33; 42)", "employees_allocated_hours": "(10;40;32)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "244", "project_name": "Lengend", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(21; 43; 12)", "employees_allocated_hours": "(25;30;35)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "245", "project_name": "Diamond", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(13; 22; 42)", "employees_allocated_hours": "(10;10;22)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "246", "project_name": "Gold", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(11; 43; 15)", "employees_allocated_hours": "(5;5;11)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "247", "project_name": "Silver", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(21; 53; 16)", "employees_allocated_hours": "(12;12;18)", "local": "(AM; SP) ", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "248", "project_name": "Stone", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(51; 43; 12)", "employees_allocated_hours": "(23; 32; 56)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "249", "project_name": "Rock", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(41; 63; 32)", "employees_allocated_hours": "(20;14;18)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "250", "project_name": "River", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(11; 43; 12)", "employees_allocated_hours": "(12;18;22)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "251", "project_name": "Square", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(51; 59; 11)", "employees_allocated_hours": "(7;7;7)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "252", "project_name": "Circle", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(80; 101; 50)", "employees_allocated_hours": "(12; 20;30)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "253", "project_name": "Triangle", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(51; 43; 12)", "employees_allocated_hours": "(10; 10; 9)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "254", "project_name": "Metal", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(50; 40; 10)", "employees_allocated_hours": "(2; 2; 4)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "255", "project_name": "Radioactive", "owner": "Geison", "begin_date": "06-2022", "finish_date": "02-2023", "id_employees": "(59; 80; 100)", "employees_allocated_hours": "(20; 20; 36)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "256", "project_name": "Vibranium", "owner": "Geison", "begin_date": "01-2023", "finish_date": "02-2023", "id_employees": "(58; 40; 10)", "employees_allocated_hours": "(10; 15; 18)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "257", "project_name": "Adamantium", "owner": "Geison", "begin_date": "08-2022", "finish_date": "09-2022", "id_employees": "(57; 33; 30)", "employees_allocated_hours": "(20; 20; 21)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "258", "project_name": "Spider", "owner": "Geison", "begin_date": "10-2022", "finish_date": "01-2023", "id_employees": "(61; 143; 112)", "employees_allocated_hours": "(25; 25; 36)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "259", "project_name": "Iron", "owner": "Geison", "begin_date": "07-2022", "finish_date": "03-2023", "id_employees": "(30; 33; 92)", "employees_allocated_hours": "(12; 20; 24)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "260", "project_name": "Titanium", "owner": "Geison", "begin_date": "07-2022", "finish_date": "12-2022", "id_employees": "(80; 120; 89)", "employees_allocated_hours": "(5;5;5)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "261", "project_name": "Sociedade sampaio", "owner": "Geison", "begin_date": "09-2022", "finish_date": "04-2023", "id_employees": "(18; 110; 90)", "employees_allocated_hours": "(20;20;40)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "262", "project_name": "Gray", "owner": "Geison", "begin_date": "12-2022", "finish_date": "05-2023", "id_employees": "(43; 102; 78)", "employees_allocated_hours": "(15;15;25)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "263", "project_name": "Marcos Apps", "owner": "Geison", "begin_date": "07-2022", "finish_date": "01-2023", "id_employees": "(13; 12; 98)", "employees_allocated_hours": "(10;40;32)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "264", "project_name": "AllAccess Leo", "owner": "Geison", "begin_date": "06-2022", "finish_date": "11-2022", "id_employees": "(03; 04; 99)", "employees_allocated_hours": "(25;30;35)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "265", "project_name": "Quantum Arthur", "owner": "Geison", "begin_date": "04-2022", "finish_date": "08-2022", "id_employees": "(83; 12; 29)", "employees_allocated_hours": "(10;10;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "266", "project_name": "Black", "owner": "Geison", "begin_date": "08-2022", "finish_date": "04-2023", "id_employees": "(116; 67)", "employees_allocated_hours": "(5;5;11)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "267", "project_name": "Gandalf", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(89; 12; 198)", "employees_allocated_hours": "(12;12;18)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "268", "project_name": "Legolas", "owner": "Geison", "begin_date": "08-2022", "finish_date": "10-2022", "id_employees": "(67; 89)", "employees_allocated_hours": "(23; 32; 56)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "269", "project_name": "Bilbo", "owner": "Geison", "begin_date": "9-2022", "finish_date": "11-2022", "id_employees": "(79; 128; 32)", "employees_allocated_hours": "(20;14;18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "270", "project_name": "Baggins", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(24; 56) ", "employees_allocated_hours": "(12;18;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "271", "project_name": "Elrond", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(92; 28; 72)", "employees_allocated_hours": "(7;7;7)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "272", "project_name": "Gimli", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(01; 48)", "employees_allocated_hours": "(12; 20;30)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "273", "project_name": "Sauron", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(39; 20)", "employees_allocated_hours": "(10; 10; 9)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "274", "project_name": "Eowyn", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(09; 90)", "employees_allocated_hours": "(2; 2; 4)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "275", "project_name": "Balrog", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(62; 92)", "employees_allocated_hours": "(20; 20; 36)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "276", "project_name": "Morgoth", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(59; 88; 77)", "employees_allocated_hours": "(10; 15; 18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "277", "project_name": "Arwen", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(19; 09; 49)", "employees_allocated_hours": "(20; 20; 21)", "local": "(AM) ", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "278", "project_name": "Aragorn", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(56; 59; 02)", "employees_allocated_hours": "(25; 25; 36)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "279", "project_name": "Gollum", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(30; 40; 50)", "employees_allocated_hours": "(12; 20; 24)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "280", "project_name": "Galadriel", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(14; 78; 91)", "employees_allocated_hours": "(5;5;5)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "281", "project_name": "Shine Castel", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(2;8;67)", "employees_allocated_hours": "(20;20;40)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "282", "project_name": "Blue Lake", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(23;78;90)", "employees_allocated_hours": "(15;15;25)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "283", "project_name": "Red Jacket", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(87;98;100)", "employees_allocated_hours": "(10;40;32)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "284", "project_name": "Fi", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(28;87;89)", "employees_allocated_hours": "(25;30;35)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "285", "project_name": "Morgana", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(76;67;86)", "employees_allocated_hours": "(10;10;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "286", "project_name": "Nirvana", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(67;78)", "employees_allocated_hours": "(5;5;11)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "287", "project_name": "Moscou", "owner": "Geison", "begin_date": "04-2022", "finish_date": "06-2022", "id_employees": "(34;78)", "employees_allocated_hours": "(12;12;18)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "288", "project_name": "Firework", "owner": "Geison", "begin_date": "06-2022", "finish_date": "08-2022", "id_employees": "(28;68;88)", "employees_allocated_hours": "(23; 32; 56)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "289", "project_name": "Good Idea", "owner": "Geison", "begin_date": "03-2022", "finish_date": "11-2022", "id_employees": "(76;89;95)", "employees_allocated_hours": "(20;14;18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "290", "project_name": "Pitagoric", "owner": "Geison", "begin_date": "02-2022", "finish_date": "07-2022", "id_employees": "(45;58;68)", "employees_allocated_hours": "(12;18;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "291", "project_name": "Liceu", "owner": "Geison", "begin_date": "02-2022", "finish_date": "05-2022", "id_employees": "(86;98;100)", "employees_allocated_hours": "(7;7;7)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "292", "project_name": "Leibniz", "owner": "Geison", "begin_date": "04-2022", "finish_date": "09-2022", "id_employees": "(34;76;90)", "employees_allocated_hours": "(12; 20;30)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "293", "project_name": "Goosebumps", "owner": "Geison", "begin_date": "05-2022", "finish_date": "07-2022", "id_employees": "(15;20;78)", "employees_allocated_hours": "(10; 10; 9)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "294", "project_name": "Turing", "owner": "Geison", "begin_date": "07-2022", "finish_date": "12-2022", "id_employees": "(76;88;98)", "employees_allocated_hours": "(2; 2; 4)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "295", "project_name": "Gauss", "owner": "Geison", "begin_date": "09-2022", "finish_date": "04-2023", "id_employees": "(64;68;76)", "employees_allocated_hours": "(20; 20; 36)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "296", "project_name": "Fermat", "owner": "Geison", "begin_date": "03-2022", "finish_date": "05-2023", "id_employees": "(54;68;78)", "employees_allocated_hours": "(10; 15; 18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "297", "project_name": "Euler", "owner": "Geison", "begin_date": "07-2022", "finish_date": "01-2023", "id_employees": "(56;78;90)", "employees_allocated_hours": "(20; 20; 21)", "local": "(AM) ", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "298", "project_name": "Descarte", "owner": "Geison", "begin_date": "06-2022", "finish_date": "11-2022", "id_employees": "(1;8;;76)", "employees_allocated_hours": "(25; 25; 36)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "299", "project_name": "Euclid", "owner": "Geison", "begin_date": "04-2022", "finish_date": "08-2022", "id_employees": "(32;48;78)", "employees_allocated_hours": "(12; 20; 24)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "300", "project_name": "Newton", "owner": "Geison", "begin_date": "08-2022", "finish_date": "04-2023", "id_employees": "(28;78;95)", "employees_allocated_hours": "(5;5;5)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "301", "project_name": "Alpha", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(1;13;23)", "employees_allocated_hours": "(20;20;40)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "302", "project_name": "Beta", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(13;23;33)", "employees_allocated_hours": "(15;15;25)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "303", "project_name": "Gamma", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(23;33;43)", "employees_allocated_hours": "(10;40;32)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "304", "project_name": "Delta", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(33;43;53)", "employees_allocated_hours": "(25;30;35)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "305", "project_name": "Epsilon", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(43;53;63)", "employees_allocated_hours": "(10;10;22)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "306", "project_name": "Zeta", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(53;63;73)", "employees_allocated_hours": "(5;5;11)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "307", "project_name": "Eta", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(63;73;83)", "employees_allocated_hours": "(12;12;18)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "308", "project_name": "Theta", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(73;83;93)", "employees_allocated_hours": "(23; 32; 56)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "309", "project_name": "Iota", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(83;93;103)", "employees_allocated_hours": "(20;14;18)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "310", "project_name": "Kappa", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(83;103;24)", "employees_allocated_hours": "(12;18;22)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "311", "project_name": "Lambda", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(107;97;87)", "employees_allocated_hours": "(7;7;7)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "312", "project_name": "Mu", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(97;87;77)", "employees_allocated_hours": "(12; 20;30)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "313", "project_name": "Nu", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(87;77;67)", "employees_allocated_hours": "(10; 10; 9)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "314", "project_name": "Xi", "owner": "Geison", "begin_date": "12-2022", "finish_date": "3-2023", "id_employees": "(77;67;57)", "employees_allocated_hours": "(2; 2; 4)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "315", "project_name": "Omicron", "owner": "Geison", "begin_date": "6-2022", "finish_date": "9-2022", "id_employees": "(67;57;47)", "employees_allocated_hours": "(20; 20; 36)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "316", "project_name": "Pi", "owner": "Geison", "begin_date": "7-2022", "finish_date": "10-2022", "id_employees": "(57;47;37)", "employees_allocated_hours": "(10; 15; 18)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "317", "project_name": "Rho", "owner": "Geison", "begin_date": "8-2022", "finish_date": "11-2022", "id_employees": "(47;37;27)", "employees_allocated_hours": "(20; 20; 21)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "318", "project_name": "Sigma", "owner": "Geison", "begin_date": "9-2022", "finish_date": "12-2022", "id_employees": "(37;27;17)", "employees_allocated_hours": "(25; 25; 36)", "local": "(AM; SP)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "319", "project_name": "Tau", "owner": "Geison", "begin_date": "10-2022", "finish_date": "1-2023", "id_employees": "(27;17;7)", "employees_allocated_hours": "(12; 20; 24)", "local": "(AM)", "timeDistribution": "1", "monthlyAlloc": "0"}, {"id": "320", "project_name": "Upsilon", "owner": "Geison", "begin_date": "11-2022", "finish_date": "2-2023", "id_employees": "(15;26;78)", "employees_allocated_hours": "(5;5;5)", "local": "(SP)", "timeDistribution": "1", "monthlyAlloc": "0"}]
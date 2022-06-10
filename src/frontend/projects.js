var getProjectDiv = "#projDiv";


document.addEventListener('DOMContentLoaded', () => {
    getProjectList();
    setPixelToScreenScale();
 }, false);


const SCREEN_WIDTH = 2560;
const SCREEN_HEIGHT = 1600;

const screenElem = document.getElementById("main-page");

function setPixelToScreenScale() {
  let screenToPixelScale;
  if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
    screenToPixelScale = window.innerWidth / GAME_WIDTH;
  } else {
    screenToPixelScale = window.innerHeight / GAME_HEIGHT;
  }

  screenElem.style.width = `${SCREEN_WIDTH * screenToPixelScale}px`;
  screenElem.style.height = `${SCREEN_HEIGHT * screenToPixelScale}px`;
}


function getHome() {
    window.location.href = "http://localhost:3000/home.html";
}

function getEmployees() {
    window.location.href = "http://localhost:3000/employees.html";
}

function getProjects() {
    window.location.href = "http://localhost:3000/projects.html";
}

function logOut() {
    window.location.href = "http://localhost:3000/index.html";
}

function getProjectList() {
    var url = "http://127.0.0.1:3000/projects/";
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);
    
    for (i=0; i < res.length; i++) {
        $(getProjectDiv).append(
            `<div class="grid-container-2-1-1" onclick=updateForm(${res[i].id})>
                <div class="grid-container-2-1-1-1">
                    ID:<span>${res[i].id}</span>
                </div>
                <div class="grid-container-2-1-1-2">
                    Nome:<span>${res[i].project_name}</span>
                </div>
                <div class="grid-container-2-1-1-3">
                    Início:<span>${res[i].begin_date}</span>
                </div>
                <div class="grid-container-2-1-1-4">
                    Fim:<span>${res[i].finish_date}</span>
                </div>
                <div class="edit-btn">
                    <button onclick=patchProject(${res[i].id})>
                        <span class="icon">
                            <ion-icon name="create-outline"></ion-icon>
                        </span>
                    </button>
                </div>
                <div class="del-btn">
                    <button onclick=delProject(${res[i].id})>
                        <span class="icon">
                            <ion-icon name="trash-outline"></ion-icon>
                        </span>
                    </button>
                </div>`
        );
    }

    document.getElementById("id").innerHTML = res[0].id;
    document.getElementById("project_name").innerHTML = res[0].project_name;
    document.getElementById("begin_date").innerHTML = res[0].begin_date;
    document.getElementById("finish_date").innerHTML = res[0].finish_date;

    let empls_id = ``;
    let empls_time = ``;
    let idAlloc = res[0].id_employees.replace("(", "").replace(")", "").split(",");
    let timeAlloc = res[0].employees_allocated_hours.replace("(", "").replace(")", "").split(",");
    let count = idAlloc.length;
    for (i=0; i < count; i++) {
        empls_id += `<div>${getEmployee(parseInt(idAlloc[i]))}</div>`
        empls_time += `<div>${timeAlloc[i]}h</div>`
    }
    document.getElementById("id_employees").innerHTML = empls_id;
    document.getElementById("employees_allocated_hours").innerHTML = empls_time;

    if (res[0].timeDistribution === 1)  {
        document.getElementById("btnLinear").classList.add("buttonActive");
    }
    if (res[0].timeDistribution === 2)  {
        document.getElementById("btnLogistic").classList.add("buttonActive");
    }

    document.getElementById("owner").innerHTML = res[0].owner;
    document.getElementById("local").innerHTML = res[0].local.replace("(", "").replace(")", "");
}

function getEmployee(id) {
    var url = `http://127.0.0.1:3000/employees/${id}`;
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);

    return res[0].full_name;
}


function delProject(id) {
    var url = `http://127.0.0.1:3000/projects/${id}`;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    window.location.href = window.location.href;
}


function updateForm(id) {
    var url = `http://127.0.0.1:3000/projects/${id}`;
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);
    console.log(res);

    document.getElementById("id").innerHTML = res[0].id;
    document.getElementById("project_name").innerHTML = res[0].project_name;
    document.getElementById("begin_date").innerHTML = res[0].begin_date;
    document.getElementById("finish_date").innerHTML = res[0].finish_date;

    let empls_id = ``;
    let empls_time = ``;
    let idAlloc = res[0].id_employees.replace("(", "").replace(")", "").split(",");
    let timeAlloc = res[0].employees_allocated_hours.replace("(", "").replace(")", "").split(",");
    let count = idAlloc.length;
    for (i=0; i < count; i++) {
        empls_id += `<div>${getEmployee(parseInt(idAlloc[i]))}</div>`
        empls_time += `<div>${timeAlloc[i]}h</div>`
    }
    document.getElementById("id_employees").innerHTML = empls_id;
    document.getElementById("employees_allocated_hours").innerHTML = empls_time;

    document.getElementById("btnLinear").classList.remove("buttonActive");
    document.getElementById("btnLogistic").classList.remove("buttonActive");

    if (res[0].timeDistribution === 1)  {
        document.getElementById("btnLinear").classList.add("buttonActive");
    }
    if (res[0].timeDistribution === 2)  {
        document.getElementById("btnLogistic").classList.add("buttonActive");
    }

    document.getElementById("owner").innerHTML = res[0].owner;
    document.getElementById("local").innerHTML = res[0].local.replace("(", "").replace(")", "");
}
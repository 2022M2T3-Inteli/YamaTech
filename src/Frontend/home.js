var a = [
    {
        'Jun-2022': 390,
        'Jul-2022': 460,
        'Aug-2022': 250 
    },
    {
        "legal_hours": 704,
        "total_hours": 550,
        "allocated_hours": 365
    }
]


function hours(){
    var hours = [];
    hours = (a[0]);
    return hours;
}



function legal_hours() {
var lhours = [];

var labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
var array = '[';
for (let i=0; i < labels.length; i++) {
    lhours.push(a[1]["legal_hours"]);
    if(i == labels.length-1)    array += a[1]["legal_hours"] + ']';
    else array += a[1]["legal_hours"] + ',';
    console.log(a[1]["legal_hours"]);
    }
    console.log(array);
    return lhours;
}

function total_hours() {
    var thours = [];
//labels identificados no gráfico de horas totais por mês, com uma visão macro 
    var labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    var array = '[';
    for (let i=0; i < labels.length; i++) {
        thours.push(a[1]["total_hours"]);
        if(i == labels.length-1)    array += a[1]["total_hours"] + ']';
        else array += a[1]["total_hours"] + ',';
        console.log(a[1]["total_hours"]);
        }
        console.log(array);
        return thours;
}

function allocated_hours() {
    var ahours = [];

    var labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    var array = '[';
    for (let i=0; i < labels.length; i++) {
        ahours.push(a[1]["allocated_hours"]);
        if(i == labels.length-1)    array += a[1]["allocated_hours"] + ']';
        else array += a[1]["allocated_hours"] + ',';
        console.log(a[1]["allocated_hours"]);
        }
        console.log(array);
        return ahours;
    
}


allocated_hours();
total_hours();
legal_hours();


const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');

let delayed;

// Gradient color
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgb(1, 1, 1) ");
gradient.addColorStop(1, "rgba(0, 100, 255, .3)")


//Chart 1 --> gráfico referente ao limite de horas disponiveis, horas necessárias por projetos etc
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        type: 'line',
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
        label: 'Limite de Horas Legalizadas',
            type: 'line',
            data: legal_hours(),
            backgroundColor: "rgb(255,0,0)",
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            pointBackgroundColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",

        },
        {
            label: 'Total de Horas',
                type: 'line',
                data: total_hours(),
                backgroundColor: "rgb(0, 250, 20)",
                fill: false,
                borderColor: 'rgb(0, 250, 20)',
                pointBackgroundColor: "rgba(0,0,0,0)",
                pointBorderColor: "rgba(0,0,0,0)"
               
        },
        {
            label: 'Horas Alocadas',
                type: 'line',
                data: allocated_hours(),
                backgroundColor: 'rgb(256, 200, 0)',
                fill: false,
                borderColor: 'rgb(256, 200, 0)',
                pointBackgroundColor: "rgba(0,0,0,0)",
                pointBorderColor: "rgba(0,0,0,0)"
               
        },
        {
        label: 'Horas Necessárias Por Projetos',
            data: hours(),
            backgroundColor: [
                'rgba(54,120,230,1)',
            ],
            borderColor: "#eff",
            fill: true,
            hitRadius: 30,
            hoverRadius: 5,
            backgroundColor: gradient,
            pointBackgroundColor: "rgb(255,255,255)",
            pointBorderColor: "rgb(200,200,200)"
        }]
    },
    options: {
       responsive: true,
       animation: {
        onComplete: () => {
            delayed = true;
        },
        delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default" && !delayed){
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
        },
       },
       scales: {
        y:{
            ticks:{
                callback: function (value) {
                    return  value + "h";
                },
            },
        },
       },
    },
    
});


//Chart 2
const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Horas Necessárias Por Projetos',
            data: hours(),
            backgroundColor: [
                'rgba(54,120,230,1)',
            ],
            backgroundColor: gradient,
        }]
        
    },
    options: {
       responsive: true,
       animation: {
        onComplete: () => {
            delayed = true;
        },
        delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default" && !delayed){
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
        },
       },
    },       
});
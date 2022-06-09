var a = [
    {
        "Fri Jul 01 2022 14:23:10 GMT-0300 (Brasilia Standard Time)": 21.666666666666668,
        "Mon Aug 01 2022 14:23:10 GMT-0300 (Brasilia Standard Time)": 21.666666666666668,
        "Thu Sep 01 2022 14:23:10 GMT-0300 (Brasilia Standard Time)": 24.416666666666668,
        "Sat Oct 01 2022 14:23:10 GMT-0300 (Brasilia Standard Time)": 27.166666666666668,
        "Tue Nov 01 2022 14:23:10 GMT-0300 (Brasilia Standard Time)": 27.166666666666668,
        "Thu Dec 01 2022 14:23:10 GMT-0300 (Brasilia Standard Time)": 29.916666666666668,
        "Sun Jan 01 2023 14:23:10 GMT-0300 (Brasilia Standard Time)": 8.25,
        "Wed Feb 01 2023 14:23:10 GMT-0300 (Brasilia Standard Time)": 11,
        "Wed Mar 01 2023 14:23:10 GMT-0300 (Brasilia Standard Time)": 8.25,
        "Sat Apr 01 2023 14:23:10 GMT-0300 (Brasilia Standard Time)": 5.5
    },
    {
        "legal_hours": 704,
        "total_hours": 550,
        "allocated_hours": 365
    }
]

//console.log(a[1]["legal_hours"]);
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



//Chart 1
function grafico(teste) {


}
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        type: 'line',
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
        label: 'Limite de Horas Disponíveis',
            type: 'line',
            data: legal_hours(),
            backgroundColor: "rgb(255,0,0)",
            fill: false,
            borderColor: 'rgb(255, 0, 0)'

        },
        {
            label: 'Limite de Horas Disponíveis',
                type: 'line',
                data: total_hours(),
                backgroundColor: "rgb(0, 250, 20)",
                fill: false,
                borderColor: 'rgb(0, 250, 20)'
               
        },
        {
            label: 'Limite de Horas Disponíveis',
                type: 'line',
                data: allocated_hours(),
                backgroundColor: "rgb(0, 200, 255)",
                fill: false,
                borderColor: 'rgb(0, 200, 255)'
               
        },
        {
        label: 'Horas Necessárias Por Projetos',
            data: [690, 560, 400, 480, 800, 712, 1014 , 580, 777, 200, 400, 200],
            backgroundColor: [
                'rgba(54,120,230,1)',
            ],
            fill: true,
            backgroundColor: 'rgba(54,120,230,0.5)',
        }]
    },
    options: {
       responsive: true,
    }
    
});


//Chart 2
const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Horas Necessárias Por Projetos',
            data: [12, 19, 3, 5, 2, 3, 8 , 5, 9, 10, 47, 4],
            backgroundColor: [
                'rgba(54,120,230,1)',
            ],
            backgroundColor: 'rgba(54,120,230,0.5)',
        }]
        
    },
    options: {
       responsive: true,
    },
    
            
});



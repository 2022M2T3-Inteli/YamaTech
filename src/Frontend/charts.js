const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');
const ctx4 = document.getElementById('myChart4').getContext('2d');


// Chart 1
const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [42, 39, 30, 50, 27, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        }]
    },
    options: {
       responsive: true,
    }
});

//Chart 2
const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Horas Necessárias Por Projetos',
            data: [12, 19, 3, 5, 2, 3, 8 , 5, 9, 10, 47, 4],
            backgroundColor: [
                'rgba(54,120,230,1)',
            ]
        }]
    },
    options: {
       responsive: true,
    }
});

//Chart 3
const myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Php', 'Phyton', 'JavaScript', 'Ux'],
        datasets: [{
            label: 'Especialidades',
            data: [25, 11, 19, 55],
            backgroundColor: [
                'rgba(54,120,230,1)',
            ]
        }]
    },
    options: {
       responsive: true,
    }
});

//Chart 4
const myChart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Horas Necessárias Por Projetos',
            data: [12, 19, 3, 5, 2, 3, 8 , 5, 9, 10, 47, 4],
            backgroundColor: [
                'rgba(54,120,230,1)',
            ]
        }]
    },
    options: {
       responsive: true,
    }
});


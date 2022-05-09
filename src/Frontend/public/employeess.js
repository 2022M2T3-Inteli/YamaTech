var $table = $('#table');
var mydata = 
[
    {
        "name": "Funcionário 1",
        "office": "Ux Designer",
        "specialty": "80 h",
        "hours": "30 h",
        "project": "Funcionário 5"
    },
    {
        "name": "Funcionário 2",
        "office": "Engenheiro de dados",
        "specialty": "20 h",
        "hours": "",
        "project": "$0"
    },
    {
        "name": "Funcionário 3",
        "office": "Analista de sistemas",
        "specialty": "40 h",
        "hours": "$0",
        "project": "$0"
    },
    {
        "name": "Funcionário 4",
        "office": "Dev Full Stack",
        "specialty": "10 h",
        "hours": "$0",
        "project": "$0"
    },
    {
        "name": "Funcionário 5",
        "office": "Master Screwed",
        "specialty": "15 h",
        "hours": "$0",
        "project": "$0"
    },
    {
        "name": "Funcionário 6",
        "office": "Engenheiro de Software",
        "specialty": "$0",
        "hours": "15",
        "project": "$0"
    },
   
];

$(function () {
    $('#table').bootstrapTable({
        data: mydata
    });
});
var $table = $('#table');
var mydata = 
[
    {
        "id": 0,
        "name": "test0",
        "demanded hours": "400h",
        "conclusion": "20%"
    },
    {
        "id": 1,
        "name": "test1",
        "demanded hours": "300h",
        "conclusion": "40%"
    },
    {
        "id": 2,
        "name": "test2",
        "demanded hours": "250h",
        "conclusion": "50%"
    },
    {
        "id": 3,
        "name": "test3",
        "demanded hours": "350h",
        "conclusion": "20%"
    },
    {
        "id": 4,
        "name": "test4",
        "demanded hours": "450h",
        "conclusion": "10%"
    },
    {
        "id": 5,
        "name": "test5",
        "demanded hours": "350h",
        "conclusion": "70%"
    },
    {
        "id": 6,
        "name": "test6",
        "demanded hours": "320h",
        "conclusion": "20%"
    },
    {
        "id": 7,
        "name": "test7",
        "demanded hours": "435h",
        "conclusion": "30%"
    },
    {
        "id": 8,
        "name": "test8",
        "demanded hours": "380h",
        "conclusion": "80%"
    },
    {
        "id": 9,
        "name": "test9",
        "demanded hours": "480h",
        "conclusion": "20%"
    },
    {
        "id": 10,
        "name": "test10",
        "demanded hours": "380h",
        "conclusion": "10%"
    },
    {
        "id": 11,
        "name": "test10",
        "demanded hours": "560h",
        "conclusion": "60%"
    },
    {
        "id": 12,
        "name": "test10",
        "demanded hours": "580h",
        "conclusion": "10%"
    },
    {
        "id": 13,
        "name": "test10",
        "demanded hours": "280h",
        "conclusion": "90%"
    },
    {
        "id": 14,
        "name": "test10",
        "demanded hours": "470h",
        "conclusion": "10%"
    },
    {
        "id": 15,
        "name": "test10",
        "demanded hours": "320h",
        "conclusion": "10%"
    },
    {
        "id": 16,
        "name": "test10",
        "demanded hours": "580h",
        "conclusion": "10%"
    },
];

$(function () {
    $('#table').bootstrapTable({
        data: mydata
    });
});
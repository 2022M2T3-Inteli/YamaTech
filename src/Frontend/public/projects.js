var $table = $('#table');
var mydata = 
[
    {
        "id": 0,
        "name": "test0",
        "etc": "$0"
    },
    {
        "id": 1,
        "name": "test1",
        "etc": "$1"
    },
    {
        "id": 2,
        "name": "test2",
        "etc": "$2"
    },
    {
        "id": 3,
        "name": "test3",
        "etc": "$3"
    },
    {
        "id": 4,
        "name": "test4",
        "etc": "$4"
    },
    {
        "id": 5,
        "name": "test5",
        "etc": "$5"
    },
    {
        "id": 6,
        "name": "test6",
        "etc": "$6"
    },
    {
        "id": 7,
        "name": "test7",
        "etc": "$7"
    },
    {
        "id": 8,
        "name": "test8",
        "etc": "$8"
    },
    {
        "id": 9,
        "name": "test9",
        "etc": "$9"
    },
    {
        "id": 10,
        "name": "test10",
        "etc": "$10"
    },
    {
        "id": 11,
        "name": "test10",
        "etc": "$10"
    },
    {
        "id": 12,
        "name": "test10",
        "etc": "$10"
    },
    {
        "id": 13,
        "name": "test10",
        "etc": "$10"
    },
    {
        "id": 14,
        "name": "test10",
        "etc": "$10"
    },
    {
        "id": 15,
        "name": "test10",
        "etc": "$10"
    },
    {
        "id": 16,
        "name": "test10",
        "etc": "$10"
    },
];

$(function () {
    $('#table').bootstrapTable({
        data: mydata
    });
});
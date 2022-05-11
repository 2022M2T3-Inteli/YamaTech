var $table = $('#table');
var mydata = 
[
    {
        "id": 1,
        "name": "alpha",
        "demanded hours": "80",
        "conclusion": "13%",
        "accountable": "Naruto"
    },
    {
        "id": 2,
        "name": "Beta",
        "demanded hours": "55",
        "conclusion": "21%",
        "accountable": "Sasuki",
    },
    {
        "id": 3,
        "name": "Gamma",
        "demanded hours": "72",
        "conclusion": "50%",
        "accountable": "Gaara",
    },
    {
        "id": 4,
        "name": "Delta",
        "demanded hours": "103",
        "conclusion": "41%",
        "accountable": "Deidara",
    },
    {
        "id": 5,
        "name": "Epsilon",
        "demanded hours": "42",
        "conclusion": "52%",
        "accountable": "Pain",
    },
    {
        "id": 6,
        "name": "Zeta",
        "demanded hours": "21",
        "conclusion": "18%",
        "accountable": "Kakashi",
    },
    {
        "id": 7,
        "name": "Eta",
        "demanded hours": "57",
        "conclusion": "69%",
        "accountable": "Naruto",
    },
    {
        "id": 8,
        "name": "Theta",
        "demanded hours": "93",
        "conclusion": "24%",
        "accountable": "Sasuki",
    },
    {
        "id": 9,
        "name": "Iota",
        "demanded hours": "98",
        "conclusion": "56%",
        "accountable": "Gaara"
    },
    {
        "id": 10,
        "name": "Kappa",
        "demanded hours": "52",
        "conclusion": "92%",
        "accountable": "Deidara",
    },
    {
        "id": 11,
        "name": "Lambda",
        "demanded hours": "23",
        "conclusion": "88%",
        "accountable": "Pain",

    },
    {
        "id": 12,
        "name": "MU",
        "demanded hours": "49",
        "conclusion": "13%",
        "accountable": "Kakashi",
    },
    {
        "id": 13,
        "name": "Nu",
        "demanded hours": "19",
        "conclusion": "67%",
        "accountable": "Naruto",
    },
    {
        "id": 14,
        "name": "Xi",
        "demanded hours": "7",
        "conclusion": "45%",
        "accountable": "Sasuki",
    },
    {
        "id": 15,
        "name": "Omicron",
        "demanded hours": "77",
        "conclusion": "93%",
        "accountable": "Gaara",
    },
    {
        "id": 16,
        "name": "Pi",
        "demanded hours": "42",
        "conclusion": "17%",
        "accountable": "Deidara",
    },
    {
        "id": 17,
        "name": "Rho",
        "demanded hours": "61",
        "conclusion": "32%",
        "accountable": "Pain",
    },

    {
        "id": 18,
        "name": "Sigma",
        "demanded hours": "94",
        "conclusion": "89%",
        "accountable": "Kakashi",
    },

    {
        "id": 19,
        "name": "Tau",
        "demanded hours": "29",
        "conclusion": "41%",
        "accountable": "Gaara",
    },

    {
        "id": 20,
        "name": "Epsilon",
        "demanded hours": "11",
        "conclusion": "84%",
        "accountable": "Deidara",
    },
];

$(function () {
    $('#table').bootstrapTable({
        data: mydata
    });
});
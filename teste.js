var a = [
  {
      "Wed Jun 01 2022 10:31:57 GMT-0300 (Brasilia Standard Time)": 390,
      "Fri Jul 01 2022 10:31:57 GMT-0300 (Brasilia Standard Time)": 460,
      "Mon Aug 01 2022 10:31:57 GMT-0300 (Brasilia Standard Time)": 250
  },
  {
      "legal_hours": 704,
      "total_hours": 550,
      "allocated_hours": 365
  }
];

var b = {};
Object.entries(a[0]).forEach(([key, value]) => {
  b[`${key.substring(4, 7)}-${key.substring(11, 15)}`] = value;
});

console.log(b);
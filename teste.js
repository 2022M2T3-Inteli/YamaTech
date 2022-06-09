var a = "(40, 20, 30)";

a = a.replace("(", "").replace(")", "").split(",");
console.log(a);
console.log(typeof a);
console.log(typeof a[0]);
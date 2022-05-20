var duration = 6;
var numberOfRanges = 8;

var r1 = 5;
var r2 = 5;
var r3 = 7;
var r4 = 10;
var r5 = 15;
var r6 = 18;
var r7 = 23;
var r8 = 17;

var multiplo = 0;
var lista = [];
for (i=0; i < numberOfRanges; i++) {
    if (i < rangeStart) {
        multiplo += r1;
    }
}
lista.push(multiplo);

console.log(lista);
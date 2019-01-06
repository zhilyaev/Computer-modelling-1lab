var AHPP = /** @class */ (function () {
    function AHPP() {
        this.c = [];
    }
    AHPP.mean = function (array) { return AHPP.sum(array) / array.length; };
    AHPP.gmean = function (array) { return Math.pow(AHPP.production(array), 1 / array.length); };
    AHPP.sum = function (array) { return array.reduce(function (acc, el) { return acc + (Array.isArray(el) ? AHPP.sum(el) : el); }, 0); };
    AHPP.production = function (array) { return array.reduce(function (acc, el) { return acc * (Array.isArray(el) ? AHPP.production(el) : el); }, 0); };
    AHPP.transpose = function (matrix) { return matrix[0].map(function (col, i) { return matrix.map(function (row) { return row[i]; }); }); };
    return AHPP;
}());
var ahpp = new AHPP();
ahpp.alternatives = [
    'квартира 1',
    'квартира 2',
    'квартира 3',
];
ahpp.criterias = [
    'цена',
    'размер',
    'комнаты',
    'близость',
    'категория',
];
ahpp.c[0] = [
    [1, 3, 1, 1 / 2, 5],
    [1 / 3, 1, 1 / 4, 1 / 7, 2],
    [1, 4, 1, 1, 6],
    [2, 7, 1, 1, 8],
    [1 / 5, 1 / 2, 1 / 6, 1 / 8, 1],
];
ahpp.c[1] = [
    [1, 4, 1 / 2],
    [1 / 4, 1, 1 / 5],
    [2, 5, 1],
];
ahpp.c[2] = [
    [1, 1 / 2, 3],
    [2, 1, 4],
    [1 / 3, 1 / 4, 1],
];
ahpp.c[3] = [
    [1, 1, 2],
    [1, 1, 3],
    [1 / 2, 1 / 3, 1],
];
ahpp.c[4] = [
    [1, 1 / 3, 4],
    [3, 1, 5],
    [1 / 4, 1 / 5, 1],
];
ahpp.c[5] = [
    [1, 2, 1 / 5],
    [1 / 2, 1, 1 / 6],
    [5, 6, 1],
];
ahpp.sumCriterias = ahpp.c.map(function (ci) { return AHPP.transpose(ci).map(AHPP.sum); });
ahpp.c = ahpp.c.map(function (ci, i) { return ci.map(function (row) { return row.map(function (el, j) { return el / ahpp.sumCriterias[i][j]; }); }); });
ahpp.w = ahpp.c.map(function (ci) { return ci.map(function (a) { return AHPP.mean(a); }); });
var wc = ahpp.w[0];
for (var i in ahpp.criterias) {
    console.log(ahpp.criterias[i], '=', wc[i]);
}
ahpp.w.splice(0, 1);
var v = AHPP.transpose(ahpp.w).map(function (wi) { return wi.reduce(function (acc, el, i) { return acc + el * wc[i]; }, 0); });
for (var i in ahpp.alternatives) {
    console.log(ahpp.alternatives[i], '=', v[i]);
}

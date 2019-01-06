class AHPP {
  criterias: string[]
  alternatives: string[]
  c: number[][][] = []
  w: number[][]
  sumCriterias: number[][]

  static mean = array => AHPP.sum(array) / array.length;
  static gmean = array => Math.pow(AHPP.production(array), 1/array.length)
  static sum = array => array.reduce((acc, el) => acc + (Array.isArray(el) ? AHPP.sum(el) : el), 0);
  static production = array => array.reduce((acc, el) => acc * (Array.isArray(el) ? AHPP.production(el) : el),0);
  static transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));
}

let ahpp = new AHPP()
ahpp.alternatives = [
  'квартира 1',
  'квартира 2',
  'квартира 3',
]
ahpp.criterias = [
  'цена',
  'размер',
  'комнаты',
  'близость',
  'категория',
]

ahpp.c[0] = [
  [1, 3, 1, 1/2, 5],
  [1/3, 1, 1/4, 1/7,2],
  [1, 4, 1, 1, 6],
  [2,7,1,1,8],
  [1/5,1/2,1/6,1/8,1],
]
ahpp.c[1] = [
  [1, 4, 1/2],
  [1/4, 1, 1/5],
  [2, 5, 1],
]
ahpp.c[2] = [
  [1, 1/2, 3],
  [2, 1, 4],
  [1/3, 1/4, 1],
]
ahpp.c[3] = [
  [1, 1, 2],
  [1, 1, 3],
  [1/2, 1/3, 1],
]
ahpp.c[4] = [
  [1, 1/3, 4],
  [3, 1, 5],
  [1/4, 1/5, 1],
]
ahpp.c[5] = [
  [1, 2, 1/5],
  [1/2, 1, 1/6],
  [5, 6, 1],
]

ahpp.sumCriterias = ahpp.c.map(ci => AHPP.transpose(ci).map(AHPP.sum))
ahpp.c = ahpp.c.map((ci, i) => ci.map(row => row.map((el,j) => el/ahpp.sumCriterias[i][j]) ))
ahpp.w = ahpp.c.map(ci => ci.map(a => AHPP.mean(a)))

let wc = ahpp.w[0]
for (let i in ahpp.criterias) {
  console.log(ahpp.criterias[i], '=', wc[i])
}

ahpp.w.splice(0,1)
let v = AHPP.transpose(ahpp.w).map(wi => wi.reduce((acc, el, i) => acc + el*wc[i], 0))

for (let i in ahpp.alternatives) {
  console.log(ahpp.alternatives[i], '=', v[i])
}

//for in
//for of
//1. for in 迭代对象key
//   for of 迭代对象值
let list = [4,5,6]
for(let i in list){
    console.log('in: ' + i);
}
for(let i of list) {
    console.log('of: ' + i);
}
//2. for in 可以操作任何对象，它提供了查看对象属性的一种方法
//   for..of 关注于迭代对象的值

let pets = new Set(['cat', 'dog', 'hamster'])
pets['species'] = 'mammals'

for(let pet in pets){
    console.log('in: ' + pet);
}
for(let pet of pets){
    console.log('of: ' + pet);
}

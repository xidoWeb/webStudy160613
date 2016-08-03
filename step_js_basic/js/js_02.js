// js_02.js

var num_a = 9;
var num_b = 4;

// console.log('덧셈', num_a + num_b); // 13
// console.log('뺄셈', num_a - num_b ); // 5
// console.log('곱셈', num_a * num_b ); // 36
// console.log('나눗셈', num_a / num_b ); // 2.......
// console.log('나머지', num_a % num_b); // 나눈 몫의 남은값

// num_a = num_a + 6; 
// console.log(num_a); // 15

// num_a += 10;
// console.log(num_a); // 25

// num_b -= 3;
// console.log(num_b);

// console.log(num_a += 1); //26
// console.log(num_a += 1); //27
// console.log(num_a += 1); //28
// console.log(++num_a); //29  1을 먼저 더하고 값을 표기(선실행)
// console.log(++num_a); //30
// console.log(++num_a); //31
// console.log(--num_a); //30
// console.log(--num_a); //29
// console.log(--num_a); //28
// console.log(num_a++); //28  먼저 표기하고 1을 더해라(후실행)
// console.log(num_a); //28
// console.log(num_a--); //28
// console.log(num_a); //27



// var i = 2016, j = 1890;
// document.write('<select>');
// for(; i > j ; i--){
// 	document.write('<option>'+ i +' 연도</option>');	
// };
// document.write('</select>');

/* 
for: 반복기능

for(최초값1; 비교2, 5, 8; 수행형태4, 7){
	실행3, 6, 9
}
*/

var telecom = ['010', '011', '016', '017', '018', '019'];
var sel1 = document.createElement('select');

var t = 0 , tl = telecom.length; 
for(; t<tl; t++){
	sel1.innerHTML = '<option>'+telecom[t]+'</option>';
}
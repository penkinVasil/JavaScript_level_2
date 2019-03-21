// Замена одинарных кавычек двойными 

const str = "She says: 'You need to finish the book, last chapter aren't done'. He answered her: 'All right, I'll do it'";

const regexp = /'/g;
const regexp2 = /\b"\b/g;

const newStr = str.replace(regexp, '"');
const newStr2 = newStr.replace(regexp2, "'");
 
console.log(str);
console.log("Задание 1: " + newStr);
console.log("Задание 2: " + newStr2);


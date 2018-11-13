const arrLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYX".split('');
const arrDigits = "0123456789".split('');
const arrOperators = [
    '=', '+=', '-=', '*=', '/=', '%=', '.=',
    '+', '-', '*', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
]

const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
"1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#",
"$", "%", "^", "&", "*", "(", ")", "`", "~", "-", "=", "_", "+",
"[", "]", "{", "}", "|", ";", "\"", "'", ":", ",", ".", "/", "<",
">", "?"]

const reserves = [
    '<?php', 'array', 'foreach', 'if', 'else', 'switch', 'case', 'default',  'echo', '?>'
];

const firstBoolean = ['true', 'false'];
const firstNumberSign = ['+', '-'];
const firstDecimal = ['.'];
const firstString = chars;
const firstDigit = arrDigits;
const firstNumber = firstNumberSign.concat(firstDigit);
const firstLetter = arrLetters;
const firstKeyValuePair = [];
const firstKeyValuePairC = firstKeyValuePair;
const firstArray = 'array';
const firstConstantValueSingle = ['\''].concat(this.firstNumber).concat(this.firstBoolean);
const firstConstantValue = firstConstantValueSingle.concat(this.firstArray);
const firstConstantValueC = firstConstantValue;
const firstVarName = ['_'].concat(firstLetter).concat(firstDigit);
const firstTString = ['_'].concat(firstLetter);
const firstTStringC = firstTString;
const firstTVariable = '$';
const firstTVariableC = firstTVariable;



































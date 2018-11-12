let str = `<?php
$arr = array('str1' =>"\n\r\t", 'str2' =>"demo76876test"); 
foreach ($arr as $a => $demo) { 
   if (ctype_cntrl($demo)) { 
      echo "$a has all control characters. \n"; 
   }else { 
      echo "$a does not have all control characters. \n"; 
   } 
}
?>`

const reserved = [
    '<?php',
    'array',
    'foreach',
    '++',
    '--',
    'if',
    'else',
    'echo',
    '?>'
];

let index = 0;

function top() {
    if(index>=str.length) return null;
    return str[index];
}

function pop() {
    if(index>=str.length) return null;
    return str[index++];
}

function getSymbol() {
    if(index >= str.length) return null;
    let symbol = '';
    let temp = reserved.slice();
    for(let i=0; true; i++) {
        let c = top();
        let newTemp = [];
        for(let rsv of temp) {
            if(rsv[i] === c) {
                newTemp.push(rsv);
            }
        }
        if(newTemp.length>0) {
            temp = newTemp;
            symbol += pop();
        } else {
            break;
        }
    }
    return symbol !== '' ? symbol : pop();
}

while(true) {
    let sym = getSymbol();
    if(!sym) break;
    console.log(sym);
}
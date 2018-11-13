// Data-data
let str = `<?php
    switch () {
        case afor : 
        default :
        case hanifan :
    }
    ;
    ;
?>`;

document.getElementById('str').value = str;

// Helper Function

function isReserved(str) {
    if(str.length === 1) return true;
    for(let rsv of reserves) {
        if(rsv.substring(0, str.length) === str) return true;
    }
    return false;
}

Array.prototype.contain = function (str) {
    return this.indexOf(str) >= 0;
}

// Getter Function

let index = 0;

function char() {
    if(index>=str.length) return null;
    // if(str[index === ' ']) index++;
    return str[index];
}

function symbol() {
    if(index>=str.length) return null;
    let symbol = '';
    let offset = 0;
    while(isReserved(symbol + str[index + offset])) {
        symbol += str[index + offset] || '';
        offset++;
    }
    // if(str[index + offset] === ' ') index++;
    return symbol;
}

///////////////////////////////////////////////

let isValid = true;
let code = '';

function accept(str) {
    if(!isValid) return;
    if(!str) {
        isValid = false;
        return;
    }
    let len = str.length;
    if(len === 1) {
        console.log(index + ' CHECK CHAR ', char(), str);
        if(str===char()) {
            code += str;
            index += len;
        } else {
            isValid = false;
            console.log('FAILED AT', str);
        }
    } else {
        console.log(index + ' CHECK SYMBOL ', symbol(), str);
        if(str===symbol()) {
            code += str;
            index += len;
        } else {
            isValid = false;
            console.log('FAILED AT', str);
        }
    }
    while([' ', '\n'].indexOf(char()) >= 0) {
        index++;
    }
}

///////////////////////////////////////////////

function main(){
    index = 0;
    code = '';
    isValid = true;
    program();
    if(isValid) {
        return {
            status : 'SUCCESS',
            code : code
        }
    } else {
        return {
            status : 'FAILED',
            code : code
        }
    }
}

///////////////////////////////////////////////

// Program

function program() {
    accept('<?php');
    let firstBlock = ['switch'];
    while(firstBlock.contain(symbol())) {
        block();
    }
    accept('?>')
}

function block() {
    let first1 = ['switch', ';'];
    let first2 = [];
    if(first1.contain(symbol())) {
        while(first1.contain(symbol())) {
            statement();
        }
    } else if(first2.contain(symbol())) {
        while(first2.contain(symbol())) {
            functionDeclarationStatement();
        }
    } else {
        classDeclaration();
    }
}

// Statement

function statement() {
    if(char() === '{') {
        let firstBlock = ['switch'];
        accept('{');
        while(firstBlock.contain(symbol())) {
            block();
        }
        accept('}');
    } else {
        switch(symbol()) {
            case 'switch':
                accept('switch');
                accept('(');
                expr();
                accept(')');
                accept('{');
                switchCase();
                accept('}');
                break;
            case 'while':
                break;
            case 'for':
                break;
            case 'if':
                break;
            case 'do':
                break;
            case 'echo':
                break;
            case 'for':
                break;
            case 'return':
                break;
            default:
                let firstExpr = [];
                if(firstExpr.contain(symbol())) {
                    expr();
                }
                accept(';');
        }
    }
}

function switchCase() {
    while(symbol() === 'case') {
        _case();
    }
    if(symbol() === 'default') {
        _default()
    }
    while(symbol() === 'case') {
        _case();
    }
}

function _case() {
    accept('case');
    tString();
    console.log('will accept :');
    accept(':');
}

function _default() {
    accept('default');
    accept(':');
}

// Class and Interface

function classDeclaration() {

}

// Function

function functionDeclarationStatement() {

}

// Expression

function exprC() {
    expr();
    while(char() === ',') {
        accept(',');
        expr();
    }
}

function expr() {

}

// Operator

// Others

function tString() {
    if(char() === '_') {
        accept('_');
    } else {
        letter();
    }
    let varName = ['_'].concat(arrLetters).concat(arrDigits);
    while(varName.contain(char())) {
        accept(char());
    }
}

function varName() {
    if(char() === '_') {
        accept('_');
    } else if(arrLetters.contain(char())) {
        letter();
    } else {
        digit();
    }
}

function letter() {
    let c = char();
    if(arrLetters.contain(char())) {
        accept(c);
    } else {
        accept(null);
    }
}

function digit() {
    let c = char();
    if(arrDigits.contain(char())) {
        accept(c);
    } else {
        accept(null);
    }
}
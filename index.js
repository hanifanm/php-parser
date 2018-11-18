// index.js

// Global Variable ///////////////////////////////////////////////////

let index = 0;
let code = '';
let first = new First();
let message = '';
let str = '';

// Helper Function ///////////////////////////////////////////////////

Array.prototype.contain = function (str) {
    return this.indexOf(str) >= 0;
}

// Getter Function ///////////////////////////////////////////////////

// Function to check if the 'str' string is a reserved string in PHP
function isReserved(str) {
    if (str.length === 1) return true;
    for (let rsv of reserves) {
        if (rsv.substring(0, str.length) === str) return true;
    }
    return false;
}

// Function to get the char in the current index
function char() {
    if (index >= str.length) return null;
    return str[index];
}

// Function to get the reserved string in the current index
function symbol() {
    if (index >= str.length) return null;
    let symbol = '';
    let offset = 0;
    while (isReserved(symbol + str[index + offset])) {
        symbol += str[index + offset] || '';
        offset++;
    }
    return symbol;
}

// Accept Function ///////////////////////////////////////////////////

function accept(str) {
    let len = str.length;
    if (len === 1) {
        console.log(index + ' CHECK CHAR ', char(), str);
        if (str === char()) {
            code += str;
            index += len;
        } else {
            console.log('FAILED WHEN CHECK', char(), 'WHEN IT MUST BE', str);
            message = `Failed on accept symbol '${char()}'.`;
            throw new Error()
        }
    } else {
        console.log(index + ' CHECK SYMBOL ', symbol(), str);
        if (str === symbol()) {
            code += str;
            index += len;
        } else {
            console.log('FAILED WHEN CHECK', symbol(), 'WHEN IT MUST BE', str);
            message = `Failed on accept symbol '${symbol()}'.`;
            throw new Error()
        }
    }
}

// Main Function ///////////////////////////////////////////////////

// Function to handle loading the txt file into the DOM
function onloadfile() {
    let file = document.getElementById('inputFile').files[0];
    console.log(file);
    if(!file) return;
    let reader = new FileReader();
      reader.onload = e => {
          let base64 = e.target.result.split(',').slice(1);
          let str = atob(base64);
          console.log(str);
          console.log(document.getElementById('str'));
          document.getElementById('str').value = str;
      };
    reader.readAsDataURL(file);
}

// Function to pre-process and post-process string to be parsed
function test() {
    // Get and parse string from the DOM
    str = document.getElementById('str').value
        .replace(/\n/g, ' ')
        .replace(/\s\s+/g, ' ')
        .trim();
    
    // Calling the main method 
    let result = main();

    // Load result into the DOM
    document.getElementById('status').innerText = `Status : ${result.status}`;
    document.getElementById('message').innerText = `Message : ${result.message}`;
    document.getElementById('code').innerText = result.code;
}

// Main method to parse the string
function main() {
    index = 0;
    code = '';
    message = '';
    try {
        // Run the program
        program();
        return {
            status: 'Success',
            code: code,
            message: 'String is accepted.'
        }
    } catch (error) {
        // Catching the error
        return {
            status: 'Failed',
            code: code,
            message: message
        }
    }
}

// EBNF Parser ///////////////////////////////////////////////////

// Program

function program() {
    accept('<?php');
    accept(' ');
    while (first.block.contain(symbol())) {
        block(); space();
    }
    space();
    accept('?>')
}

function block() {
    if (first.statement.contain(symbol())) {
        while (first.statement.contain(symbol())) {
            statement(); space();
        }
    } else if (first.functionDeclarationStatement.contain(symbol())) {
        while (first.functionDeclarationStatement.contain(symbol())) {
            functionDeclarationStatement(); space();
        }
    } else {
        while (first.classDeclaration.contain(symbol())) {
            classDeclaration(); space();
        }
    }
}

// Statement

function statement() {
    console.log('statement');
    if (char() === '{') {
        accept('{'); space();
        while (first.block.contain(symbol())) {
            block(); space();
        }
        accept('}');
    } else {
        switch (symbol()) {
            case 'switch':
                accept('switch'); space();
                accept('('); space();
                expr(); space();
                accept(')'); space();
                accept('{'); space();
                while (first.switchCase.contain(symbol())) {
                    switchCase(); space();
                }
                accept('}');
                break;
            case 'while':
                accept('while'); space();
                accept('('); space();
                expr();
                accept(')'); space();
                innerStatement();
                break;
            case 'for':
                accept('for'); space();
                accept('('); space();
                if(first.exprC.contain(symbol())) {
                    exprC(); space();
                }
                accept(';'); space();
                if(first.exprC.contain(symbol())) {
                    exprC(); space();
                }
                accept(';'); space();
                if(first.exprC.contain(symbol())) {
                    exprC(); space();
                }
                accept(')'); space();
                innerStatement();
                break;
            case 'if':
                accept('if'); space();
                accept('('); space();
                expr(); space();
                accept(')'); space();
                statement(); space();
                while (first.elseif.contain(symbol())) {
                    elseif(); space();
                }
                if (first.else.contain(symbol())) {
                    _else(); space();
                }
                break;
            case 'do':
                accept('do'); space();
                innerStatement(); space();
                accept('while'); space();
                accept('('); space();
                expr(); space();
                accept(')'); space();
                accept(';');
                break;
            case 'echo':
                accept('echo');
                accept(' ');
                valueC(); space();
                accept(';');
                break;
            case 'return':
                accept('return');
                accept(' ');
                if (first.expr.contain(symbol())) {
                    expr(); space();
                }
                accept(';');
                break;
            default:
                if (first.expr.contain(symbol())) {
                    expr();
                }
                accept(';');
        }
    }
}

function innerStatement() {
    console.log('inner statement');
    if (first.statement.contain(symbol())) {
        statement();
    } else if (symbol() === 'break') {
        accept('break');
        space();
        accept(';');
    }
}

function elseif() {
    console.log('elseif');
    accept('elseif'); space();
    accept('('); space();
    expr(); space();
    accept(')'); space();
    statement();
}

function _else() {
    console.log('else');
    accept('else'); space();
    statement();
}

function switchCase() {
    while (symbol() === 'case') {
        _case();
        space();
    }
    if (symbol() === 'default') {
        _default()
        space();
    }
    while (symbol() === 'case') {
        _case();
        space();
    }
}

function _case() {
    accept('case');
    accept(' ');
    expr();
    space();
    accept(':');
    space();
    while (first.innerStatement.contain(symbol())) {
        innerStatement();
        space();
    }
}

function _default() {
    accept('default');
    space();
    accept(':');
    space();
    while (first.innerStatement.contain(symbol())) {
        innerStatement();
        space();
    }
}

// Class and Interface

function classDeclaration() {
    if (first.classEntryType.contain(symbol())) {
        classEntryType(); accept(' ');
        tString(); accept(' ');
        if (symbol() === 'extends') {
            accept('extends');
            accept(' ');
            tString(); space();
        }
        if (first.implementsList.contain(symbol())) {
            implementsList(); space();
        }
        accept('{'); space();
        while (first.modifier.contain(symbol()) || first.classStatement.contain(symbol())) {
            if (first.modifier.contain(symbol())) {
                modifier();
                accept(' ');
            }
            classStatement(); space();
        }
        accept('}'); space();
    } else {
        accept('interface');
        accept(' ');
        tString(); space();
        if (first.interfaceExtendsList.contain(symbol())) {
            interfaceExtendsList(); space();
        }
        accept('{'); space();
        while (first.functionDeclaration.contain(symbol()) || first.modifier.contain(symbol())) {
            if (first.modifier.contain(symbol())) {
                modifier();
                accept(' ');
            }
            functionDeclaration(); space();
            accept(';'); space();
        }
        accept('}'); space();
    }
}

function classEntryType() {
    switch (symbol()) {
        case 'abstract':
            accept('abstract');
            accept(' ');
            accept('class');
            break;
        case 'final':
            accept('final');
            accept(' ');
            accept('class');
            break;
        default:
            accept('class');
            break;
    }
}

function implementsList() {
    accept('implements');
    accept(' ');
    tStringC();
}

function interfaceExtendsList() {
    accept('extends');
    accept(' ');
    tStringC();
}

function classStatement() {
    if (first.assignmentExpr.contain(symbol())) {
        assignmentExpr();
        space();
        accept(';');
    } else {
        functionDeclarationStatement();
    }
}

function modifier() {
    switch (symbol()) {
        case 'protected':
            accept('protected');
            break;
        case 'private':
            accept('private');
            break;
        case 'public':
            accept('public');
            break;
        case 'static':
            accept('static');
            break;
        case 'abstract':
            accept('abstract');
            break;
        default:
            accept('final');
            break;
    }
}

// Function

function functionDeclarationStatement() {
    functionDeclaration(); space();
    // functionStatement();
    accept('{'); space();
    if(first.block.contain(symbol())) {
        block(); space();
    }
    accept('}'); space();
}

function functionDeclaration() {
    accept('function');
    accept(' ');
    tString(); space();
    accept('('); space();
    if(first.functionParameterC.contain(symbol())) {
        functionParameterC(); space();
    }
    accept(')'); 
}

function functionStatement() {
    accept('{'); space();
    statement(); space();
    accept('}');
}

function functionParameterC() {
    functionParameter(); space();
    while(char() === ',') {
        accept(','); space();
        functionParameter();
    }
}

function functionParameter() {
    if(first.assignmentExpr.contain(symbol())) {
        assignmentExpr()
    } else {
        value();
    }
}

// Expression

function exprC() {
    expr(); space();
    while (char() === ',') {
        accept(','); space();
        expr(); space();
    }
}

function expr() {
    console.log('expr');
    if (first.assignmentExpr.contain(symbol())) {
        assignmentExpr();
    } else {
        rightHand(); space();
        if (first.operator.contain(symbol())) {
            operator(); space();
            rightHand();
        }
    }
}

function assignmentExpr() {
    console.log('assignment expr');
    leftHand(); space();
    if (first.assignmentOperator.contain(symbol())) {
        assignmentOperator(); space();
        rightHand();
    } else if (first.operator.contain(symbol())) {
        operator(); space();
        rightHand();
    } else if (first.deincremental.contain(symbol())) {
        deincremental();
    }
}

function leftHand() {
    tVariable(); space();
    while (first.access.contain(symbol())) {
        access(); space();
    }
}

function rightHand() {
    if (first.constantValueSingle.contain(symbol())) {
        constantValueSingle();
    } else if (first.array.contain(symbol())) {
        array();
    } else if (first.functionCall.contain(symbol())) {
        functionCall();
    } else {
        deincremental(); space();
        tVariable();
    }
}

function valueC() {
    value();
    while (char() === ',') {
        accept(','); space();
        rightHand(); space();
    }
}

function value() {
    if (first.leftHand.contain(symbol())) {
        leftHand(); space();
        if (first.deincremental.contain(symbol())) {
            deincremental();
        }
    } else {
        rightHand();
    }
}

function access() {
    if (char() === '[') {
        accept('['); space();
        arrayKey(); space();
        accept(']');
    } else {
        accept('->'); space();
        tString();
    }
}

function deincremental() {
    if (symbol() === '++') {
        accept('++');
    } else {
        accept('--');
    }
}

function functionCall() {
    tString(); space();
    accept('('); space();
    if (first.valueC.contain(symbol())) {
        valueC(); space();
    }
    accept(')');
}

function arrayKey() {
    if (first.tVariable.contain(symbol())) {
        tVariable();
    } else {
        constantValueSingle();
    }
}

// Operator

function assignmentOperator() {
    console.log('assignment operator');
    switch (symbol()) {
        case '=': accept('='); break;
        case '+=': accept('+='); break;
        case '-=': accept('-='); break;
        case '*=': accept('*='); break;
        case '/=': accept('/='); break;
        case '%=': accept('%='); break;
        default: accept('.='); break;
    }
}

function operator() {
    console.log('operator');
    switch (symbol()) {
        case '+': accept('+'); break;
        case '-': accept('-'); break;
        case '*': accept('*'); break;
        case '/': accept('/'); break;
        case '%': accept('%'); break;
        case '**': accept('**'); break;
        case '==': accept('=='); break;
        case '===': accept('==='); break;
        case '!=': accept('!='); break;
        case '<>': accept('<>'); break;
        case '!==': accept('!=='); break;
        case '<': accept('<'); break;
        case '<=': accept('<='); break;
        case '>': accept('>'); break;
        case '>=': accept('>='); break;
        case 'and': accept('and'); break;
        case 'or': accept('or'); break;
        case 'xor': accept('xor'); break;
        case '&&': accept('&&'); break;
        case '||': accept('||'); break;
        case '!': accept('!'); break;
        default: accept('.'); break;
    }
}

// Others

function tVariableC() {
    tVariable(); space();
    while (char() === ',') {
        accept(','); space();
        tVariable(); space();
    }
}

function tVariable() {
    accept('$');
    tString();
}

function tStringC() {
    tString(); space();
    while (char() === ',') {
        accept(','); space();
        tString(); space();
    }
}

function tString() {
    if (char() === '_') {
        accept('_');
    } else {
        letter();
    }
    while (first.varName.contain(char())) {
        accept(char());
    }
}

function varName() {
    if (char() === '_') {
        accept('_');
    } else if (first.letter.contain(char())) {
        letter();
    } else {
        digit();
    }
}

function constantValueSingle() {
    console.log('constant value single');
    if (char() === '\'') {
        accept('\'');
        string();
        accept('\'');
    } else if (char() === '\"') {
        accept('\"');
        string();
        accept('\"');
    } else if (first.number.contain(char())) {
        number();
    } else {
        boolean();
    }
}

function array() {
    if (symbol() === 'array') {
        accept('array'); space();
        accept('('); space();
        if(first.arrayValueC.contain(symbol())) {
            arrayValueC(); space();
        }
        accept(')');
    } else {
        accept('['); space();
        arrayValueC(); space();
        accept(']');
    }
}

function arrayValueC() {
    arrayValue(); space();
    while (char() === ',') {
        accept(','); space();
        arrayValue(); space();
    }
}

function arrayValue() {
    if(first.constantValueSingle.contain(symbol())){
        constantValueSingle(); space();
        if (symbol() === '=>') {
            accept('=>'); space();
            value(); space();
        }
    } else {
        array();
    }
}

function letter() {
    let c = char();
    if (first.letter.contain(char())) {
        accept(c);
    } else {
        accept(null);
    }
}

function digit() {
    let c = char();
    if (first.digit.contain(char())) {
        accept(c);
    } else {
        accept(null);
    }
}

function string() {
    while (first.string.contain(char())) {
        accept(char());
    }
}

function number() {
    if (first.numberSign.contain(char()) || first.digit.contain(char())) {
        if (first.numberSign.contain(char())) {
            numberSign();
        }
        space();
        do {
            digit();
        } while (first.digit.contain(char()));
        if (first.decimal.contain(char())) {
            decimal();
        }
    } else {
        decimal();
    }
}

function decimal() {
    accept('.');
    while (first.digit.contain(char())) {
        digit();
    }
}

function numberSign() {
    if (char() === '-') {
        accept('-');
    } else {
        accept('+');
    }
}

function boolean() {
    if (symbol() === 'true') {
        accept('true');
    } else {
        accept('false');
    }
}

function space() {
    if (char() === ' ') {
        accept(' ');
    }
}
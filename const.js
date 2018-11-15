const arrLetters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "X"];

const arrDigits = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

const arrOperators = [
    "=", "+=", "-=", "*=", "/=", "%=", ".=", "+", "-", "*", "/",
    "%", "**", "==", "===", "!=", "<>", "!==", "<", "<=", ">",
    ">=", "and", "or", "xor", "&&", "||", "!", "."
]

const arrAssignmentOperators = [
    '=', '+=', '-=', '*=', '/=', '%=', '.='
]

const chars = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#",
    "$", "%", "^", "&", "*", "(", ")", "`", "~", "-", "=", "_", "+",
    "[", "]", "{", "}", "|", "\\", ";", ":", ",", ".", "/", "<",">",
    "?", " "
]

const reserves = [
    "<?php", "?>", "{", "}", "(", ")", ";",  ":", ",", "->", "[", "]",
    "++", "--", "=", "+=", "-=", "*=", "/=", "%=", ".=", "+", "-", "*",
    "/", "%", "**", "==", "===", "!=", "<>", "!==", "<", "<=", ">", ">=",
    "&&", "||", "!", ".", "and", "or", "xor", "$", "_", "'", "array", "=>", 
    "switch", "while", "for", "if", "do", "while", "echo", "return", "break",
    "elseif", "else", "case", "default", "extends", "interface", "abstract",
    "final", "class", "implements", "extends", "public", "protected", "private",
    "static", "abstract", "final", "function", "true", "false"
].concat(arrLetters).concat(arrDigits);

class First {
    constructor() {
        // Others
        this.boolean = ['true', 'false'];
        this.numberSign = ['+', '-'];
        this.decimal = ['.'];
        this.string = chars;
        this.digit = arrDigits;
        this.letter = arrLetters;
        this.number = this.numberSign.concat(this.digit);
        this.constantValueSingle = ['\'', '\"'].concat(this.number).concat(this.boolean);
        this.array = ['array', '['];
        this.arrayValue = this.constantValueSingle.concat(this.array);
        this.arrayValueC = this.arrayValue;
        this.varName = ['_'].concat(this.letter).concat(this.digit);
        this.tString = ['_'].concat(this.letter);
        this.tStringC = this.tString;
        this.tVariable = ['$'];
        this.tVariableC = this.tVariable;

        // Operator
        this.operator = arrOperators;
        this.assignmentOperator = arrAssignmentOperators;
        
        // Expression
        this.arrayKey = this.tVariable.concat(this.constantValueSingle);
        this.functionCall = this.tString;
        this.deincremental = ['++', '--'];
        this.access = ['[', '->'];
        this.leftHand = this.tVariable;
        this.rightHand = this.constantValueSingle.concat(this.array)
            .concat(this.functionCall).concat(this.deincremental);
        this.value = this.leftHand.concat(this.rightHand);
        this.valueC = this.value;
        this.rightHandC = this.rightHand;
        this.assignmentExpr = this.leftHand;
        this.expr = this.assignmentExpr.concat(this.rightHand);
        this.exprC = this.expr;

        // Function
        this.functionParameter = this.assignmentExpr.concat(this.value);
        this.functionParameterC = this.functionParameter;
        this.functionStatement = ['{'];
        this.functionDeclaration = ['function'];
        this.functionDeclarationStatement = this.functionDeclaration;
        
        // Class and Interface
        this.modifier = ['public', 'protected', 'private', 'static', 'abstract', 'final'];
        this.classStatement = this.assignmentExpr.concat(this.functionDeclarationStatement);
        this.interfaceExtendsList = ['extends'];
        this.implementsList = ['implements'];
        this.classEntryType = ['abstract', 'final', 'class'];
        this.classDeclaration = ['class'].concat(this.classEntryType);

        // Statement
        this.default = ['default'];
        this.case = ['case'];
        this.switchCase = this.case.concat(this.default);
        this.elseif = ['elseif'];
        this.else = ['else']
        this.statement = ['{', 'switch', 'while', 'for', 'if', 'do', 'echo', 'return', ';'].concat(this.expr);
        this.innerStatement = ['break'].concat(this.statement);

        // Program
        this.block = this.statement.concat(this.functionDeclarationStatement).concat(this.classDeclaration);
        this.program = ['<?php']
    }
    
}



































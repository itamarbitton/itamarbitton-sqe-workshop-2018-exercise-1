import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {generateTable} from '../src/js/code-analyzer';


describe('Part one of tests', () => {
    it('Test No. 1', () => {
        assert.deepEqual(generateTable(parseCode(test1Func)), test1Res);
    });
    it('Test No. 2', () => {
        assert.deepEqual(generateTable(parseCode(test2Func)), test2Res);
    });
    it('Test No. 3', () => {
        assert.deepEqual(generateTable(parseCode(test3Func)), test3Res);
    });
    it('Test No. 4', () => {
        assert.deepEqual(generateTable(parseCode(test4Func)), test4Res);
    });
    it('Test No. 5', () => {
        assert.deepEqual(generateTable(parseCode(test5Func)), test5Res);
    });
});


describe('Part 2 of tests', () => {
    it('Test No. 6', () => {
        assert.deepEqual(generateTable(parseCode(test6Func)), test6Res);
    });
    it('Test No. 7', () => {
        assert.deepEqual(generateTable(parseCode(test7Func)), test7Res);
    });
    it('Test No. 8', () => {
        assert.deepEqual(generateTable(parseCode(test8Func)), test8Res);
    });
    it('Test No. 9', () => {
        assert.deepEqual(generateTable(parseCode(test9Func)), test9Res);
    });
    it('Test No. 10', () => {
        assert.deepEqual(generateTable(parseCode(test10Func)), test10Res);
    });
});




const test1Func =
    'function test1(x,y,z){\n' +
       'let i = 1;\n'+
       'while(j<10)\n{'+
            'i = i*2;\n'+
        '}\n'+
       'return i;\n'+
    '}';
const test1Res =
    [   {line: 1, type: 'FunctionDeclaration', name: 'test1', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'x', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'y', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'z', condition: '', value: ''},
        {line: 2, type: 'VariableDeclaration', name: 'i', condition: '', value: 1},
        {line: 3, type: 'WhileStatement', name: '', condition: 'j < 10', value: ''},
        {line: 4, type: 'AssignmentExpression', name: 'i', condition: '', value: 'i * 2'},
        {line: 6, type: 'ReturnStatement', name: '', condition: '', value: 'i'}
    ];
const test2Func = 'function test2(){ \n' +
    'let x = 1; \n' +
    'x = 13; \n' +
    '}';
const test2Res = [{line: 1, type: 'FunctionDeclaration', name: 'test2', condition: '', value: ''},
    {line: 2, type: 'VariableDeclaration', name: 'x', condition: '', value: 1},
    {line: 3, type: 'AssignmentExpression', name: 'x', condition: '', value: 13}];
const test3Func =
    'function test3(X,Y){ \n'+
        'if(X>Y){ \n' +
            'return X; \n' +
        '} \n' +
        'else{\n' +
            'return Y;\n' +
        '} \n' +
    '}';
const test3Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test3', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'X', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'Y', condition: '', value: ''},
        {line: 2, type: 'IfStatement', name: '', condition: 'X > Y', value: ''},
        {line: 3, type: 'ReturnStatement', name: '', condition: '', value: 'X'},
        {line: 6, type: 'ReturnStatement', name: '', condition: '', value: 'Y'}];
const test4Func =
    'function test4(z){\n' +
     'let arr = ["hello", "world"];\n' +
      '  if(z>=1){\n' +
       '     return arr[0];\n' +
        '}\n' +
        'else if(z<1){\n' +
      '      return arr[1];\n' +
       ' }\n' +
        'else if(z===null){\n' +
         '   return null;\n' +
        '}\n' +
    '}';
const test4Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test4', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'z', condition: '', value: ''},
        {line: 2, type: 'VariableDeclaration', name: 'arr', condition: '', value: '[hello,world]'},
        {line: 3, type: 'IfStatement', name: '', condition: 'z >= 1', value: ''},
        {line: 4, type: 'ReturnStatement', name: '', condition: '', value: 'arr[0]'},
        {line: 6, type: 'ElseIfStatement', name: '', condition: 'z < 1', value: ''},
        {line: 7, type: 'ReturnStatement', name: '', condition: '', value: 'arr[1]'},
        {line: 9, type: 'ElseIfStatement', name: '', condition: 'z === null', value: ''},
        {line: 10, type: 'ReturnStatement', name: '', condition: '', value: null}];
const test5Func =
    'function test5(){\n' +
        'let y = 1;\n' +
        'if(y>0){\n' +
            'return +y;\n' +
        '}\n' +
        'while(y<=0){\n' +
            'y = y + 1;\n' +
        '}\n' +
        'return this;\n' +
    '}';
const test5Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test5', condition: '', value: ''},
        {line: 2, type: 'VariableDeclaration', name: 'y', condition: '', value: 1},
        {line: 3, type: 'IfStatement', name: '', condition: 'y > 0', value: ''},
        {line: 4, type: 'ReturnStatement', name: '', condition: '', value: '+y'},
        {line: 6, type: 'WhileStatement', name: '', condition: 'y <= 0', value: ''},
        {line: 7, type: 'AssignmentExpression', name: 'y', condition: '', value: 'y + 1'},
        {line: 9, type: 'ReturnStatement', name: '', condition: '', value: 'this'}];
const test6Func =
    'function test6(){\n' +
        'let check = 0, i,k;\n' +
        'for(i=0; i<20; ++i){\n' +
            'check = check + 1;\n' +
        '}\n' +
        'for(k=0; k<20; k = k+1){\n' +
        'check = check + 1;\n' +
        '}\n' +
    '}';
const test6Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test6', condition: '', value: ''},
        {line: 2, type: 'VariableDeclaration', name: 'check', condition: '', value: 0},
        {line: 2, type: 'VariableDeclaration', name: 'i', condition: '', value: null},
        {line: 2, type: 'VariableDeclaration', name: 'k', condition: '', value: null},
        {line: 3, type: 'ForStatement', name: '', condition: 'i=0 ; i < 20 ; ++i', value: ''},
        {line: 4, type: 'AssignmentExpression', name: 'check', condition: '', value: 'check + 1'},
        {line: 6, type: 'ForStatement', name: '', condition: 'k=0 ; k < 20 ; k = k + 1', value: ''},
        {line: 7, type: 'AssignmentExpression', name: 'check', condition: '', value: 'check + 1'}];
const test7Func = 'function test7(T,Y){\n' +
    'let one, two, three;\n' +
    'one = 1;\n' +
    'two = one + one;\n' +
    'three = two + one;\n' +
    'return this.three;\n' +
    '}';
const test7Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test7', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'T', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'Y', condition: '', value: ''},
        {line: 2, type: 'VariableDeclaration', name: 'one', condition: '', value: null},
        {line: 2, type: 'VariableDeclaration', name: 'two', condition: '', value: null},
        {line: 2, type: 'VariableDeclaration', name: 'three', condition: '', value: null},
        {line: 3, type: 'AssignmentExpression', name: 'one', condition: '', value: 1},
        {line: 4, type: 'AssignmentExpression', name: 'two', condition: '', value: 'one + one'},
        {line: 5, type: 'AssignmentExpression', name: 'three', condition: '', value: 'two + one'},
        {line: 6, type: 'ReturnStatement', name: '', condition: '', value: 'this.three'}];
const test8Func = 'function test8(arg1, arg2){\n' +
    'if(arg1 > arg2)\n' +
    'return 1;\n' +
    'else if (arg2 > arg1)\n' +
    'return -1;\n' +
    'return 0;\n' +
    '}';
const test8Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test8', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'arg1', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'arg2', condition: '', value: ''},
        {line: 2, type: 'IfStatement', name: '', condition: 'arg1 > arg2', value: ''},
        {line: 3, type: 'ReturnStatement', name: '', condition: '', value: 1},
        {line: 4, type: 'ElseIfStatement', name: '', condition: 'arg2 > arg1', value: ''},
        {line: 5, type: 'ReturnStatement', name: '', condition: '', value: '-1'},
        {line: 6, type: 'ReturnStatement', name: '', condition: '', value: 0}];
const test9Func = 'function test9(){\n' +
    'do {\n' +
        'i = i+1;\n' +
    '}\n' +
    'while(i<5);\n' +
    'let x = 1+2*13/4;\n' +
    'if (x%2 === 0)\n' +
    'return "even";\n' +
    'return "odd";\n' +
    '}';
const test9Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'test9', condition: '', value: ''},
        {line: 2, type: 'DoWhileStatement', name: '', condition: 'i < 5', value: ''},
        {line: 3, type: 'AssignmentExpression', name: 'i', condition: '', value: 'i + 1'},
        {line: 6, type: 'VariableDeclaration', name: 'x', condition: '', value: '1 + 2 * 13 / 4'},
        {line: 7, type: 'IfStatement', name: '', condition: 'x % 2 === 0', value: ''},
        {line: 8, type: 'ReturnStatement', name: '', condition: '', value: 'even'},
        {line: 9, type: 'ReturnStatement', name: '', condition: '', value: 'odd'}];
const test10Func =
    'function binarySearch(X, V, n){\n' +
        'let low, high, mid;\n' +
        'low = 0;\n' +
        'high = n - 1;\n' +
        'while (low <= high) {\n' +
            'mid = (low + high)/2;\n' +
            'if (X < V[mid])\n' +
                'high = mid - 1;\n' +
            'else if (X > V[mid])\n' +
                'low = mid + 1;\n' +
            'else\n' +
                'return mid;\n' +
        '}\n' +
        'return -1;\n' +
    '}';
const test10Res =
    [{line: 1, type: 'FunctionDeclaration', name: 'binarySearch', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'X', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'V', condition: '', value: ''},
        {line: 1, type: 'VariableDeclaration', name: 'n', condition: '', value: ''},
        {line: 2, type: 'VariableDeclaration', name: 'low', condition: '', value: null},
        {line: 2, type: 'VariableDeclaration', name: 'high', condition: '', value: null},
        {line: 2, type: 'VariableDeclaration', name: 'mid', condition: '', value: null},
        {line: 3, type: 'AssignmentExpression', name: 'low', condition: '', value: 0},
        {line: 4, type: 'AssignmentExpression', name: 'high', condition: '', value: 'n - 1'},
        {line: 5, type: 'WhileStatement', name: '', condition: 'low <= high', value: ''},
        {line: 6, type: 'AssignmentExpression', name: 'mid', condition: '', value: 'low + high / 2'},
        {line: 7, type: 'IfStatement', name: '', condition: 'X < V[mid]', value: ''},
        {line: 8, type: 'AssignmentExpression', name: 'high', condition: '', value: 'mid - 1'},
        {line: 9, type: 'ElseIfStatement', name: '', condition: 'X > V[mid]', value: ''},
        {line: 10, type: 'AssignmentExpression', name: 'low', condition: '', value: 'mid + 1'},
        {line: 12, type: 'ReturnStatement', name: '', condition: '', value: 'mid'},
        {line: 14, type: 'ReturnStatement', name: '', condition: '', value: '-1'}];
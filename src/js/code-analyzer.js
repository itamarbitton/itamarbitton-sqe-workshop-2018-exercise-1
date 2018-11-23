import * as esprima from 'esprima';


const parseCode = (codeToParse) => {return esprima.parseScript(codeToParse,{ loc: true, range:true });};

const generateTableRow = (line, type, name='', condition='', value='') => {
    return {line: line, type: type, name: name, condition: condition, value: value};
};


function generateParametersRows(paramsCode){
    let ans = [];
    paramsCode.map(param =>{
        const line = param.loc.start.line;
        const type = 'VariableDeclaration';
        const name = generateTable(param);
        ans.push(generateTableRow(line, type, name));
    });
    return ans;
}


function generateFunctionRows(functionCode){
    let line = functionCode.loc.start.line;
    let name = generateTable(functionCode.id);
    let functionLine = generateTableRow(line,'FunctionDeclaration',name);
    let params = generateParametersRows(functionCode.params);
    let body = generateTable(functionCode.body);
    return [].concat(functionLine,params,body);
}


function generateVariableDeclarationRows(declarationsCode){
    declarationsCode = declarationsCode.declarations;
    let ans = [];
    declarationsCode.map(varDec => {
        const line = varDec.loc.start.line;
        const type = 'VariableDeclaration';
        let init ;
        if(varDec.init !== null)
            init = generateTable(varDec.init);
        else {
            init = null;
        }
        const name = generateTable(varDec.id);
        let row = generateTableRow(line, type, name,'',init);
        ans.push(row);
    }
    );
    return ans;
}


function generateBlockStatementRows(blockCode){
    blockCode = blockCode.body;
    let ans = [];
    blockCode.map(element => {
        let ret = generateTable(element);
        ans = ans.concat(ret);
    }
    );
    return ans;
}

function generateBinaryExpressionRows(binaryCode){
    const operator = binaryCode.operator ;
    const right = generateTable(binaryCode.right);
    const left = generateTable(binaryCode.left);
    return '' + left + ' ' + operator + ' ' + right;
}


function generateAssignmentExpressionRows(assignmentCode){
    const line = assignmentCode.loc.start.line;
    const type = 'AssignmentExpression';
    const name = generateTable(assignmentCode.left);
    const value = generateTable(assignmentCode.right);
    return generateTableRow(line, type, name, '', value);
}


function generateIfStatementRows(ifCode){
    const line = ifCode.loc.start.line;
    const type = 'IfStatement';
    const test = generateTable(ifCode.test);
    const ifStat = generateTableRow(line, type, undefined, test, undefined);
    const consequent = generateTable(ifCode.consequent);
    if(ifCode.alternate !== null){
        let alternate;
        if(ifCode.alternate.type === 'IfStatement'){
            alternate = generateElseIfStatement(ifCode.alternate);
        }
        else{
            alternate = generateTable(ifCode.alternate);
        }
        return [].concat(ifStat, consequent, alternate);
    }
    else{
        return [].concat(ifStat, consequent);
    }
}


function generateElseIfStatement(elseIfCode){
    const line = elseIfCode.loc.start.line;
    const type = 'ElseIfStatement';
    const test = generateTable(elseIfCode.test);
    const ifStat = generateTableRow(line, type, undefined, test, undefined);
    const consequent = generateTable(elseIfCode.consequent);
    if(elseIfCode.alternate !== null){
        let alternate;
        if(elseIfCode.alternate.type === 'IfStatement')
            alternate = generateElseIfStatement(elseIfCode.alternate);
        else
            alternate = generateTable(elseIfCode.alternate);
        return [].concat(ifStat, consequent, alternate);
    }
    else{
        return [].concat(ifStat, consequent);
    }
}


function generateWhileStatementRows(whileCode){
    const line = whileCode.loc.start.line;
    const type = 'WhileStatement';
    const test = generateTable(whileCode.test);
    const whileStatement = generateTableRow(line, type, undefined, test, undefined);
    const body = generateTable(whileCode.body);
    return [].concat(whileStatement,body);
}


function generateDoWhileStatementRows(whileCode){
    const line = whileCode.loc.start.line;
    const type = 'DoWhileStatement';
    const test = generateTable(whileCode.test);
    const whileStatement = generateTableRow(line, type, undefined, test, undefined);
    const body = generateTable(whileCode.body);
    return [].concat(whileStatement,body);
}


function generateMemberExpressionRows(memberCode){
    const object = generateTable(memberCode.object);
    const property = generateTable(memberCode.property);
    if(memberCode.object.type === 'ThisExpression') {
        return 'this.' + property;
    }
    return object + '[' + property + ']';
}


function generateUnaryExpressionRows(unaryCode){
    const value = generateTable(unaryCode.argument);
    return unaryCode.operator + value;
}


function generateReturnStatementRows(returnCode){
    const line = returnCode.loc.start.line;
    const type = 'ReturnStatement';
    const returnValue = generateTable(returnCode.argument);
    return generateTableRow(line, type, undefined, undefined, returnValue);
}



function generateUpdateExpressionRows(updateCode){
    const line = updateCode.loc.start.line;
    const type = 'UpdateExpression';
    const value = updateCode.operator + '' + generateTable(updateCode.argument);
    return generateTableRow(line, type, undefined, undefined, value);
}


function generateForStatementRows(forCode){
    const line = forCode.loc.start.line;
    const type = 'ForStatement';
    let init = generateTable(forCode.init);
    init = '' + init.name + '=' + init.value;
    let test = generateTable(forCode.test);
    const update = forCode.update.type === 'UpdateExpression' ?
        generateTable(forCode.update).value :
        generateTable(forCode.update).name + ' = ' + generateTable(forCode.update).value;
    const body = generateTable(forCode.body);
    const  condition = ''+ init + ' ; ' + test + ' ; ' + update ;
    return [].concat(generateTableRow(line, type, undefined, condition, undefined), body);
}


function generateArrayExpressionRows(arrayCode){
    let ans = [];
    arrayCode.elements.map(element=>{
        ans.push(element.value);
    });
    return '[' + ans + ']';
}


function simpleVals(parsedCode){
    switch (parsedCode.type) {
    case 'Identifier':return parsedCode.name;
    case 'Literal':return parsedCode.value;
    case 'ThisExpression':return 'this';
    }
}


function generateTable(parsedCode){
    let mapping = {
        FunctionDeclaration:generateFunctionRows, VariableDeclaration:generateVariableDeclarationRows,
        BlockStatement:generateBlockStatementRows, AssignmentExpression:generateAssignmentExpressionRows,
        BinaryExpression:generateBinaryExpressionRows, IfStatement:generateIfStatementRows,
        WhileStatement:generateWhileStatementRows, MemberExpression:generateMemberExpressionRows,
        UnaryExpression:generateUnaryExpressionRows, ReturnStatement:generateReturnStatementRows,
        UpdateExpression:generateUpdateExpressionRows, ForStatement:generateForStatementRows,
        ArrayExpression:generateArrayExpressionRows, DoWhileStatement:generateDoWhileStatementRows
    };
    let simpleCases = ['Identifier','Literal','ThisExpression'];
    if(simpleCases.includes(parsedCode.type))
        return simpleVals(parsedCode);
    switch (parsedCode.type) {
    case 'Program': return generateTable(parsedCode.body[0]);
    case 'ExpressionStatement':return generateTable(parsedCode.expression);
    default:
        //return parsedCode;
        return mapping[parsedCode.type].call(undefined, parsedCode);
    }
}

export {parseCode, generateTable};


// case 'VariableDeclaration':return generateVariableDeclarationRows(parsedCode); //
// case 'BlockStatement':return generateBlockStatementRows(parsedCode); //
// case 'FunctionDeclaration':return generateFunctionRows(parsedCode) ; //
// case 'AssignmentExpression':return generateAssignmentExpressionRows(parsedCode); //
// case 'BinaryExpression':return generateBinaryExpressionRows(parsedCode); //
// case 'IfStatement':return generateIfStatementRows(parsedCode); //
// case 'WhileStatement':return generateWhileStatementRows(parsedCode); //
// case 'MemberExpression':return generateMemberExpressionRows(parsedCode); //
// case 'UnaryExpression':return generateUnaryExpressionRows(parsedCode); //
// case 'ReturnStatement':return generateReturnStatementRows(parsedCode); //
// case 'UpdateExpression':return generateUpdateExpressionRows(parsedCode); //
// case 'ForStatement':return generateForStatementRows(parsedCode); //
// case 'ArrayExpression':return generateArrayExpressionRows(parsedCode);


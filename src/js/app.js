import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {generateTable} from './code-analyzer';
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let result = generateTable(parsedCode);
        createTable(result);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});

function createTable(tableData) {
    let headLines = ['Line','Type','Name','Condition','Value'];
    var head = '<head>';
    head += myStyle();
    head += '</head>';
    var html =  head + '<table>' ;
    for (var i = 0; i < headLines.length ; i++){
        html += '<th>' + headLines[i] + '</th>';
    }
    for (i = 0; i < tableData.length; i++) {
        const codeElement = tableData[i];
        html += generateRow(codeElement.line, codeElement.type, codeElement.name, codeElement.condition, codeElement.value);
    }
    html += '</table>';
    document.getElementById('resultTable').innerHTML = html;
}

function generateRow(line,type,name,cond,val){
    return `<tr><td>${line}</td><td>${type}</td><td>${name}</td><td>${cond}</td><td>${val}</td></tr>`;
}

function myStyle(){
    return '<style>' +
        'table {' +
        '    border-collapse: collapse;' +
        '    width: 100%;' +
        '}' +
        '' +
        'th, td {' +
        '    text-align: left;' +
        '    padding: 8px;' +
        '}' +
        '' +
        'tr:nth-child(even){background-color: #f2f2f2}' +
        '' +
        'th {' +
        '    background-color: #4CAF50;' +
        '    color: white;' +
        '}' +
        '</style>';
}

import { Component } from '@angular/core';
import { ExpressionService } from '../expression.service';
import { CodePalService } from '../code-pal.service';


@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss']
})
export class CodeGeneratorComponent {
  expression: string = '';
  var: string = '';
  result: any = '';
  variablesData: any = {};

  testVariables = []; 


  variables = [
    { name: 'Order_ext', type: 'string', testValue: '' },
    { name: 'Order_Ref', type: 'string', testValue: '' },
    { name: 'Order_Desc', type: 'string', testValue: '' },
    { name: 'Order_Qte', type: 'number', testValue: '' },

  ];

  constructor(private expressionService: ExpressionService, private codePalService: CodePalService) { }
  inputText: string = '';
  generatedCode: string = '';

  addToExpression(variableName: string) {
    this.inputText += variableName + ' '; // Ajouter le nom de la variable au champ textInput
  }

  
  removeCommentsAndBlankLinesFromCode(code: string): string {
    const blockCommentRegex = /\/\*([\s\S]*?)\*\//g;  // Regular expression to match block comments
    const lineCommentRegex = /\/\/.*/g;
  
    const codeWithoutBlockComments = code.replace(blockCommentRegex, '');   // Remove block comments
    const codeWithoutComments = codeWithoutBlockComments.replace(lineCommentRegex, ''); // Remove line comments
  
    const codeWithoutBlankLines = codeWithoutComments.replace(/^\s*[\r\n]/gm, '');  // Remove blank lines
    return codeWithoutBlankLines;
  }

  characterCount: number = 0;
  isLimitExceeded: boolean = false;

  updateCharacterCount() {
    this.characterCount = this.inputText.length;
    this.isLimitExceeded = this.characterCount > 13000;
  }
  showTestColumn = false; // Indicateur pour afficher ou masquer la colonne de test



  extractFirstFunctionCall(code: string) { /*  permet d'extracter l'entéte de la fonction  */
    const pattern = /(\w+)\s*\([^)]*\)/;
    const match = code.match(pattern);
  
    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  simulate() {

  }

quoteValue(value : any) {  /* permet d'entourer value par des quotes */
    return `"${value}"`;
  }

test() {
  // Replace variable names with test values in the code text area
  let codeWithTestValues = this.extractFirstFunctionCall(this.generatedCode) || '';
  this.variables.forEach(variable => {
    const variableNameRegExp = new RegExp(`\\b${variable.name}\\b`, 'g');
    codeWithTestValues = codeWithTestValues.replace(variableNameRegExp, this.quoteValue(variable.testValue));
  });

  // Execute the JavaScript code with test values
  try {
    const result = eval(this.generatedCode + codeWithTestValues); // Execute the modified code
    this.result = result; 
  } catch (error: any) {
    this.result = `Error: ${error.message}`; 
  }
}


  showTestButtons = false;
  cancel() {
    this.showTestColumn = false;
    this.showTestButtons = false;
    this.result = '';
  }


  generateCode() {
    this.generatedCode = '';
    this.codePalService.generateCodeFromText(this.inputText  + ". ne change pas le nom des variables. sans exemple d'usage.")
      .subscribe(
        (data: any) => {
          this.generatedCode = data.result;
          this.generatedCode = this.removeCommentsAndBlankLinesFromCode(this.generatedCode)
        }
      );

  }
}

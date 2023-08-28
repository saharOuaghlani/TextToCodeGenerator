import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {

  evaluateExpression(expression: string, variables: any): any {
    try {
      const keys = Object.keys(variables);
      const values = Object.values(variables);

      const evalFunction = new Function(...keys, `return ${expression};`);
      return evalFunction(...values);
    } catch (error : any) {
      return 'Error: ' + error.message;
    }
  }
}

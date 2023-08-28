import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CodePalService {
  readonly apiUrl = 'http://localhost:3000/expression';
  constructor(private httpClient: HttpClient) {

  }

  generateCodeFromText(instructions: string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, { instructions });
  }
}  
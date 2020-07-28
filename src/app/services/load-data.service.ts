import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(private http: HttpClient) { }

  loadCsv() {
    return this.http.get(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv',
      { responseType: 'text' }
    );
  }
}

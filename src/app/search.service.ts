import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class SearchService {
  public data: any = {}

  constructor(private http: HttpClient) { }

  public getData(): any {
    return this.http.get('http://test-env.itwfvtde9t.us-east-2.elasticbeanstalk.com/api/HomeBook');
  }

  public setData(): any {
    const userName = localStorage.getItem('signedUser');
    const body: any = { comment: this.data.comment, name: userName };
    return this.http.post('http://test-env.itwfvtde9t.us-east-2.elasticbeanstalk.com/api/addRecords', body);
  }

}
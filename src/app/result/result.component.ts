import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
  public listing: any = [];
  public userInput: String;

  constructor(private searchService: SearchService,public AuthService: AuthService) { }

  public ngOnInit(): void {
    this.searchService.getData().subscribe((res: any[]) => {
      this.listing = res;
    });
  }

  public addTask(): any {
    const userName = localStorage.getItem('signedUser');
    const userValue = { comment: this.userInput, name: userName };
    this.listing.push(userValue);
    this.searchService.data = userValue;
    this.searchService.setData().subscribe((res: any) => { });
  }

}

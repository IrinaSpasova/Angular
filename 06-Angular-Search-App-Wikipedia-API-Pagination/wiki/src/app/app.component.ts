
   
import { Component } from '@angular/core';
import { WikiService } from './wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wiki';
  searchTerm: any;
  results: any = [];

  totalResults: any;
  page: number = 1;

  constructor(private wiki: WikiService) {}

  onSubmit() {
    this.wiki.search(this.searchTerm).subscribe((res: any) => {
      this.results = res.query.search;

      this.totalResults = res.query.search.length;
      console.log(this.results);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { QueriesService } from '../../services/queriesService.service';

@Component({
  selector: 'app-show-queries',
  templateUrl: './show-queries.component.html',
  styleUrls: ['./show-queries.component.scss']
})
export class ShowQueriesComponent implements OnInit {
  queries: any[] = []; // Array to hold queries data

  constructor(private $queryServ: QueriesService) {}

  ngOnInit(): void {
    this.fetchQueries();
  }

  fetchQueries() {
    this.$queryServ.fetchQueries().subscribe(
      (response) => {
        // console.log(response); // Ensure you receive the data correctly
        this.queries = response.data; // Assign fetched data to the queries array
      },
      (error) => {
        // console.log(error);
      }
    );
  }
}

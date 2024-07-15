import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generatePages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] && !changes['totalPages'].firstChange) {
      this.generatePages();
    }
  }

  generatePages(): void {
    if (isNaN(this.totalPages) || this.totalPages < 1) {
      this.pages = [];
      return;
    }
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4); // Show up to 5 pages
    this.pages = this.getRange(startPage, endPage);
    console.log('Current Page:', this.currentPage, 'Total Pages:', this.totalPages, 'Pages:', this.pages);
  }

  getRange(start: number, end: number): number[] {
    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  }

  loadPage(page: number): void {
    this.pageChange.emit(page);
  }
}

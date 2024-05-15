import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';
import { ReviewService } from '../review/review.service';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = [];
  book: any[] = [];
  displayedColumns: string[] = ['Book', 'Author', 'Rating', 'Review', 'Actions'];
  dataSource: any;
  searchTerm: string = '';


  constructor(private reviewService: ReviewService){}

  ngOnInit(): void {
    this.reviewService.getAllReviews().subscribe((reviews: any) => {
      this.reviews = reviews.data;
      this.dataSource = this.reviews;
    });
  };
  
  deleteReview(id: string){
    this.reviewService.deleteReview(id).subscribe(() => {
      console.log('Review Deleted');
      this.reviews = this.reviews.filter(item => item._id !== id);
    })
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.dataSource = this.reviews;
      return;
    }

    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.dataSource = this.reviews.filter(item =>
      item.book_name.toLowerCase().includes(lowerCaseTerm) ||
      item.book_author.toLowerCase().includes(lowerCaseTerm)
    );
  }

  sortData(sort: Sort) {
    console.log('sortedData >> ', this.reviews)
    const data = this.reviews.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'book_name':
          return compare(a.book_name, b.book_name, isAsc);
        case 'book_author':
          return compare(a.book_author, b.book_author, isAsc);
        default:
          return 0;
      }
    });
    console.log('sortedData >> ', this.reviews)
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


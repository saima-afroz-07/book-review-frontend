import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingType, Review } from '../models/review';
import { BookService } from '../book/book.service';
import { ReviewService } from '../review/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  reviewForm: FormGroup = new FormGroup({});
  ratingEnum = RatingType
  books: any[] = []
  disableBookSelect: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private reviewService: ReviewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books.data
    });

    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      review_text: ['', Validators.required],
      book_id: [{ value: '', disabled: false }, Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.reviewForm.get('book_id')?.disable();
      this.reviewService.getReview(id).subscribe((review: any) => {
        if(review.data){
          this.reviewForm.patchValue(review.data);
        }
      })
    }

  }

  async onSubmit(){
    if(this.reviewForm.valid){
      let review: Review = this.reviewForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if(id){
        //update existing review
        this.reviewForm.get('book_id')?.disable();
        this.reviewService.updateReview(id, review).subscribe(review => {
          console.log('Update review request processed');
        })
      } else {
        // create new review
        this.reviewService.createReview(review).subscribe(() => {
          console.log('Add review request processed');
        });
      }

      this.router.navigate(['/list']);

    }

  }

  getRatingKeys(): string[] {
    return Object.getOwnPropertyNames(this.ratingEnum).filter(
      prop => isNaN(parseInt(prop)));
  }
}

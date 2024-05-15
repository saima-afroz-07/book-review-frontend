import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "list", component: ReviewListComponent},
  {path: "new", component: ReviewFormComponent},
  {path: "edit/:id", component: ReviewFormComponent},
  {path: "books", component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

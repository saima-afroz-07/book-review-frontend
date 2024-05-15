export interface Review {
    _id: string,
    rating: RatingType,
    review_text: string,
    book_id: string,
    book_name: string,
    book_author: string
}

 export enum RatingType {
    "ONE" = 1,
    "TWO" = 2,
    "THREE" = 3,
    "FOUR" = 4,
    "FIVE" = 5
}

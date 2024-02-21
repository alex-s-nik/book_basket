import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BookService, Book } from './book.service';

import { BooksListComponent } from './books-list/books-list.component';
import { OrderListComponent } from './order-list/order-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BooksListComponent,
    OrderListComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  public untakenBooks: Book[] = [];
  public booksForLending: Book[] = [];

  constructor(private _bookService: BookService) {
  }
  ngOnInit(): void {
     this.untakenBooks = this._bookService.getUntakenBooks();
  }

  addBookToOrderListHandler(bookTitle: string): void {
    const book: Book = this.untakenBooks.find(book=>book.title === bookTitle)!;
    const index: number = this.untakenBooks.indexOf(book);
    this.untakenBooks.splice(index, 1);
    this.booksForLending.push(book);
  }

  removeBookFromOrderListHandler(bookTitle: string): void {
    const book: Book = this.booksForLending.find(book=>book.title === bookTitle)!;
    const index: number = this.booksForLending.indexOf(book);
    this.booksForLending.splice(index, 1);
    this.untakenBooks.push(book);
    this.untakenBooks.sort(
      (book1, book2) => {
        if (book1.title > book2.title) return 1;
        if (book1.title < book2.title) return -1;
        return 0;
    });
  }
}

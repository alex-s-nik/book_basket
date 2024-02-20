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

  protected _untakenBooks: Book[] = [];
  protected _booksForLending: Book[] = [];

  constructor(private _bookService: BookService) {
  }
  ngOnInit(): void {
    this._bookService.init();
    this._untakenBooks = this._bookService.getUntakenBooks();
  }

  addBookToOrderList(bookTitle: string): void {
    const book: Book = this._untakenBooks.find(book=>book.title === bookTitle)!;
    const index: number = this._untakenBooks.indexOf(book);
    this._untakenBooks.splice(index, 1);
    this._booksForLending.push(book);
  }

  removeBookFromOrderList(bookTitle: string): void {
    const book: Book = this._booksForLending.find(book=>book.title === bookTitle)!;
    const index: number = this._booksForLending.indexOf(book);
    this._booksForLending.splice(index, 1);
    this._untakenBooks.push(book);
    this._untakenBooks.sort(
      (book1, book2) => {
        if (book1.title > book2.title) return 1;
        if (book1.title < book2.title) return -1;
        return 0;
    });
  }
}

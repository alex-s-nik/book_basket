import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Book } from '../book.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent{
  @Input() untakenBooks: Book[] = [];
  @Output() onChangeBookList = new EventEmitter<string>();

  addBookToOrderList(title: string): void {
    this.onChangeBookList.emit(title);
  }
}

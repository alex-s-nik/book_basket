import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Book } from '../book.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  @Input() booksForLending: Book[] = [];
  @Output() ChangeOrderList = new EventEmitter<string>();

  removeBookFromOrderList(title: string): void {
    this.ChangeOrderList.emit(title);
  }
}
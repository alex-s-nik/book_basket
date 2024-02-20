import { Injectable } from '@angular/core';

import * as bookData from '../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _bookData: any;

  /**
   * Загружает начальные данные из assets/data.json
   * 
   */
  init(): void {
    this._bookData = bookData.books;
  }

  /**
   * Возвращает все книги, содержащиеся в файле json.
   * 
   * @returns список книг
   */
  getAllBooks(): Book[] {
    return this._bookData;
  };

  /**
   * Возвращает все невыданные книги из предложенного списка книг.
   * Невыданными считаются книги, у которых takenBy содержит null.
   * 
   * @param bookList 
   * 
   * @returns список невыданных книг.
   */
  getUntakenBooks(): Book[] {
    return this._bookData.filter(
        (book: Book) => (
          book.takenBy === null
        )
      );
  }

}

export interface Book {
  title: string;
  takenBy: number | null;
}
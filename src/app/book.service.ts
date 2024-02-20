import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _bookData: any;

  constructor(private _httpClient: HttpClient) {
    this._httpClient.get('assets/data.json').subscribe(
      data => {
        this._bookData = data;
      }
    )
  }

  getUntakenBooks(): Observable<Book[]> {
    return of(
      this._bookData.filter(
        (book: Book) => (
          book.takenBy === null
        )
      )
    );
  }

}

export interface Book {
  title: string;
  takenBy: number | null;
}
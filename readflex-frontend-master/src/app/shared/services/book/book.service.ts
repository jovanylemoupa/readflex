import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: string;
  title: string;
  description?: string;
  genre?: string;
  language?: string;
  status?: 'draft' | 'published' | 'completed';
  coverImage?: string;
  lastImage?: string;
  isPublic?: boolean;
  viewCount?: number;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books'; // Ajustez selon votre API

  constructor(private http: HttpClient) {}

  // Créer un nouveau livre
  createBook(
    book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // Récupérer tous les livres
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Récupérer un livre par ID
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un livre
  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  // Supprimer un livre
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les livres d'un auteur
  getBooksByAuthor(authorId: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/author/${authorId}`);
  }

  // Méthode de test pour vérifier la connectivité
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }

  // Upload d'image (si nécessaire)
  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData);
  }
}

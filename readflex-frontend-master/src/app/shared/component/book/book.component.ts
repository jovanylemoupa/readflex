import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { BookService, Book } from '../../services/book/book.service'; // Ajustez le chemin selon votre structure
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CheckboxModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  isLoading = false;

  // Options pour les dropdowns
  statusOptions = [
    { label: 'Brouillon', value: 'draft' },
    { label: 'Publié', value: 'published' },
    { label: 'Terminé', value: 'completed' },
  ];

  languageOptions = [
    { label: 'Français', value: 'fr' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Deutsch', value: 'de' },
  ];

  genreOptions = [
    { label: 'Fiction', value: 'fiction' },
    { label: 'Non-fiction', value: 'non-fiction' },
    { label: 'Science-fiction', value: 'science-fiction' },
    { label: 'Fantastique', value: 'fantasy' },
    { label: 'Romance', value: 'romance' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'Biographie', value: 'biography' },
    { label: 'Histoire', value: 'history' },
    { label: 'Autre', value: 'other' },
  ];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.bookForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      description: ['', [Validators.maxLength(1000)]],
      genre: [''],
      language: ['fr', Validators.required],
      status: ['draft', Validators.required],
      coverImage: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      lastImage: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      isPublic: [true],
      authorId: this.authService.currentUser$.subscribe(
        (user) => user?.id || ''
      ),
    });
  }

  ngOnInit() {
    this.bookForm.patchValue({
      authorId: this.authService.currentUser$.getValue()?.id || '',
    });

    this.testApiConnection();
  }

  testApiConnection() {
    this.bookService.testConnection().subscribe({
      next: (response: any) => {
        console.log('✅ Connexion API OK:', response);
      },
      error: (error: any) => {
        console.warn('⚠️ Problème de connexion API:', error);
        console.log(
          '📝 Note: Assurez-vous que votre serveur backend est démarré'
        );
      },
    });
  }

  onSubmit() {
    console.log('Form status:', this.bookForm.status);
    console.log('Form value:', this.bookForm.value);
    console.log('Form errors:', this.getFormErrors());

    if (this.bookForm.valid) {
      this.isLoading = true;

      const bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'> = {
        ...this.bookForm.value,
        viewCount: 0,
      };

      this.bookService.createBook(bookData).subscribe({
        next: (createdBook) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `Le livre "${createdBook.title}" a été créé avec succès!`,
          });
          this.resetForm();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur création livre:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              error.error?.message || 'Erreur lors de la création du livre',
          });
        },
      });
    } else {
      this.markFormGroupTouched();
      const errors = this.getFormValidationErrors();
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulaire invalide',
        detail:
          errors.length > 0
            ? errors.join(', ')
            : 'Veuillez vérifier les champs obligatoires',
      });
    }
  }

  // Méthode pour obtenir les erreurs de validation détaillées
  getFormValidationErrors(): string[] {
    const errors: string[] = [];

    if (this.title?.errors && this.title?.touched) {
      if (this.title.errors['required']) {
        errors.push('Le titre est requis');
      }
      if (this.title.errors['minlength']) {
        errors.push('Le titre doit contenir au moins 2 caractères');
      }
      if (this.title.errors['maxlength']) {
        errors.push('Le titre ne peut pas dépasser 200 caractères');
      }
    }

    if (this.description?.errors && this.description?.touched) {
      if (this.description.errors['maxlength']) {
        errors.push('La description ne peut pas dépasser 1000 caractères');
      }
    }

    if (this.coverImage?.errors && this.coverImage?.touched) {
      if (this.coverImage.errors['pattern']) {
        errors.push("L'URL de l'image de couverture n'est pas valide");
      }
    }

    if (this.lastImage?.errors && this.lastImage?.touched) {
      if (this.lastImage.errors['pattern']) {
        errors.push("L'URL de la dernière image n'est pas valide");
      }
    }

    return errors;
  }

  // Méthode de debug pour voir toutes les erreurs
  getFormErrors(): any {
    const formErrors: any = {};
    Object.keys(this.bookForm.controls).forEach((key) => {
      const control = this.bookForm.get(key);
      if (control && !control.valid && control.touched) {
        formErrors[key] = control.errors;
      }
    });
    return formErrors;
  }

  resetForm() {
    this.bookForm.reset({
      title: '',
      description: '',
      genre: '',
      language: 'fr',
      status: 'draft',
      coverImage: '',
      lastImage: '',
      isPublic: true,
      authorId: this.authService.currentUser$.getValue()?.id || '',
    });

    // Marquer tous les champs comme non touchés
    Object.keys(this.bookForm.controls).forEach((key) => {
      const control = this.bookForm.get(key);
      control?.markAsUntouched();
      control?.markAsPristine();
    });

    this.messageService.add({
      severity: 'info',
      summary: 'Formulaire réinitialisé',
      detail: 'Le formulaire a été remis à zéro',
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.bookForm.controls).forEach((key) => {
      const control = this.bookForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
  }

  // Méthodes utilitaires pour vérifier la validité des champs
  isFieldInvalid(fieldName: string): boolean {
    const field = this.bookForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.bookForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.bookForm.get(fieldName);
    if (field?.errors && (field.dirty || field.touched)) {
      if (field.errors['required'])
        return `${this.getFieldLabel(fieldName)} est requis`;
      if (field.errors['minlength'])
        return `${this.getFieldLabel(fieldName)} doit contenir au moins ${
          field.errors['minlength'].requiredLength
        } caractères`;
      if (field.errors['maxlength'])
        return `${this.getFieldLabel(fieldName)} ne peut pas dépasser ${
          field.errors['maxlength'].requiredLength
        } caractères`;
      if (field.errors['pattern'])
        return `${this.getFieldLabel(
          fieldName
        )} n'est pas dans un format valide`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      title: 'Le titre',
      description: 'La description',
      genre: 'Le genre',
      language: 'La langue',
      status: 'Le statut',
      coverImage: "L'image de couverture",
      lastImage: 'La dernière image',
    };
    return labels[fieldName] || fieldName;
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get title() {
    return this.bookForm.get('title');
  }
  get description() {
    return this.bookForm.get('description');
  }
  get genre() {
    return this.bookForm.get('genre');
  }
  get language() {
    return this.bookForm.get('language');
  }
  get status() {
    return this.bookForm.get('status');
  }
  get coverImage() {
    return this.bookForm.get('coverImage');
  }
  get lastImage() {
    return this.bookForm.get('lastImage');
  }
  get isPublic() {
    return this.bookForm.get('isPublic');
  }
  get authorId() {
    return this.bookForm.get('authorId');
  }
}

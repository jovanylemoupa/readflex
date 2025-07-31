import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-writeplace',
  standalone: true,
  imports: [ReactiveFormsModule, EditorModule],
  templateUrl: './writeplace.component.html',
  styleUrl: './writeplace.component.scss',
})
export class WriteplaceComponent implements OnInit {
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      text: new FormControl(),
    });
  }
}

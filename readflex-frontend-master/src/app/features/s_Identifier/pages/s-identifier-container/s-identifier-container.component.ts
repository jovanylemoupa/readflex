import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { __values } from 'tslib';
import { UserService } from '../../../../shared/services/user/user.service';
import { User } from '../../../../shared/models/user';
import { mustMatch } from '../../../../core/validators/must-match.validator';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { lastValueFrom, timer } from 'rxjs';
@Component({
  selector: 'app-s-identifier-container',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './s-identifier-container.component.html',
  styleUrl: './s-identifier-container.component.scss',
})
export class SIdentifierContainerComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  value!: string;

  inscriptionInfo!: FormGroup;
  isSaveButtonClicked = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initform();
  }

  initform(): void {
    this.inscriptionInfo = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      passcomfirm: ['', [Validators.required, mustMatch('password')]],
    });
  }

  onCreateUser() {
    this.isSaveButtonClicked = true;
    if (this.inscriptionInfo.invalid) {
      return;
    }

    const userData: User = {
      username: this.inscriptionInfo.controls['username'].value,
      email: this.inscriptionInfo.controls['email'].value,
      password: this.inscriptionInfo.controls['password'].value,
      isAdmin: false,
    };

    this.userService.createUser(userData).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          detail: " L'utilisateur a bien été ajouté! ",
        });

        lastValueFrom(timer(2000)).then(() => {
          this.router.navigateByUrl('/se-connecter');
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}

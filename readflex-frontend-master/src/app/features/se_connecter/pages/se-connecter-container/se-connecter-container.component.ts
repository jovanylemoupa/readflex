import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { UserService } from '../../../../shared/services/user/user.service';
import { User } from '../../../../shared/models/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { lastValueFrom, timer } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-se-connecter-container',
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
  templateUrl: './se-connecter-container.component.html',
  styleUrl: './se-connecter-container.component.scss',
})
export class SeConnecterContainerComponent implements OnInit {
  user!: User;

  connexionInfo!: FormGroup;
  isSaveButtonClicked = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initform();
  }

  initform(): void {
    this.connexionInfo = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginUser() {
    this.isSaveButtonClicked = true;
    if (this.connexionInfo.invalid) {
      return;
    }

    const loginData = {
      username: this.connexionInfo.controls['username'].value,
      password: this.connexionInfo.controls['password'].value,
    };

    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('isUserLogged', JSON.stringify(true));

        this.authService.isUserLogged$.next(true);

        this.messageService.add({
          severity: 'success',
          detail: ' Bienvenue dans votre compte ',
        });

        lastValueFrom(timer(2000)).then(() => {
          this.router.navigateByUrl('/home-story');
        });
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'success',
          detail:
            " Desole le mot de passe ou le nom d'utilisateur ne convient pas",
        });

        lastValueFrom(timer(2000)).then(() => {
          this.router.navigateByUrl('/se-connecter');
        });
      },
    });
  }
}

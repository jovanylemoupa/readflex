import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/component/footer/footer.component';
import { HeaderComponent } from './core/component/header/header.component';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'readflex-frontend';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initApp();
  }

  initApp() {
    // Vérifier si localStorage est disponible
    if (typeof localStorage !== 'undefined') {
      const isUserLogged = localStorage.getItem('isUserLogged');
      if (isUserLogged) {
        this.authService.isUserLogged$.next(true);
      }
    }
  }
}

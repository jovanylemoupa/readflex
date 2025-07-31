import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { NgOptimizedImage } from '@angular/common';
import { StoryService } from '../../services/story/story.service';
import { Story } from '../../models/story';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-story',
  standalone: true,
  imports: [DialogModule, ButtonModule, AvatarModule, NgOptimizedImage],
  templateUrl: './card-story.component.html',
  styleUrl: './card-story.component.scss',
})
export class CardStoryComponent implements OnInit {
  @Input() story!: Story;
  isConnected!: boolean;
  isFavorited: boolean = false;

  visible: boolean = false;
  position: string = 'center';
  colorHeart: string = 'red';

  constructor(
    private storyServive: StoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getUserState() {
    this.authService.isUserLogged$.subscribe({
      next: (res: any) => {
        this.isConnected = res;
      },
    });
  }

  isUserLoggedIn(): any {
    return this.authService.isUserLogged$.next(false);
  }

  onShowDialog() {
    if (this.isUserLoggedIn()) {
      localStorage.getItem('isUserLogged') === 'true';
      this.showDialog();
    } else {
      this.router.navigateByUrl('/se-connecter');
    }
  }

  showDialog() {
    this.visible = true;
    this.position = this.position;
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
  }
}

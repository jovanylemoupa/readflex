import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Workspace } from './feature/workspace/workspace';

@Component({
  selector: 'app-root',
  imports: [Workspace],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'optimize-dashboard';
}

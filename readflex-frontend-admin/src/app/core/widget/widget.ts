import { Component, input, signal } from '@angular/core';
import { Widget } from '../../shared/models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptionComponent } from './widget-option-component/widget-option-component';

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatButtonModule, MatIcon, WidgetOptionComponent],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
  host: {
    '[style.grid-area]':
      '"span " + (data().rows ?? 1) + "/ span" + (data().columns ?? 1)',
  },
})
export class WidgetComponent {
  data = input.required<Widget>();
  showOptions = signal(false);
}

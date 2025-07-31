import { Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-widget-option-component',
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
  templateUrl: './widget-option-component.html',
  styleUrl: './widget-option-component.scss',
})
export class WidgetOptionComponent {
  showOptions = model<boolean>(false);
}
